import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ContestCreateDto } from './dtos/contest-create.dto';
import { ContestUpdateDto } from './dtos/contest-update.dto';
import { ContestGetDto, ContestIncludeDto, ContestSearchDto } from './dtos/contest-get.dto';
import { Prisma } from '@prisma/client';
import { UserGetDto } from '../users/dtos/user-get.dto';

@Injectable()
export class ContestService {
    constructor(private prisma: PrismaService) {}

    // Récupérer tous les concours
    async getAll(): Promise<ContestGetDto[]> {
        const allData = await this.prisma.contest.findMany();
        return plainToInstance(ContestGetDto, allData, { excludeExtraneousValues: true });
    }

    // Récupérer un concours par ID
    async getById(id: number): Promise<ContestGetDto> {
        const data = await this.prisma.contest.findUnique({
            where: { id },
        });

        if (!data) {
            throw new Error('Contest not found');
        }

        return plainToInstance(ContestGetDto, data, { excludeExtraneousValues: true });
    }

    async getByCriteria(criteria: ContestSearchDto, includeOptions?: ContestIncludeDto): Promise<ContestGetDto> {
        const data = await this.prisma.contest.findFirst({
            where: criteria,
            include: includeOptions || {},
        });
        return plainToInstance(ContestGetDto, data, { excludeExtraneousValues: true });
    }
    async getAllByCriteria(criteria: ContestSearchDto, includeOptions?: ContestIncludeDto): Promise<ContestGetDto[]> {
        const allData = await this.prisma.contest.findMany({
            where: criteria,
            include: includeOptions || {},
        });
        return plainToInstance(ContestGetDto, allData, { excludeExtraneousValues: true });
    }

    // Créer un concours
    async create(data: ContestCreateDto): Promise<ContestGetDto> {
        const createData = await this.prisma.contest.create({
            data: {
                name: data.name,
                startDate: data.startDate,
                endDate: data.endDate,
            },
        });

        return plainToInstance(ContestGetDto, createData, { excludeExtraneousValues: true });
    }

    // Mettre à jour un concours
    async update(id: number, data: ContestUpdateDto): Promise<ContestGetDto> {
        const updateData = await this.prisma.contest.update({
            where: { id },
            data: {
                name: data.name,
                startDate: data.startDate,
                endDate: data.endDate,
            },
        });

        return plainToInstance(ContestGetDto, updateData, { excludeExtraneousValues: true });
    }

    // Supprimer un concours
    async delete(id: number): Promise<ContestGetDto> {
        const deleteData = await this.prisma.contest.delete({
            where: { id },
        });

        return plainToInstance(ContestGetDto, deleteData, { excludeExtraneousValues: true });
    }

    // FEATURES METIERS

    _isExpiredContest(contest: ContestGetDto): boolean {
        const currentDate = new Date();
        // Vérifier si le concours est encore en cours ou si le ticket est dans la période de validité
        const validUntil = new Date(contest.endDate);
        validUntil.setDate(validUntil.getDate() + 30); // 30 jours après la fin du concours
        if (currentDate > validUntil || currentDate < contest.startDate) {
            return false;
        }
        return true;
    }

    // async generateCodes(numCodes: number): Promise<void> {
    //     const codes = [];
    //     for (let i = 0; i < numCodes; i++) {
    //         const code = this.generateUniqueCode(); // Génère un code unique
    //         codes.push({
    //             ref: code,
    //             status: false, // Par défaut, un ticket est non utilisé
    //             contestId: 1 // ID du concours en cours
    //         });
    //     }
    //     await this.prisma.ticket.createMany({ data: codes });
    // }

    // async drawWinner(contestId: number): Promise<UserGetDto> {
    //     const winningTicket = await this.prisma.ticket.findFirst({
    //         where: { contestId, status: true },
    //         orderBy: { issuedDate: 'asc' } // Tirer au sort en fonction de la date d'émission
    //     });
    
    //     if (!winningTicket) throw new Error('No valid ticket found for this contest.');
    
    //     const winner = await this.prisma.user.findUnique({
    //         where: { id: winningTicket.userId }
    //     });
    
    //     return plainToInstance(UserGetDto, winner, { excludeExtraneousValues: true });
    // }
    
    // async getContestStats(contestId: number): Promise<any> {
    //     const totalTickets = await this.prisma.ticket.count({ where: { contestId } });
    //     const usedTickets = await this.prisma.ticket.count({ where: { contestId, status: true } });
    //     const remainingTickets = totalTickets - usedTickets;
    
    //     return {
    //         totalTickets,
    //         usedTickets,
    //         remainingTickets
    //     };
    // }   
    
    // generateUniqueCode(): string {
    //     // Génère un code aléatoire de 10 caractères (chiffres et lettres)
    //     return Math.random().toString(36).substring(2, 12).toUpperCase();
    // }
}
