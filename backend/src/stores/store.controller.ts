import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreGetDto, StoreCreateDto, StoreUpdateDto } from './dtos/store.dto';

@Controller('stores')
export class StoreController {
    constructor(private readonly service: StoreService) {}

    @Get('all')
    async getAll(): Promise<StoreGetDto[]> {
        return this.service.getAll();
    }

    @Get('by-id/:id')
    async getById(@Param('id') id: string): Promise<StoreGetDto> {
        return this.service.getById(Number(id));
    }

    @Post('create')
    async create(@Body() data: StoreCreateDto): Promise<StoreGetDto> {
        return this.service.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: StoreUpdateDto): Promise<StoreGetDto> {
        return this.service.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<StoreGetDto> {
        return this.service.delete(Number(id));
    }
}
