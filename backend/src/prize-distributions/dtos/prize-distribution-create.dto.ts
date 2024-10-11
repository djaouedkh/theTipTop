import { IsNotEmpty, IsBoolean, IsOptional, IsInt, IsDate } from 'class-validator';

export class PrizeDistributionCreateDto {
    @IsBoolean()
    @IsOptional()
    isClaimed?: boolean;

    @IsDate()
    @IsOptional()
    dateClaimed?: Date;

    // FK
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsInt()
    @IsNotEmpty()
    prizeId: number;

    @IsInt()
    @IsOptional()
    storeId?: number;

}
