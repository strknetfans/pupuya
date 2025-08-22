import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { CommonService } from './common/common.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, CommonService],
})
export class AppModule {}
