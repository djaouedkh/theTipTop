import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LotteryGameService } from './lottery-game.service';
import { LotteryGameController } from './lottery-game.controller';

@Module({
    controllers: [LotteryGameController],
    providers: [
        LotteryGameService,
        PrismaService,
    ],
})
export class LotteryGameModule {}
