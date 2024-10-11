import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleGetDto, RoleCreateDto, RoleUpdateDto } from './dtos/role.dto';

@Controller('roles')
export class RoleController {
    constructor(private readonly service: RoleService) {}

    @Get('')
    async getAll(): Promise<RoleGetDto[]> {
        return this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<RoleGetDto> {
        return this.service.getById(Number(id));
    }

    @Post('create')
    async create(@Body() data: RoleCreateDto): Promise<RoleGetDto> {
        return this.service.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: RoleUpdateDto): Promise<RoleGetDto> {
        return this.service.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<RoleGetDto> {
        return this.service.delete(Number(id));
    }
}
