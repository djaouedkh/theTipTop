import { Module } from '@nestjs/common';
import { ContestController } from './contest.controller';
import { ContestService } from './contest.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
    controllers: [ContestController],
    providers: [
        ContestService, 
        PrismaService,
    ],
})
export class ContestModule {}
