import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserGetDto } from './dtos/user-get.dto';
import { UserCreateDto } from './dtos/user-create.dto';
import { UpdateUserDto } from './dtos/user-update.dto';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get('')
    async getAll(): Promise<UserGetDto[]> {
        return this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<UserGetDto> {
        return this.service.getById(Number(id));
    }

    @Get('search')
    async getByCriteria(@Query() query: Prisma.UserWhereInput): Promise<UserGetDto[]> {
        return this.service.getByCriteria(query);
    }

    @Post('create')
    async create(@Body() data: UserCreateDto): Promise<UserGetDto> {
        return this.service.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<UserGetDto> {
        return this.service.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<UserGetDto> {
        return this.service.delete(Number(id));
    }
}
