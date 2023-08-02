import { Controller, Query, Get, Param, Post, Body } from '@nestjs/common';
import { Problem2Service } from './problema2.service';
import { GetPokemonByTypesDto, InputDto } from './dto';
import { FilterDto } from './dto/filter.dto';
import { TypeAndIdDto } from './dto/typeAndIdDto';
import { InputByTypeDto } from './dto/inputByType.dto';
import { ApiOperation } from '@nestjs/swagger';
import { NamePokemonDto } from './dto/namePokemonDto';

@Controller()
export class Problem2Controller {
  constructor(private readonly appService: Problem2Service) {}

  @ApiOperation({
    summary:
      'Suma total de pokemones por tipo, debe recibir el tipo en string.',
  })
  @Get('problem2T1')
  countPokemonByType(@Query() query: InputByTypeDto): Promise<any> {
    return this.appService.countPokemonByType(query.typePokemon);
  }

  @ApiOperation({
    summary:
      'Suma total de pokemones que coinciden con dos tipos de pokemon, debe recibir el tipo en string.',
  })
  @Get('problem2T2')
  getAllPokemonByTypes(@Query() query: GetPokemonByTypesDto): Promise<any> {
    console.log(query);
    return this.appService.getAllPokemonByTypes(query);
  }

  @ApiOperation({
    summary: ' Dado el nombre de un pokémon retornar el número del mismo.',
  })
  @Get('problem2t3')
  getPokemonByName(@Query() query: NamePokemonDto): Promise<any> {
    return this.appService.getPokemonByName(query.namePokemon);
  }
  @ApiOperation({
    summary:
      ' Dado el número de un pokémon retornar un objeto con sus 6 stats base.',
  })
  @Get('problem2t4/:id')
  getPokemonStatsById(@Param() params: InputDto): Promise<any> {
    return this.appService.getPokemonStatsById(params.id);
  }
  @ApiOperation({
    summary:
      'Realizar una función que reciba un arreglo de números (Ids de pokémon) y un\n' +
      '  ordenador y retorne los pokémon en un arreglo con su nombre, tipo y peso\n' +
      '  ordenados según se indique por la función por uno de estos 3 indicadores.',
  })
  @Post('problem2t5')
  findPokemonDataByIds(@Body() body: FilterDto): Promise<any> {
    return this.appService.pokemonDataByIds(body);
  }
  @ApiOperation({
    summary:
      'Recibir un número y un tipo (de pokémon) y retornar un true o false si el\n' +
      '  pokémon de ese número posee este tipo.',
  })
  @Post('problem2t6')
  comparePokemon(@Body() body: TypeAndIdDto): Promise<any> {
    return this.appService.BooleanByCompareIdAndTypePokemon(body);
  }
}
