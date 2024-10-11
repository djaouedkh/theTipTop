import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { PrizeGetDto } from './dtos/prize-get.dto';
import { PrizeCreateDto } from './dtos/prize-create.dto';
import { PrizeUpdateDto } from './dtos/prize-update.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrizeService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<PrizeGetDto[]> {
        const allData = await this.prisma.prize.findMany({
            include: {
                tickets: true,
                distributions: true
            }
        });
        return plainToInstance(PrizeGetDto, allData, { excludeExtraneousValues: true });
    }

    async getById(id: number): Promise<PrizeGetDto> {
        const data = await this.prisma.prize.findUnique({
            where: { id },
            include: {
                tickets: true,
                distributions: true
            }
        });

        if (!data) {
            throw new Error('Prize not found');
        }

        return plainToInstance(PrizeGetDto, data, { excludeExtraneousValues: true });
    }

    async getByCriteria(criteria: Prisma.PrizeWhereInput): Promise<PrizeGetDto[]> {
        const prizes = await this.prisma.prize.findMany({
            where: criteria,
            include: {
                tickets: true,
                distributions: true
            }
        });
    
        return plainToInstance(PrizeGetDto, prizes, { excludeExtraneousValues: true });
    }

    async create(data: PrizeCreateDto): Promise<PrizeGetDto> {
        const createData = await this.prisma.prize.create({
            data: {
                name: data.name,
                desc: data.description,
                type: data.type,
                price: data.price
            }
        });

        return plainToInstance(PrizeGetDto, createData, { excludeExtraneousValues: true });
    }

    async update(id: number, data: PrizeUpdateDto): Promise<PrizeGetDto> {
        const updateData = await this.prisma.prize.update({
            where: { id },
            data: {
                name: data.name,
                desc: data.description,
                type: data.type,
                price: data.price
            }
        });

        return plainToInstance(PrizeGetDto, updateData, { excludeExtraneousValues: true });
    }

    async delete(id: number): Promise<PrizeGetDto> {
        const deleteData = await this.prisma.prize.delete({
            where: { id }
        });

        return plainToInstance(PrizeGetDto, deleteData, { excludeExtraneousValues: true });
    }
}
