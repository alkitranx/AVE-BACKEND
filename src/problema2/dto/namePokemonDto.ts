import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NamePokemonDto {
  @ApiProperty({
    required: true,
    description: 'Nombre del pokemon para la busqueda',
  })
  @IsNotEmpty()
  @IsString()
  namePokemon: string;
}
