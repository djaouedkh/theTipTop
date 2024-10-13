import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { GainService } from './gain.service';
import { Prisma } from '@prisma/client';
import { GainCreateDto } from './dtos/gain-create.dto';
import { GainGetDto, GainIncludeDto, GainSearchDto } from './dtos/gain-get.dto';
import { GainUpdateDto } from './dtos/gain-update.dto';

@Controller('gains')
export class GainController {
    constructor(private readonly service: GainService) {}

    @Get('all')
    async getAll(): Promise<GainGetDto[]> {
        return this.service.getAll();
    }

    @Get('by-id/:id')
    async getById(@Param('id') id: string): Promise<GainGetDto> {
        return this.service.getById(Number(id));
    }

    @Post('search')
    async getByCriteria(
        @Body('criteria') criteria: GainSearchDto, 
        @Body('includeOptions') includeOptions?: GainIncludeDto
    ): Promise<GainGetDto> {
        return this.service.getByCriteria(criteria, includeOptions);
    }
    @Post('searches')
    async getAllByCriteria(
        @Body('criteria') criteria: GainSearchDto, 
        @Body('includeOptions') includeOptions?: GainIncludeDto
    ): Promise<GainGetDto[]> {
        return this.service.getAllByCriteria(criteria, includeOptions);
    }

    @Post('create')
    async create(@Body() data: GainCreateDto): Promise<GainGetDto> {
        return this.service.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: GainUpdateDto): Promise<GainGetDto> {
        return this.service.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<GainGetDto> {
        return this.service.delete(Number(id));
    }
}
