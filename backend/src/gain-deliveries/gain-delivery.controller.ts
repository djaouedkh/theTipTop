import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { GainDeliveryCreateDto } from './dtos/gain-delivery-create.dto';
import { GainDeliveryGetDto } from './dtos/gain-delivery-get.dto';
import { GainDeliveryUpdateDto } from './dtos/gain-delivery-update.dto';
import { GainDeliveryService } from './gain-delivery.service';

@Controller('gain-deliveries')
export class GainDeliveryController {
    constructor(private readonly service: GainDeliveryService) {}

    @Get('')
    async getAll(): Promise<GainDeliveryGetDto[]> {
        return this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<GainDeliveryGetDto> {
        return this.service.getById(Number(id));
    }

    @Post('create')
    async create(@Body() data: GainDeliveryCreateDto): Promise<GainDeliveryGetDto> {
        return this.service.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: GainDeliveryUpdateDto): Promise<GainDeliveryGetDto> {
        return this.service.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<GainDeliveryGetDto> {
        return this.service.delete(Number(id));
    }
}
