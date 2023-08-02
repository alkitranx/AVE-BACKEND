import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FilterDto } from './dto/filter.dto';
import { TypeAndIdDto } from './dto/typeAndIdDto';

@Injectable()
export class Problem2Service {
  constructor(private readonly http: HttpService) {}

  //metodo privado que se conecta con el api externa para buscar por id
  private async findPokemonById(idPokemon: any) {
    let error;
    const result = await this.http
      .get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
      .toPromise()
      .then((res) => res.data)
      .catch((e) => {
        error = e.response;
      });
    if (error !== undefined) {
      throw new NotFoundException('there is no pokemon with that name');
    }
    return result;
  }
  //metodo privado que se conecta con el api externa para consultar tipos de pokemon
  private async findPokemonByType(typePokemon) {
    let error;
    return await this.http
      .get(`https://pokeapi.co/api/v2/type/${typePokemon}`)
      .toPromise()
      .then((res) => res.data)
      .catch((e) => {
        error = e;
      });
  }
  private async findPokemonByName(namePokemon: string) {
    let error;
    const result = await this.findPokemonById(namePokemon);

    if (error !== undefined) {
      throw new NotFoundException('there is no pokemon with that name');
    }
    return result;
  }

  //este metodo permite resolver el tip 1 del problema 2 que su enunciado es Suma total de pokemones por tipo, debe recibir el tipo en string.
  async countPokemonByType(typePokemon: string) {
    const idTypePokemon = await this.http
      .get('https://pokeapi.co/api/v2/type/')
      .toPromise()
      .then((response) => {
        return response.data;
      });

    if (
      idTypePokemon.results.filter((row) => row.name === typePokemon).length < 1
    ) {
      throw new BadRequestException('the type of pokemon is wrong');
    }
    const getInfo = await this.findPokemonByType(typePokemon);
    return { totalOfPokemonByType: getInfo.pokemon.length };
  }

  //aca se procesan dos tipos de pokemon y se devuelve solo los que coinciden
  async getAllPokemonByTypes(typesOfPokemon: any) {
    const result = [];

    //este manejo de la data del params se hace por la forma en que pasan los datos si los datos los pasaramos de otra forma se haria distinto
    const paramsInArray = Object.entries(typesOfPokemon).map((row) => {
      return row[1];
    });
    for (let i = 0; i < paramsInArray.length; i++) {
      const getInfo = await this.findPokemonByType(paramsInArray[i]);
      result.push(getInfo.pokemon);
    }
    const arrayResult = result.flat();

    //se usa una funcion reduce para poder realizar un solo ciclo que permita separar los valores duplicados de los no dpuplicados
    const { duplicateList, listWithoutDuplicates } = arrayResult.reduce(
      (result, item, index, arr) => {
        const duplicatesFound = arr.filter((element, i) => {
          return element.pokemon.name === item.pokemon.name && i !== index;
        });
        if (duplicatesFound.length > 0) {
          result.duplicateList.push(item);
        } else {
          result.listWithoutDuplicates.push(item);
        }
        return result;
      },
      { duplicateList: [], listWithoutDuplicates: [] },
    );
    //aunque se pasan solo los que coinciden, tambien se genera un array adicional con todos los pokemon pero sin los duplicados
    return {
      pokemonWithTwoTypes: duplicateList,
    };
  }

  //aca se trabaja con el nombre del pokemon y se devuelve el id
  async getPokemonByName(namePokemon: string) {
    const pokemonEntity = await this.findPokemonByName(namePokemon);
    return { idPokemon: pokemonEntity?.id };
  }

  //aca se devuelven los stats del pokemon segun el id que pasemos
  async getPokemonStatsById(idPokemon: string) {
    const pokemonEntity = await this.findPokemonById(idPokemon);
    return { idPokemon: pokemonEntity?.stats };
  }

  // se filtra por ids pero se ordenan segun ciertos paramentros
  async pokemonDataByIds(payload: FilterDto) {
    const payloadIds = payload.ids;
    const pokemonData = [];
    let orderedResult;

    for (let i = 0; i < payload.ids.length; i++) {
      const infoRaw = await this.findPokemonById(payloadIds[i]);
      pokemonData.push(infoRaw);
    }

    //se traen solo los datos pedidos para la respuesta
    const unOrderedResult = pokemonData.map((row) => {
      return {
        name: row.name,
        weight: row.weight,
        type: row.types,
      };
    });

    //caso de uso de ordenamiento por weight
    if (payload.orderBy === 'weight') {
      orderedResult = unOrderedResult.sort((a, b) => a.weight - b.weight);
    }
    //caso de uso de ordenamiento por type - aca le damos prioridad en los casos que trae mas de 1 tipo al primero
    if (payload.orderBy === 'type') {
      orderedResult = unOrderedResult.sort((a, b) => {
        const typeA = a.type[0].type.name;
        const typeB = b.type[0].type.name;
        return typeA.localeCompare(typeB);
      });
    }
    //caso de uso de ordenamiento por name
    if (payload.orderBy === 'name') {
      // Orden ascendente
      orderedResult = unOrderedResult.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }
    return orderedResult;
  }

  async BooleanByCompareIdAndTypePokemon(payload: TypeAndIdDto) {
    const infoRaw = await this.findPokemonById(payload.id);
    const result = infoRaw.types.filter(
      (row: any) => row.type.name === payload.type,
    );

    return result.length > 0;
  }
}
