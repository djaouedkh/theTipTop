import { Exclude, Expose, Type } from 'class-transformer';
import { ContestGetDto } from '../contests/contest-get.dto';
import { UserGetDto } from '../users/user-get.dto';
import { GainGetDto } from '../gains/gain-get.dto';
import { IsOptional } from 'class-validator';

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
    @IsOptional()
    userId?: number;
    @Expose()
    @IsOptional()
    @Type(() => UserGetDto)
    user?: UserGetDto;
}

// SEARCH
export type TicketSearchDto = any;
// INCLUDE FOR SEARCH
export type TicketIncludeDto = any;
