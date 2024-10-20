import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ParticipateService } from './participate/participate.service';
import { UseCaseController } from './use-case.controller';
import { TicketService } from '../tickets/ticket.service';
import { GainService } from '../gains/gain.service';
import { ContestService } from '../contests/contest.service';
import { StatsService } from './stats/stats.service';
import { AuthGuard } from '../security/guards/auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [UseCaseController],
    providers: [
        ParticipateService,
        StatsService,
        TicketService,
        GainService,
        ContestService,
        PrismaService,
    ],
    imports: [
        AuthModule,
    ],
})
export class UseCaseModule {}
