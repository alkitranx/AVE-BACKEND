import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidatorDto {
  @ApiProperty({ description: 'password para validar', required: true })
  @IsString()
  @MinLength(16)
  password: string;
}
