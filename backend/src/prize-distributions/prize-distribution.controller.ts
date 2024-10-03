import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PrizeDistributionService } from './prize-distribution.service';
import { PrizeDistributionGetDto } from './dtos/prize-distribution-get.dto';
import { PrizeDistributionCreateDto } from './dtos/prize-distribution-create.dto';
import { PrizeDistributionUpdateDto } from './dtos/prize-distribution-update.dto';
import { Prisma } from '@prisma/client';

@Controller('prize-distributions')
export class PrizeDistributionController {
    constructor(private readonly service: PrizeDistributionService) {}

    @Get('')
    async getAll(): Promise<PrizeDistributionGetDto[]> {
        return this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<PrizeDistributionGetDto> {
        return this.service.getById(Number(id));
    }

    @Post('create')
    async create(@Body() data: PrizeDistributionCreateDto): Promise<PrizeDistributionGetDto> {
        return this.service.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: PrizeDistributionUpdateDto): Promise<PrizeDistributionGetDto> {
        return this.service.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<PrizeDistributionGetDto> {
        return this.service.delete(Number(id));
    }
}
