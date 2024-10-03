import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { PrizeDistributionCreateDto } from './dtos/prize-distribution-create.dto';
import { PrizeDistributionGetDto } from './dtos/prize-distribution-get.dto';
import { PrizeDistributionUpdateDto } from './dtos/prize-distribution-update.dto';
import { Prisma } from '@prisma/client';
import { TicketService } from '../tickets/ticket.service';

@Injectable()
export class PrizeDistributionService {
    constructor(
        private prisma: PrismaService,
        private ticketService: TicketService,
    ) {}

    // Récupérer toutes les distributions
    async getAll(): Promise<PrizeDistributionGetDto[]> {
        const allData = await this.prisma.prizeDistribution.findMany();
        return plainToInstance(PrizeDistributionGetDto, allData, { excludeExtraneousValues: true });
    }

    // Récupérer une distribution par ID
    async getById(id: number): Promise<PrizeDistributionGetDto> {
        const data = await this.prisma.prizeDistribution.findUnique({
            where: { id },
        });

        if (!data) {
            throw new Error('Prize Distribution not found');
        }

        return plainToInstance(PrizeDistributionGetDto, data, { excludeExtraneousValues: true });
    }

    // Créer une distribution
    async create(data: PrizeDistributionCreateDto): Promise<PrizeDistributionGetDto> {
        const createData = await this.prisma.prizeDistribution.create({
            data: {
                userId: data.userId,
                prizeId: data.prizeId,
                storeId: data.storeId,
                isClaimed: data.isClaimed || false,
                dateClaimed: data.dateClaimed,
            },
        });

        return plainToInstance(PrizeDistributionGetDto, createData, { excludeExtraneousValues: true });
    }

    // Mettre à jour une distribution
    async update(id: number, data: PrizeDistributionUpdateDto): Promise<PrizeDistributionGetDto> {
        const updateData = await this.prisma.prizeDistribution.update({
            where: { id },
            data: {
                isClaimed: data.isClaimed,
                dateClaimed: data.dateClaimed,
                storeId: data.storeId,
            },
        });

        return plainToInstance(PrizeDistributionGetDto, updateData, { excludeExtraneousValues: true });
    }

    // Supprimer une distribution
    async delete(id: number): Promise<PrizeDistributionGetDto> {
        const deleteData = await this.prisma.prizeDistribution.delete({
            where: { id },
        });

        return plainToInstance(PrizeDistributionGetDto, deleteData, { excludeExtraneousValues: true });
    }

    // FEATURES METIERS

    async getClaimedPrizes(): Promise<PrizeDistributionGetDto[]> {
        const claimedPrizes = await this.prisma.prizeDistribution.findMany({
            where: { isClaimed: true },
            include: { prize: true, user: true }
        });
    
        return plainToInstance(PrizeDistributionGetDto, claimedPrizes, { excludeExtraneousValues: true });
    }

    async claimPrize(ticketCode: string, storeId?: number): Promise<void> {
        const ticket = await this.prisma.ticket.findUnique({
            where: { ref: ticketCode }
        });
    
        if (!ticket || ticket.status) throw new Error('Ticket already claimed or not valid.');
    
        await this.prisma.prizeDistribution.create({
            data: {
                prizeId: ticket.prizeId,
                userId: ticket.userId,
                storeId,
                isClaimed: true,
                dateClaimed: new Date()
            }
        });
    
        await this.ticketService.markTicketAsClaimed(ticketCode); // Marquer le ticket comme réclamé
    }
    
    
}
