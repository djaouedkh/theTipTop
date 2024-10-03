import { Module } from '@nestjs/common';
import { PrizeDistributionController } from './prize-distribution.controller';
import { PrizeDistributionService } from './prize-distribution.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TicketService } from '../tickets/ticket.service';

@Module({
    controllers: [PrizeDistributionController],
    providers: [
        PrizeDistributionService, 
        PrismaService,
        TicketService,
    ],
})
export class PrizeDistributionModule {}
