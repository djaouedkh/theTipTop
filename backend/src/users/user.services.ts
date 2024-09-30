import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UserGetDto } from './dtos/user-get.dto';
import { UserCreateDto } from './dtos/user-create.dto';
import { UpdateUserDto } from './dtos/user-update.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<UserGetDto[]> {
        const allData = await this.prisma.user.findMany();
        return plainToInstance(UserGetDto, allData, { excludeExtraneousValues: true });
    }

    async getById(id: number): Promise<UserGetDto> {
        const data = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!data) {
            throw new Error('User not found');
        }

        return plainToInstance(UserGetDto, data, { excludeExtraneousValues: true });
    }

    async create(data: UserCreateDto): Promise<UserGetDto> {
        const { firstname, lastname, email, password, roleId } = data;

        const createData = this.prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password,
                role: {
                    connect: {
                        id: roleId,
                    },
                },
            },
        });

        return plainToInstance(UserGetDto, createData, { excludeExtraneousValues: true });
    }

    async update(id: number, data: UpdateUserDto): Promise<UserGetDto> {
        const { firstname, lastname, email, password, roleId } = data;

        const updateData = await this.prisma.user.update({
            where: { id },
            data: {
                firstname,
                lastname,
                email,
                password,
                roleId,
            },
        });

        return plainToInstance(UserGetDto, updateData, { excludeExtraneousValues: true });
    }

    async delete(id: number): Promise<UserGetDto> {
        const deleteData = await this.prisma.user.delete({
            where: { id },
        });

        return plainToInstance(UserGetDto, deleteData, { excludeExtraneousValues: true });
    }
}
