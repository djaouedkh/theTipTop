import { IsOptional, IsBoolean, IsInt, IsString } from 'class-validator';

export class TicketUpdateDto {
    @IsString()
    @IsOptional()
    code?: string;

    @IsBoolean()
    @IsOptional()
    isDelivered?: boolean;

    @IsInt()
    @IsOptional()
    contestId?: number;

    @IsInt()
    @IsOptional()
    gainId?: number;

    @IsInt()
    @IsOptional()
    userId?: number;
}
