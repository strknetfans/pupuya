import { Module } from '@nestjs/common';
import { GenerateController } from './generate.controller';
import { GenerateService } from './generate.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
	controllers: [GenerateController],
	providers: [GenerateService, PrismaService],
})
export class GenerateModule { } 