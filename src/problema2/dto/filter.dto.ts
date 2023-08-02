import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { filter } from '../helpers/listOfEnums';
import { ApiProperty } from '@nestjs/swagger';
export class FilterDto {
  @ApiProperty({
    description: 'formato por el cual se debe ordenar los resultados',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(filter)
  orderBy: string;
  @ApiProperty({
    description: 'arrays de id de pokemons para realizar la busqueda',
    required: true,
    default: [1, 2, 3, 4, 5, 6, 7, 8],
  })
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  ids: number[];
}
