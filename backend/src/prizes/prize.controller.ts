import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PrizeService } from './prize.service';
import { PrizeGetDto } from './dtos/prize-get.dto';
import { PrizeCreateDto } from './dtos/prize-create.dto';
import { PrizeUpdateDto } from './dtos/prize-update.dto';
import { Prisma } from '@prisma/client';
import { PrizeDistributionGetDto } from '../prize-distributions/dtos/prize-distribution-get.dto';
import { TicketGetDto } from '../tickets/dtos/ticket-get.dto';

@Controller('prizes')
export class PrizeController {
    constructor(private readonly service: PrizeService) {}

    @Get('')
    async getAll(): Promise<PrizeGetDto[]> {
        return this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<PrizeGetDto> {
        return this.service.getById(Number(id));
    }

    @Get('search')
    async getByCriteria(@Query() query: Prisma.PrizeWhereInput): Promise<PrizeGetDto[]> {
        return this.service.getByCriteria(query);
    }

    @Post('create')
    async create(@Body() data: PrizeCreateDto): Promise<PrizeGetDto> {
        return this.service.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: PrizeUpdateDto): Promise<PrizeGetDto> {
        return this.service.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<PrizeGetDto> {
        return this.service.delete(Number(id));
    }
}
