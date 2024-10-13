import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { GainGetDto } from '../gains/dtos/gain-get.dto';
import { ParticipateService } from './participate/participate.service';
import { PlayToTheGameDto } from './participate/dtos/play-to-the-game.dto';

@Controller('')
export class UseCaseController {
    constructor(
        private readonly participateService: ParticipateService,
    ) {}

    @Get('participate/:code')
    async playToTheGame(@Param('code') code: string): Promise<PlayToTheGameDto> {
        return this.participateService.playToTheGame(code);
    }
}
