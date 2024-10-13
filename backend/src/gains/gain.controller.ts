import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { GainService } from './gain.service';
import { Prisma } from '@prisma/client';
import { GainCreateDto } from './dtos/gain-create.dto';
import { GainGetDto } from './dtos/gain-get.dto';
import { GainUpdateDto } from './dtos/gain-update.dto';

@Controller('gains')
export class GainController {
    constructor(private readonly service: GainService) {}

    @Get('')
    async getAll(): Promise<GainGetDto[]> {
        return this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<GainGetDto> {
        return this.service.getById(Number(id));
    }

    @Get('search')
    async getByCriteria(@Query() query: Prisma.GainWhereInput): Promise<GainGetDto[]> {
        return this.service.getByCriteria(query);
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
