import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UserGetDto } from './dtos/user-get.dto';
import { UserCreateDto } from './dtos/user-create.dto';
import { UpdateUserDto } from './dtos/user-update.dto';
import { Prisma } from '@prisma/client';
import { PrizeDistributionGetDto } from '../prize-distributions/dtos/prize-distribution-get.dto';
import { TicketGetDto } from '../tickets/dtos/ticket-get.dto';

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

    async getByCriteria(criteria: Prisma.UserWhereInput): Promise<UserGetDto[]> {
        const users = await this.prisma.user.findMany({
            where: criteria,
        });
    
        return plainToInstance(UserGetDto, users, { excludeExtraneousValues: true });
    }

    // comment ca marche ?
    async getUsersWithPagination(skip: number, take: number, criteria: Prisma.UserWhereInput = {}): Promise<UserGetDto[]> {
        const users = await this.prisma.user.findMany({
            where: criteria,
            skip,
            take,
        });
        return plainToInstance(UserGetDto, users, { excludeExtraneousValues: true });
    }
    

    async create(data: UserCreateDto): Promise<UserGetDto> {
        const { firstname, lastname, email, password, roleId } = data;

        const createData = this.prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password,
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

    async getUserTickets(userId: number): Promise<TicketGetDto[]> {
        const tickets = await this.prisma.ticket.findMany({
            where: { userId }
        });
    
        return plainToInstance(TicketGetDto, tickets, { excludeExtraneousValues: true });
    }
    
    async getUserGains(userId: number): Promise<PrizeDistributionGetDto[]> {
        const userGains = await this.prisma.prizeDistribution.findMany({
            where: { userId, isClaimed: true }
        });
    
        return plainToInstance(PrizeDistributionGetDto, userGains, { excludeExtraneousValues: true });
    }    
}
