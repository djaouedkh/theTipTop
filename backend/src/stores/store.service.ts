import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { StoreGetDto, StoreCreateDto, StoreUpdateDto } from './dtos/store.dto';

@Injectable()
export class StoreService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<StoreGetDto[]> {
        const allStores = await this.prisma.store.findMany();
        return plainToInstance(StoreGetDto, allStores, { excludeExtraneousValues: true });
    }

    async getById(id: number): Promise<StoreGetDto> {
        const store = await this.prisma.store.findUnique({ where: { id } });
        if (!store) {
            throw new Error('Store not found');
        }
        return plainToInstance(StoreGetDto, store, { excludeExtraneousValues: true });
    }

    async create(data: StoreCreateDto): Promise<StoreGetDto> {
        const createdStore = await this.prisma.store.create({ data });
        return plainToInstance(StoreGetDto, createdStore, { excludeExtraneousValues: true });
    }

    async update(id: number, data: StoreUpdateDto): Promise<StoreGetDto> {
        const updatedStore = await this.prisma.store.update({
            where: { id },
            data,
        });
        return plainToInstance(StoreGetDto, updatedStore, { excludeExtraneousValues: true });
    }

    async delete(id: number): Promise<StoreGetDto> {
        const deletedStore = await this.prisma.store.delete({ where: { id } });
        return plainToInstance(StoreGetDto, deletedStore, { excludeExtraneousValues: true });
    }
}
