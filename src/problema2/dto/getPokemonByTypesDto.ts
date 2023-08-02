import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { typePokemon } from '../helpers/listOfEnums';
import { ApiProperty } from '@nestjs/swagger';

export class GetPokemonByTypesDto {
  @ApiProperty({ description: 'primer tipo de pokemon', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEnum(typePokemon)
  typePokemon1: string;
  @ApiProperty({ description: 'segundo tipo de pokemon', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEnum(typePokemon)
  typePokemon2: string;
}
