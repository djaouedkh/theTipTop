import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { GainGetDto } from '../../gains/dtos/gain-get.dto';
import { TicketService } from '../../tickets/ticket.service';
import { PlayToTheGameDto } from './dtos/play-to-the-game.dto';
import { ContestService } from '../../contests/contest.service';

@Injectable()
export class ParticipateService {
    constructor(
        private prisma: PrismaService,
        private ticketService: TicketService,
        private contestService: ContestService
    ) {}

    async playToTheGame(code: string): Promise<PlayToTheGameDto> {
        const ticket = await this.ticketService.getByCriteria(
            { code, isDelivered: false },
            { gain: true, contest: true }
        );
        if (!ticket) return { isWinner: false}

        // check is expired contest
        const isExpiredContest = this.contestService._isExpiredContest(ticket.contest);
        if (!isExpiredContest) return { isWinner: false }

        // associate ticket to user
        await this.ticketService.update(ticket.id, {
            userId: 1, // TODO: get user from store
        });    

        // gain win
        const gainWin = plainToInstance(GainGetDto, ticket.gain, { excludeExtraneousValues: true });

        // return response type PlayToTheGameDto
        return {
            gain: gainWin,
            isWinner: true,
        };
    }
}
