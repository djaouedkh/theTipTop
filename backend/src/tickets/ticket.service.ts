import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { TicketGetDto, TicketIncludeDto, TicketSearchDto } from './dtos/ticket-get.dto';
import { TicketCreateDto } from './dtos/ticket-create.dto';
import { TicketUpdateDto } from './dtos/ticket-update.dto';
import { Prisma } from '@prisma/client';
import { GainService } from '../gains/gain.service';
import { GainGetDto } from '../gains/dtos/gain-get.dto';
import { GainTypes } from '../gains/enums/gain-types.enum';

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
    
    // JOB LOGIC
    async generateTickets(nbrGenTickets: number): Promise<void> {
        const gainMap = await this.gainService.associateIdsWithGainTypes();
        
        // Pourcentages fixes des gains
        const percentages = {
            [GainTypes.INFUSEUR_THE]: 0.6,
            [GainTypes.BOITE_THE_DETOX]: 0.2,
            [GainTypes.BOITE_THE_SIGNATURE]: 0.1,
            [GainTypes.COFFRET_DECOUVERTE_39]: 0.06,
            [GainTypes.COFFRET_DECOUVERTE_69]: 0.04,
        };
    
        const ticketsToGenerate = [];
        let totalTicketsGenerated = 0;
    
        // Calculer le nombre de tickets pour chaque gain avec précision
        const gainTypes = Object.keys(percentages);
        let remainingTickets = nbrGenTickets;
    
        for (let i = 0; i < gainTypes.length - 1; i++) {
            const gainType = gainTypes[i] as GainTypes;
            const percentage = percentages[gainType];
            const numberOfTicketsForGain = Math.round(percentage * nbrGenTickets); // Arrondi standard pour éviter de perdre des tickets
            const gainId = gainMap[gainType];
    
            for (let j = 0; j < numberOfTicketsForGain; j++) {
                ticketsToGenerate.push({
                    code: this.generateTicketCode(),
                    gainId,
                    contestId: 1,
                    isDelivered: false,
                });
            }
    
            totalTicketsGenerated += numberOfTicketsForGain;
            remainingTickets -= numberOfTicketsForGain;
        }
    
        // Le dernier gain prend tous les tickets restants
        const lastGainType = gainTypes[gainTypes.length - 1] as GainTypes;
        const lastGainId = gainMap[lastGainType];
        
        for (let k = 0; k < remainingTickets; k++) {
            ticketsToGenerate.push({
                code: this.generateTicketCode(),
                gainId: lastGainId,
                contestId: 1,
                isDelivered: false,
            });
        }
    
        // Insérer les tickets en base de données
        await this.prisma.ticket.createMany({
            data: ticketsToGenerate,
        });
    }
    
    // Méthode pour générer un code unique pour chaque ticket
    private generateTicketCode(): string {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    }
    
}
