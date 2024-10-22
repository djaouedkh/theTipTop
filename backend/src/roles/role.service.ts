import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { RoleGetDto, RoleCreateDto, RoleUpdateDto } from './dtos/role.dto';

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<RoleGetDto[]> {
        const allRoles = await this.prisma.role.findMany();
        return plainToInstance(RoleGetDto, allRoles, { excludeExtraneousValues: true });
    }

    async getById(id: number): Promise<RoleGetDto> {
        const role = await this.prisma.role.findUnique({ where: { id } });
        if (!role) {
            throw new Error('Role not found');
        }
        return plainToInstance(RoleGetDto, role, { excludeExtraneousValues: true });
    }

    async create(data: RoleCreateDto): Promise<RoleGetDto> {
        const createdRole = await this.prisma.role.create({ data });
        return plainToInstance(RoleGetDto, createdRole, { excludeExtraneousValues: true });
    }

    // async update(id: number, data: RoleUpdateDto): Promise<RoleGetDto> {
    //     const updatedRole = await this.prisma.role.update({
    //         where: { id },
    //         data,
    //     });
    //     return plainToInstance(RoleGetDto, updatedRole, { excludeExtraneousValues: true });
    // }

    async delete(id: number): Promise<RoleGetDto> {
        const deletedRole = await this.prisma.role.delete({ where: { id } });
        return plainToInstance(RoleGetDto, deletedRole, { excludeExtraneousValues: true });
    }
}
