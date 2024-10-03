import { IsNotEmpty, IsBoolean, IsOptional, IsInt, IsDate } from 'class-validator';

export class PrizeDistributionCreateDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsInt()
    @IsNotEmpty()
    prizeId: number;

    @IsInt()
    @IsOptional()
    storeId?: number;

    @IsBoolean()
    @IsOptional()
    isClaimed?: boolean;

    @IsDate()
    @IsOptional()
    dateClaimed?: Date;
}
