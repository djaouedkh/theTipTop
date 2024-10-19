import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserGetDto, UserIncludeDto, UserSearchDto } from './dtos/user-get.dto';
import { UserCreateDto } from './dtos/user-create.dto';
import { UpdateUserDto } from './dtos/user-update.dto';
import { Prisma } from '@prisma/client';
import { UserFilterDto } from './dtos/user-filter.dto';

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get('all')
    async getAll(): Promise<UserGetDto[]> {
        return this.service.getAll();
    }

    @Get('by-id/:id')
    async getById(@Param('id') id: string): Promise<UserGetDto> {
        return this.service.getById(Number(id));
    }

    @Post('search')
    async getByCriteria(
        @Body('criteria') criteria: UserSearchDto, 
        @Body('includeOptions') includeOptions?: UserIncludeDto
    ): Promise<UserGetDto> {
        return this.service.getByCriteria(criteria, includeOptions);
    }
    @Post('searches')
    async getAllByCriteria(
        @Body('criteria') criteria: UserSearchDto, 
        @Body('includeOptions') includeOptions?: UserIncludeDto
    ): Promise<UserGetDto[]> {
        return this.service.getAllByCriteria(criteria, includeOptions);
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

    // LOGIC JOB
    @Post('filter')
    async filterUsers(@Body() filters: UserFilterDto): Promise<UserGetDto[]> {
        return this.service.filterUsers(filters);
    }
}
