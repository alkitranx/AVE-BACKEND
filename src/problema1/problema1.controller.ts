import { Controller, Post, Body } from '@nestjs/common';
import { Problem1Service } from './problema1.service';
import { InputDto } from './dto/input.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class Problem1Controller {
  constructor(private readonly appService: Problem1Service) {}

  @ApiOperation({
    summary:
      'Permite multiplicar dos valores sin usar el operador de multiplicacion',
  })
  @Post('problem1')
  getHello(@Body() body: InputDto): string {
    return this.appService.multiplicationWithoutOperator(body);
  }
}
