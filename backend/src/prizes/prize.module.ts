import { Module } from '@nestjs/common';
import { PrizeController } from './prize.controller';
import { PrizeService } from './prize.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
    controllers: [PrizeController],
    providers: [
        PrizeService,
        PrismaService,
    ],
})
export class PrizeModule {}
