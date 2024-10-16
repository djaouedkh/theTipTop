import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { GainGetDto } from '../gains/dtos/gain-get.dto';
import { ParticipateService } from './participate/participate.service';
import { PlayToTheGameDto } from './participate/dtos/play-to-the-game.dto';
import { StatsService } from './stats/stats.service';
import { GlobalStatsDto } from './stats/dtos/global-stats.dto';
import { AdvancedStatsDto } from './stats/dtos/advanced-stats.dto';
import { Gender } from './stats/enums/gender.enum';
import { AgeGroup } from './stats/enums/age-group.enum';

@Controller('')
export class UseCaseController {
    constructor(
        private readonly participateService: ParticipateService,
        private readonly statsService: StatsService,
    ) {}

    // PARTICIPATE
    @Get('participate/:code')
    async playToTheGame(@Param('code') code: string): Promise<PlayToTheGameDto> {
        return this.participateService.playToTheGame(code);
    }

    // STATS
    @Get('stats/count-participants')
    async getAllCountParticipants(): Promise<number> {
        return this.statsService.getAllCountParticipants();
    }

    @Get('stats/count-all-stats')
    async getAllStats(): Promise<GlobalStatsDto> {
        return this.statsService.getAllStats();
    }

    @Get('stats/count-all-advanced-stats')
    async getAllAdvancedStats(): Promise<AdvancedStatsDto> {
        return this.statsService.getAllAdvancedStats();
    }

    @Get('stats/count-participants-by-gender')
    async getAllCountParticipantsByGender(@Query('gender') gender?: Gender): Promise<number | { male: number; female: number }> {
        return this.statsService.getAllCountParticipantsByGender(gender);
    }

    @Get('stats/count-participants-by-age-group')
    async getAllCountParticipantsByAgeGroup(@Query('ageGroups') ageGroups?: AgeGroup[]): Promise<{ [key in AgeGroup]?: number }> {
        return this.statsService.getAllCountParticipantsByAgeGroup(ageGroups);
    }

    @Get('stats/count-gains-distribution')
    async getAllCountGainsDistribution(): Promise<{ [gainName: string]: number }> {
        return this.statsService.getAllCountGainsDistribution();
    }
}
