import { Exclude, Expose, Type } from 'class-transformer';
import { RoleGetDto } from '../roles/role.dto';
import { TicketGetDto } from '../tickets/ticket-get.dto';
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
export type UserSearchDto = any;
// INCLUDE FOR SEARCH
export type UserIncludeDto = any;
