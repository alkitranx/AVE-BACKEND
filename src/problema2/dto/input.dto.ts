import { IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { typePokemon } from '../helpers/listOfEnums';
import { ApiProperty } from '@nestjs/swagger';

export class InputDto {
  @ApiProperty({ required: true, description: 'id del pokemon para consultar' })
  @IsNotEmpty()
  @IsNumberString()
  id: string;
}
