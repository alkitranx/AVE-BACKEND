import { Controller, Post, Body } from '@nestjs/common';
import { Problem3Service } from './problem3.service';
import { ValidatorDto } from './dto/validatorDto';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class Problem3Controller {
  constructor(private readonly appService: Problem3Service) {}

  @ApiOperation({
    summary:
      'Se desea crear un validador para la contraseña de un sitio web, pero esta debe ser muy segura,.',
  })
  @Post('problem3')
  passValidator(@Body() body: ValidatorDto): string {
    return this.appService.passwordValidator(body.password);
  }
}
