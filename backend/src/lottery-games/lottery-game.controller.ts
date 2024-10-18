import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LotteryGameService } from './lottery-game.service';
import { LotteryGameGetDto } from './dtos/lottery-game-get.dto';

@Controller('lottery-game')
export class LotteryGameController {
    constructor(private readonly service: LotteryGameService) {}

    @Get('/get')
    async get() {
        const winner = await this.service.get();
        return winner ? winner : { message: "Aucun gagnant pour le moment" };
    }

    @Post('/play')
    async drawWinner(): Promise<LotteryGameGetDto> {
        return this.service.play();
    }
}
