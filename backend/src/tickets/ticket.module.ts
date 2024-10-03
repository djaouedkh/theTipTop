import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
    controllers: [TicketController],
    providers: [TicketService, PrismaService],
})
export class TicketModule {}
