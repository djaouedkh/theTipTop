import { Module } from '@nestjs/common';
import { GainController } from './gain.controller';
import { GainService } from './gain.service';
import { PrismaService } from '../../prisma/prisma.service';
import { GainDeliveryService } from '../gain-deliveries/gain-delivery.service';
import { TicketService } from '../tickets/ticket.service';

@Module({
    controllers: [GainController],
    providers: [
        GainService,
        GainDeliveryService,
        TicketService,
        PrismaService,
    ],
})
export class GainModule {}
