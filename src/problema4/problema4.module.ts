import { Module } from '@nestjs/common';
import { Problem4Controller } from './problema4.controller';
import { Problem4Service } from './problema4.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [Problem4Controller],
  providers: [Problem4Service],
})
export class Problem4Module {}
