import { Module } from '@nestjs/common';
import { Problem2Controller } from './problema2.controller';
import { Problem2Service } from './problema2.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [Problem2Controller],
  providers: [Problem2Service],
})
export class Problem2Module {}
