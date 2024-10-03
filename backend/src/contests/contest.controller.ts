import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestGetDto } from './dtos/contest-get.dto';
import { ContestCreateDto } from './dtos/contest-create.dto';
import { ContestUpdateDto } from './dtos/contest-update.dto';
import { Prisma } from '@prisma/client';

@Controller('contests')
export class ContestController {
    constructor(private readonly service: ContestService) {}

    @Get('')
    async getAll(): Promise<ContestGetDto[]> {
        return this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<ContestGetDto> {
        return this.service.getById(Number(id));
    }

    @Get('search')
    async getByCriteria(@Query() query: Prisma.ContestWhereInput): Promise<ContestGetDto[]> {
        return this.service.getByCriteria(query);
    }

    @Post('create')
    async create(@Body() data: ContestCreateDto): Promise<ContestGetDto> {
        return this.service.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: ContestUpdateDto): Promise<ContestGetDto> {
        return this.service.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ContestGetDto> {
        return this.service.delete(Number(id));
    }
}
