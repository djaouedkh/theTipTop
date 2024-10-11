// store-get.dto.ts
import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { PrizeDistributionGetDto } from '../../prize-distributions/dtos/prize-distribution-get.dto';

export class StoreGetDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    address: string;

    @Expose()
    city: string;

    @Expose()
    postalCode: string;

    @Expose()
    @Type(() => PrizeDistributionGetDto)
    distributions: PrizeDistributionGetDto[];
}

export class StoreCreateDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    @MinLength(2)
    address: string;

    @IsString()
    @MinLength(2)
    city: string;

    @IsString()
    postalCode: string;
}


export class StoreUpdateDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    address?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    city?: string;

    @IsOptional()
    @IsString()
    postalCode?: string;
}
