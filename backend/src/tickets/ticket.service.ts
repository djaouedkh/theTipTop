import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { TicketGetDto, TicketIncludeDto, TicketSearchDto } from './dtos/ticket-get.dto';
import { TicketCreateDto } from './dtos/ticket-create.dto';
import { TicketUpdateDto } from './dtos/ticket-update.dto';
import { Prisma } from '@prisma/client';
import { GainService } from '../gains/gain.service';
import { GainGetDto } from '../gains/dtos/gain-get.dto';

@Injectable()
export class TicketService {
    constructor(
        private prisma: PrismaService,
        private gainService: GainService,
    ) {}

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

    async getByCriteria(criteria: TicketSearchDto, includeOptions?: TicketIncludeDto): Promise<TicketGetDto> {
        const ticket = await this.prisma.ticket.findFirst({
            where: criteria,
            include: includeOptions || {},
        });
        return plainToInstance(TicketGetDto, ticket, { excludeExtraneousValues: true });
    }
    async getAllByCriteria(criteria: TicketSearchDto, includeOptions?: TicketIncludeDto): Promise<TicketGetDto[]> {
        const tickets = await this.prisma.ticket.findMany({
            where: criteria,
            include: includeOptions || {},
        });
        return plainToInstance(TicketGetDto, tickets, { excludeExtraneousValues: true });
    }
    

    async create(data: TicketCreateDto): Promise<TicketGetDto> {
        const { code, contestId, gainId } = data;

        const newTicket = this.prisma.ticket.create({
            data: {
                code,
                contestId,
                gainId,
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
    
}
