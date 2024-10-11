import { Expose, Type } from 'class-transformer';
import { UserGetDto } from '../../users/dtos/user-get.dto';
import { PrizeGetDto } from '../../prizes/dtos/prize-get.dto';

export class PrizeDistributionGetDto {
    @Expose()
    id: number;

    @Expose()
    isClaimed: boolean;

    @Expose()
    dateClaimed?: Date;

    @Expose()
    userId: number;
    @Expose()
    @Type(() => UserGetDto)
    user: UserGetDto;

    @Expose()
    prizeId: number;
    @Expose()
    @Type(() => PrizeGetDto)
    prize: PrizeGetDto;

    @Expose()
    storeId?: number;
    @Expose()
    @Type(() => UserGetDto)
    store?: UserGetDto;
}
