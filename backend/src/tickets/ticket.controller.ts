import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketGetDto, TicketIncludeDto, TicketSearchDto } from './dtos/ticket-get.dto';
import { TicketCreateDto } from './dtos/ticket-create.dto';
import { TicketUpdateDto } from './dtos/ticket-update.dto';
import { Prisma } from '@prisma/client';

@Controller('tickets')
export class TicketController {
    constructor(private readonly service: TicketService) {}

    @Get('all')
    async getAll(): Promise<TicketGetDto[]> {
        return this.service.getAll();
    }

    @Get('by-id/:id')
    async getById(@Param('id') id: string): Promise<TicketGetDto> {
        return this.service.getById(Number(id));
    }

    @Post('search')
    async getByCriteria(
        @Body('criteria') criteria: TicketSearchDto, 
        @Body('includeOptions') includeOptions?: TicketIncludeDto
    ): Promise<TicketGetDto> {
        return this.service.getByCriteria(criteria, includeOptions);
    }
    @Post('searches')
    async getAllByCriteria(
        @Body('criteria') criteria: TicketSearchDto, 
        @Body('includeOptions') includeOptions?: TicketIncludeDto
    ): Promise<TicketGetDto[]> {
        return this.service.getAllByCriteria(criteria, includeOptions);
    }


    @Post('create')
    async create(@Body() data: TicketCreateDto): Promise<TicketGetDto> {
        return this.service.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: TicketUpdateDto): Promise<TicketGetDto> {
        return this.service.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<TicketGetDto> {
        return this.service.delete(Number(id));
    }
}
