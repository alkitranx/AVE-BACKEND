import { Module } from '@nestjs/common';
import { Problem3Controller } from './problem3.controller';
import { Problem3Service } from './problem3.service';

@Module({
  imports: [],
  controllers: [Problem3Controller],
  providers: [Problem3Service],
})
export class Problem3Module {}
