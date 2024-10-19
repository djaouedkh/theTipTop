import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { GainCreateDto } from './dtos/gain-create.dto';
import { GainGetDto, GainIncludeDto, GainSearchDto } from './dtos/gain-get.dto';
import { GainUpdateDto } from './dtos/gain-update.dto';
import { GainTypes } from './enums/gain-types.enum';

@Injectable()
export class GainService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<GainGetDto[]> {
        const allData = await this.prisma.gain.findMany({
            include: {
                tickets: true,
            }
        });
        return plainToInstance(GainGetDto, allData, { excludeExtraneousValues: true });
    }

    async getById(id: number): Promise<GainGetDto> {
        const data = await this.prisma.gain.findUnique({
            where: { id },
            include: {
                tickets: true,
            }
        });

        if (!data) {
            throw new Error('Gain not found');
        }

        return plainToInstance(GainGetDto, data, { excludeExtraneousValues: true });
    }

    async getByCriteria(criteria: GainSearchDto, includeOptions?: GainIncludeDto): Promise<GainGetDto> {
        const data = await this.prisma.gain.findFirst({
            where: criteria,
            include: includeOptions || {},
        });
        return plainToInstance(GainGetDto, data, { excludeExtraneousValues: true });
    }
    async getAllByCriteria(criteria: GainSearchDto, includeOptions?: GainIncludeDto): Promise<GainGetDto[]> {
        const allData = await this.prisma.gain.findMany({
            where: criteria,
            include: includeOptions || {},
        });
        return plainToInstance(GainGetDto, allData, { excludeExtraneousValues: true });
    }

    async create(data: GainCreateDto): Promise<GainGetDto> {
        const createData = await this.prisma.gain.create({
            data: {
                name: data.name,
                desc: data.description,
                price: data.price
            }
        });

        return plainToInstance(GainGetDto, createData, { excludeExtraneousValues: true });
    }

    async update(id: number, data: GainUpdateDto): Promise<GainGetDto> {
        const updateData = await this.prisma.gain.update({
            where: { id },
            data: {
                name: data.name,
                desc: data.description,
                price: data.price
            }
        });

        return plainToInstance(GainGetDto, updateData, { excludeExtraneousValues: true });
    }

    async delete(id: number): Promise<GainGetDto> {
        const deleteData = await this.prisma.gain.delete({
            where: { id }
        });

        return plainToInstance(GainGetDto, deleteData, { excludeExtraneousValues: true });
    }

    // LOGIQUE MÉTIER
    async associateIdsWithGainTypes(): Promise<Record<GainTypes, number>> {
        const gains = await this.prisma.gain.findMany();
        const gainMap: Record<GainTypes, number> = {
            [GainTypes.INFUSEUR_THE]: gains.find(g => g.name === GainTypes.INFUSEUR_THE)?.id,
            [GainTypes.BOITE_THE_DETOX]: gains.find(g => g.name === GainTypes.BOITE_THE_DETOX)?.id,
            [GainTypes.BOITE_THE_SIGNATURE]: gains.find(g => g.name === GainTypes.BOITE_THE_SIGNATURE)?.id,
            [GainTypes.COFFRET_DECOUVERTE_39]: gains.find(g => g.name === GainTypes.COFFRET_DECOUVERTE_39)?.id,
            [GainTypes.COFFRET_DECOUVERTE_69]: gains.find(g => g.name === GainTypes.COFFRET_DECOUVERTE_69)?.id,
        };
        return gainMap;
    }
}
