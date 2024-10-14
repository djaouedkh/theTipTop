import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { GainGetDto } from '../gains/dtos/gain-get.dto';
import { ParticipateService } from './participate/participate.service';
import { PlayToTheGameDto } from './participate/dtos/play-to-the-game.dto';
import { StatsService } from './stats/stats.service';

@Controller('')
export class UseCaseController {
    constructor(
        private readonly participateService: ParticipateService,
        private readonly statsService: StatsService,
    ) {}

    @Get('participate/:code')
    async playToTheGame(@Param('code') code: string): Promise<PlayToTheGameDto> {
        return this.participateService.playToTheGame(code);
    }

    @Get('stats/all-stats')
    async getAllStats(): Promise<any> {
        return this.statsService.getAllStats();
    }
}
