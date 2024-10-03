import { IsOptional, IsBoolean, IsInt, IsString } from 'class-validator';

export class TicketUpdateDto {
    @IsString()
    @IsOptional()
    ref?: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;

    @IsInt()
    @IsOptional()
    contestId?: number;

    @IsInt()
    @IsOptional()
    prizeId?: number;

    @IsInt()
    @IsOptional()
    userId?: number;
}
