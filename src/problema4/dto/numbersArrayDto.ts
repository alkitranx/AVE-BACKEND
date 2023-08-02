import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NumbersArrayDto {
  @ApiProperty({
    required: true,
    description: 'array de numeros para hacer los calculos',
    example: [1, 50, 300, 1500, 200, 2],
  })
  @IsNumber({}, { each: true })
  arrayNumbers: number[];
}
