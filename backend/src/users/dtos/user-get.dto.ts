import { Exclude, Expose, Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PrizeDistributionGetDto } from '../../prize-distributions/dtos/prize-distribution-get.dto';
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
    @Type(() => PrizeDistributionGetDto)
    prizeDistributions: PrizeDistributionGetDto[]

    @Expose()
    @Type(() => TicketGetDto)
    tickets: TicketGetDto[];
}

export class UserSearchDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    id?: number;

    @IsOptional()
    @IsString()
    firstname?: string;

    @IsOptional()
    @IsString()
    lastname?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    roleId?: number;

    @IsOptional()
    @IsString()
    createdAt?: string;
}
