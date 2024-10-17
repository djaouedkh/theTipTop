import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestGetDto, ContestIncludeDto, ContestSearchDto } from './dtos/contest-get.dto';
import { ContestCreateDto } from './dtos/contest-create.dto';
import { ContestUpdateDto } from './dtos/contest-update.dto';
import { Contest, Prisma } from '@prisma/client';

@Controller('contests')
export class ContestController {
    constructor(private readonly service: ContestService) {}

    @Get('all')
    async getAll(): Promise<ContestGetDto[]> {
        return this.service.getAll();
    }

    @Get('by-id/:id')
    async getById(@Param('id') id: string): Promise<ContestGetDto> {
        return this.service.getById(Number(id));
    }

    @Get('/all-valid')
    async getAllValid(): Promise<ContestGetDto[]> {
        return this.service.getAllValid();
    }

    @Get('/is-valid')
    async isValid(): Promise<boolean> {
        return this.service.isValid();
    }

    @Post('search')
    async getByCriteria(
        @Body('criteria') criteria: ContestSearchDto, 
        @Body('includeOptions') includeOptions?: ContestIncludeDto
    ): Promise<ContestGetDto> {
        return this.service.getByCriteria(criteria, includeOptions);
    }
    @Post('searches')
    async getAllByCriteria(
        @Body('criteria') criteria: ContestSearchDto, 
        @Body('includeOptions') includeOptions?: ContestIncludeDto
    ): Promise<ContestGetDto[]> {
        return this.service.getAllByCriteria(criteria, includeOptions);
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
