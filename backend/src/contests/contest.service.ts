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

    async isValid(contest?: ContestGetDto): Promise<boolean> {
        if (!contest) {
            contest = await this.prisma.contest.findFirst();
        }
        const currentDate = new Date();
        const validUntil = new Date(contest.endDate);
        validUntil.setDate(validUntil.getDate() + 30); // 30 jours après la fin du concours
    
        // La validité est basée sur si la date actuelle est comprise entre la date de début et la date de fin + 30 jours
        return currentDate >= new Date(contest.startDate) && currentDate <= validUntil;
    }
    

    async getAllValid(): Promise<ContestGetDto[]> {
        const currentDate = new Date();
        const validContests = await this.prisma.contest.findMany({
            where: {
                startDate: {
                    lte: currentDate, // Le concours a commencé
                },
                endDate: {
                    gte: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000), // La date actuelle est dans les 30 jours après la fin
                },
            },
        });
        return plainToInstance(ContestGetDto, validContests, { excludeExtraneousValues: true });
    }
}
