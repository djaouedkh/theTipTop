import { Expose, Type } from 'class-transformer';
import { UserGetDto } from '../users/user-get.dto';

export class LotteryGameGetDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    desc: string;

    @Expose()
    price: number;

    // FK
    @Expose()
    userId: number;
    @Expose()
    @Type(() => UserGetDto)
    user: UserGetDto;

}

// SEARCH
export type LotteryGameSearchDto = any;
// INCLUDE FOR SEARCH
export type LotteryGameIncludeDto = any;
