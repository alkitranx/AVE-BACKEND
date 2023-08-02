import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { typePokemon } from '../helpers/listOfEnums';
import { ApiProperty } from '@nestjs/swagger';

export class InputByTypeDto {
  @ApiProperty({
    description: 'tipo de pokemon para consultar',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(typePokemon)
  typePokemon: string;
}
