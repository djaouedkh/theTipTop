import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketGetDto } from './dtos/ticket-get.dto';
import { TicketCreateDto } from './dtos/ticket-create.dto';
import { TicketUpdateDto } from './dtos/ticket-update.dto';
import { Prisma } from '@prisma/client';

@Controller('tickets')
export class TicketController {
    constructor(private readonly service: TicketService) {}

    @Get('')
    async getAll(): Promise<TicketGetDto[]> {
        return this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<TicketGetDto> {
        return this.service.getById(Number(id));
    }

    @Get('search')
    async getByCriteria(@Query() query: Prisma.TicketWhereInput): Promise<TicketGetDto> {
        return this.service.getByCriteria(query);
    }

    @Get('searches')
    async getAllByCriteria(@Query() query: Prisma.TicketWhereInput): Promise<TicketGetDto[]> {
        return this.service.getAllByCriteria(query);
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
