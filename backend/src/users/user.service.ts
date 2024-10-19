import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UserGetDto, UserIncludeDto, UserSearchDto } from './dtos/user-get.dto';
import { UserCreateDto } from './dtos/user-create.dto';
import { UpdateUserDto } from './dtos/user-update.dto';
import { Prisma } from '@prisma/client';
import { UserFilterDto } from './dtos/user-filter.dto';
import { AgeGroup } from '../use-cases/stats/enums/age-group.enum';
import { Gender } from '../use-cases/stats/enums/gender.enum';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<UserGetDto[]> {
        const allData = await this.prisma.user.findMany();
        return plainToInstance(UserGetDto, allData, { excludeExtraneousValues: true });
    }

    async getById(id: number): Promise<UserGetDto> {
        const data = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!data) {
            throw new Error('User not found');
        }

        return plainToInstance(UserGetDto, data, { excludeExtraneousValues: true });
    }

    async getByCriteria(criteria: UserSearchDto, includeOptions?: UserIncludeDto): Promise<UserGetDto> {
        const data = await this.prisma.user.findFirst({
            where: criteria,
            include: includeOptions || {},
        });
        return plainToInstance(UserGetDto, data, { excludeExtraneousValues: true });
    }
    async getAllByCriteria(criteria: UserSearchDto, includeOptions?: UserIncludeDto): Promise<UserGetDto[]> {
        const allData = await this.prisma.user.findMany({
            where: criteria,
            include: includeOptions || {},
        });
        return plainToInstance(UserGetDto, allData, { excludeExtraneousValues: true });
    }

    async create(data: UserCreateDto): Promise<UserGetDto> {
        const { firstname, lastname, email, password, gender, age, roleId } = data;

        const createData = this.prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password,
                gender,
                age,
                role: {
                    connect: {
                        id: roleId,
                    },
                },
            },
        });

        return plainToInstance(UserGetDto, createData, { excludeExtraneousValues: true });
    }

    async update(id: number, data: UpdateUserDto): Promise<UserGetDto> {
        const { firstname, lastname, email, password, roleId } = data;

        const updateData = await this.prisma.user.update({
            where: { id },
            data: {
                firstname,
                lastname,
                email,
                password,
                roleId,
            },
        });

        return plainToInstance(UserGetDto, updateData, { excludeExtraneousValues: true });
    }

    async delete(id: number): Promise<UserGetDto> {
        const deleteData = await this.prisma.user.delete({
            where: { id },
        });

        return plainToInstance(UserGetDto, deleteData, { excludeExtraneousValues: true });
    }

    // FEATURES METIERS

    async filterUsers(filters: UserFilterDto): Promise<UserGetDto[]> {
        console.log('filters', filters);
        const whereConditions: Prisma.UserWhereInput = {};
    
        // Appliquer les filtres uniquement si les valeurs sont présentes
        if (filters.ageGroup && Object.values(AgeGroup).includes(filters.ageGroup)) {
            const ageRanges = {
                [AgeGroup.YoungAdult]: { min: 18, max: 25 },
                [AgeGroup.Adult]: { min: 26, max: 35 },
                [AgeGroup.MiddleAged]: { min: 36, max: 45 },
                [AgeGroup.Senior]: { min: 46, max: 55 },
                [AgeGroup.Elder]: { min: 56, max: 150 },
            };
            const { min, max } = ageRanges[filters.ageGroup];
            whereConditions.age = { gte: min, lte: max };
        }
        
        if (filters.gender && Object.values(Gender).includes(filters.gender)) {
            whereConditions.gender = filters.gender;
        }

        // Vérifier si les filtres 3 et 4 sont appliqués en même temps et lancer une erreur
        if (filters.hasUnclaimedTickets && filters.hasNeverParticipated) {
            throw new Error("Les filtres 'user ayant au moins un ticket non réclamé' et 'user n'ayant jamais participé' ne peuvent pas être combinés.");
        }
        
        if (filters.hasUnclaimedTickets) {
            whereConditions.tickets = {
                some: {
                    isDelivered: false,
                },
            };
        }
        
        if (filters.hasNeverParticipated) {
            whereConditions.tickets = {
                none: {},
            };
        }
        
        // Exécuter la requête avec les filtres appliqués (ou sans restriction si les filtres sont absents)
        const users = await this.prisma.user.findMany({
            where: whereConditions,
        });
        
        return plainToInstance(UserGetDto, users, { excludeExtraneousValues: true });
    }
}
