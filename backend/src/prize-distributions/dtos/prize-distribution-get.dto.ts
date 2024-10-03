import { Expose } from 'class-transformer';

export class PrizeDistributionGetDto {
    @Expose()
    id: number;

    @Expose()
    userId: number;

    @Expose()
    prizeId: number;

    @Expose()
    storeId?: number;

    @Expose()
    isClaimed: boolean;

    @Expose()
    dateClaimed?: Date;
}
