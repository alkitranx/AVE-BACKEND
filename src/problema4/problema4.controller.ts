import { Controller, Query, Get, Param, Post, Body } from '@nestjs/common';
import { Problem4Service } from './problema4.service';
import { NumbersArrayDto } from './dto/numbersArrayDto';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class Problem4Controller {
  constructor(private readonly appService: Problem4Service) {}

  @ApiOperation({
    summary:
      'Dado un arreglo de números (cualquiera) sacar la siguiente información',
  })
  @Post('problem4')
  getHello(@Body() body: NumbersArrayDto): any {
    return this.appService.validatorNumberArray(body.arrayNumbers);
  }
}
