import { IsOptional, IsBoolean, IsInt, IsDate } from 'class-validator';

export class PrizeDistributionUpdateDto {
    @IsBoolean()
    @IsOptional()
    isClaimed?: boolean;

    @IsDate()
    @IsOptional()
    dateClaimed?: Date;

    @IsInt()
    @IsOptional()
    storeId?: number;
}
