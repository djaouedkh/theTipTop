import { Exclude, Expose, Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ContestGetDto } from '../../contests/dtos/contest-get.dto';
import { UserGetDto } from '../../users/dtos/user-get.dto';
import { GainGetDto } from '../../gains/dtos/gain-get.dto';

export class TicketGetDto {
    @Expose()
    id: number;

    @Expose()
    code: string;

    @Expose()
    isDelivered: boolean;

    // FK

    @Expose()
    contestId: number;
    @Expose()
    @Type(() => ContestGetDto)
    contest: ContestGetDto;
    
    @Expose()
    gainId: number;
    @Expose()
    @Type(() => GainGetDto)
    gain: GainGetDto;

    @Expose()
    userId: number;
    @Expose()
    @Type(() => UserGetDto)
    user: UserGetDto;
}

// SEARCH
export type TicketSearchDto = Prisma.TicketWhereInput;
// INCLUDE FOR SEARCH
export type TicketIncludeDto = Prisma.TicketInclude;
