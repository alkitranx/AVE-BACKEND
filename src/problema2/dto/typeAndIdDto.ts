import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { typePokemon } from '../helpers/listOfEnums';
import { ApiProperty } from '@nestjs/swagger';

export class TypeAndIdDto {
  @ApiProperty({ description: 'tipo de pokemon', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEnum(typePokemon)
  type: string;
  @ApiProperty({ required: true, description: 'id del pokemon' })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
