import { Exclude, Expose, Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { RoleGetDto } from '../../roles/dtos/role.dto';
import { TicketGetDto } from '../../tickets/dtos/ticket-get.dto';
import { IsOptional, IsInt, IsString, IsEmail, Min } from 'class-validator';

export class UserGetDto {
    @Expose()
    id: number;

    @Expose()
    firstname: string;

    @Expose()
    lastname: string;

    @Expose()
    email: string;

    @Expose()
    gender: string;

    @Expose()
    age: number;

    @Expose()
    createdAt: Date;

    @Exclude()
    password?: string;

    // FK
    @Expose()
    roleId: number;
    @Expose()
    @Type(() => RoleGetDto)
    role: RoleGetDto;

    @Expose()
    @Type(() => TicketGetDto)
    tickets: TicketGetDto[];
}

// SEARCH
export type UserSearchDto = Prisma.UserWhereInput;
// INCLUDE FOR SEARCH
export type UserIncludeDto = Prisma.UserInclude;
