import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InputDto {
  @ApiProperty({
    description: 'numberA',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  numberA: number;
  @ApiProperty({
    description: 'numberB',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  numberB: number;
}
