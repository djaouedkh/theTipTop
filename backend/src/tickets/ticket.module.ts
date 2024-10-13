import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { PrismaService } from '../../prisma/prisma.service';
import { GainService } from '../gains/gain.service';
import { GainDeliveryService } from '../gain-deliveries/gain-delivery.service';

@Module({
    controllers: [TicketController],
    providers: [
        TicketService, 
        GainService,
        GainDeliveryService,
        PrismaService
    ],
})
export class TicketModule {}
