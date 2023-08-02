import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Problem1Module } from './problema1/problema1.module';
import { Problem2Module } from './problema2/problema2.module';
import { Problem3Module } from './problema3/problem3.module';
import { Problem4Module } from './problema4/problema4.module';

@Module({
  imports: [Problem1Module, Problem2Module, Problem3Module, Problem4Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
