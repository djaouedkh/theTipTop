import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { GlobalStatsDto } from './dtos/global-stats.dto';
import { TicketService } from '../../tickets/ticket.service';
import { AdvancedStatsDto } from './dtos/advanced-stats.dto';

@Injectable()
export class StatsService {
    constructor(
        private prisma: PrismaService,
        private ticketService: TicketService,
    ) {}

    async getAllStats(): Promise<GlobalStatsDto> {
        const totalTickets = await this.prisma.ticket.count();
        const ticketsPlayed = await this.prisma.ticket.count({ where: { userId: { not: null } } });
        const ticketsNotPlayed = await this.prisma.ticket.count({ where: { userId: null } });
        const totalParticipants = await this.getAllParticipants();
        const claimedGains = await this.prisma.ticket.count({ where: { isDelivered: true } });
        const unclaimedGains = await this.prisma.ticket.count({ where: { isDelivered: false } });
        
        return plainToInstance(GlobalStatsDto, {
            totalTickets,
            ticketsPlayed,
            ticketsNotPlayed,
            totalParticipants,
            claimedGains,
            unclaimedGains,
        });
    }

    async getAllAdvancedStats(): Promise<AdvancedStatsDto> {
        
    }

    async getAllParticipants(): Promise<number> {
        const userIdKey: keyof Prisma.TicketWhereInput = 'userId';
        const uniqueParticipantCount = await this.prisma.ticket.groupBy({
            by: [userIdKey],
            where: {
                userId: { not: null },
            },
            _count: {
                _all: true,
            },
        });
        return uniqueParticipantCount.length;
    }
}
