import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TicketService } from '../tickets/ticket.service';
import { GainDeliveryController } from './gain-delivery.controller';
import { GainDeliveryService } from './gain-delivery.service';
import { GainModule } from '../gains/gain.module';
import { GainService } from '../gains/gain.service';

@Module({
    controllers: [GainDeliveryController],
    providers: [
        GainService,
        GainDeliveryService, 
        PrismaService,
        TicketService,
    ],
})
export class GainDeliveryModule {}
