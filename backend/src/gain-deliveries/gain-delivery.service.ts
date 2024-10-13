import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { TicketService } from '../tickets/ticket.service';
import { GainDeliveryCreateDto } from './dtos/gain-delivery-create.dto';
import { GainDeliveryGetDto } from './dtos/gain-delivery-get.dto';
import { GainDeliveryUpdateDto } from './dtos/gain-delivery-update.dto';

@Injectable()
export class GainDeliveryService {
    constructor(
        private prisma: PrismaService,
        private ticketService: TicketService,
    ) {}

    // Récupérer toutes les distributions
    async getAll(): Promise<GainDeliveryGetDto[]> {
        const allData = await this.prisma.gainDelivery.findMany();
        return plainToInstance(GainDeliveryGetDto, allData, { excludeExtraneousValues: true });
    }

    // Récupérer une distribution par ID
    async getById(id: number): Promise<GainDeliveryGetDto> {
        const data = await this.prisma.gainDelivery.findUnique({
            where: { id },
        });

        if (!data) {
            throw new Error('Gain delivery not found');
        }

        return plainToInstance(GainDeliveryGetDto, data, { excludeExtraneousValues: true });
    }

    // Créer une distribution
    async create(data: GainDeliveryCreateDto): Promise<GainDeliveryGetDto> {
        const createData = await this.prisma.gainDelivery.create({
            data: {
                deliveryDate: data.deliveryDate,
                ticketId: data.ticketId,
                storeId: data.storeId,
            },
        });

        return plainToInstance(GainDeliveryGetDto, createData, { excludeExtraneousValues: true });
    }

    // Mettre à jour une distribution
    async update(id: number, data: GainDeliveryUpdateDto): Promise<GainDeliveryGetDto> {
        const updateData = await this.prisma.gainDelivery.update({
            where: { id },
            data: {
                deliveryDate: data.deliveryDate,
                storeId: data.storeId,
            },
        });

        return plainToInstance(GainDeliveryGetDto, updateData, { excludeExtraneousValues: true });
    }

    // Supprimer une distribution
    async delete(id: number): Promise<GainDeliveryGetDto> {
        const deleteData = await this.prisma.gainDelivery.delete({
            where: { id },
        });

        return plainToInstance(GainDeliveryGetDto, deleteData, { excludeExtraneousValues: true });
    }

    // FEATURES METIERS

    // async getClaimedPrizes(): Promise<GainDeliveryGetDto[]> {
    //     const claimedPrizes = await this.prisma.gainDelivery.findMany({
    //         where: { isClaimed: true },
    //         include: { prize: true, user: true }
    //     });
    
    //     return plainToInstance(GainDeliveryGetDto, claimedPrizes, { excludeExtraneousValues: true });
    // }

    // async claimPrize(ticketCode: string, storeId?: number): Promise<void> {
    //     const ticket = await this.prisma.ticket.findUnique({
    //         where: { ref: ticketCode }
    //     });
    
    //     if (!ticket || ticket.status) throw new Error('Ticket already claimed or not valid.');
    
    //     await this.prisma.gainDelivery.create({
    //         data: {
    //             prizeId: ticket.prizeId,
    //             userId: ticket.userId,
    //             storeId,
    //             isClaimed: true,
    //             dateClaimed: new Date()
    //         }
    //     });
    
    //     await this.ticketService.markTicketAsClaimed(ticketCode); // Marquer le ticket comme réclamé
    // }
    
    
}
