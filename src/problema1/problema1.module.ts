import { Module } from '@nestjs/common';
import { Problem1Controller } from './problema1.controller';
import { Problem1Service } from './problema1.service';

@Module({
  imports: [],
  controllers: [Problem1Controller],
  providers: [Problem1Service],
})
export class Problem1Module {}
