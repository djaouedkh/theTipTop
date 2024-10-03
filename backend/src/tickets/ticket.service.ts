import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { TicketGetDto } from './dtos/ticket-get.dto';
import { TicketCreateDto } from './dtos/ticket-create.dto';
import { TicketUpdateDto } from './dtos/ticket-update.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TicketService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<TicketGetDto[]> {
        const allTickets = await this.prisma.ticket.findMany();
        return plainToInstance(TicketGetDto, allTickets, { excludeExtraneousValues: true });
    }

    async getById(id: number): Promise<TicketGetDto> {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id },
        });

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        return plainToInstance(TicketGetDto, ticket, { excludeExtraneousValues: true });
    }

    async getByCriteria(criteria: Prisma.TicketWhereInput): Promise<TicketGetDto[]> {
        const tickets = await this.prisma.ticket.findMany({
            where: criteria,
        });
    
        return plainToInstance(TicketGetDto, tickets, { excludeExtraneousValues: true });
    }

    async create(data: TicketCreateDto): Promise<TicketGetDto> {
        const { ref, status, contestId, prizeId, userId } = data;

        const newTicket = this.prisma.ticket.create({
            data: {
                ref,
                status,
                contestId,
                prizeId,
                userId,
            },
        });

        return plainToInstance(TicketGetDto, newTicket, { excludeExtraneousValues: true });
    }

    async update(id: number, data: TicketUpdateDto): Promise<TicketGetDto> {
        const updateTicket = await this.prisma.ticket.update({
            where: { id },
            data: {
                ...data,
            },
        });

        return plainToInstance(TicketGetDto, updateTicket, { excludeExtraneousValues: true });
    }

    async delete(id: number): Promise<TicketGetDto> {
        const deleteTicket = await this.prisma.ticket.delete({
            where: { id },
        });

        return plainToInstance(TicketGetDto, deleteTicket, { excludeExtraneousValues: true });
    }

    // FEATURES METIERS

    async validateTicket(ticketCode: string): Promise<boolean> {
        const ticket = await this.prisma.ticket.findUnique({
            where: { ref: ticketCode }
        });
    
        return ticket ? !ticket.status : false;
    }

    async markTicketAsClaimed(ticketCode: string): Promise<void> {
        await this.prisma.ticket.update({
            where: { ref: ticketCode },
            data: { status: true }
        });
    }
    
    
}
