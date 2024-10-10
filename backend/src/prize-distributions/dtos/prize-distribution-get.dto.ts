import { Expose, Type } from 'class-transformer';
import { UserGetDto } from '../../users/dtos/user-get.dto';

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

    @Expose()
    @Type(() => UserGetDto)
    user: UserGetDto;

    @Expose()
    prize: any;

    @Expose()
    store?: string;
}
