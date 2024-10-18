import { Expose, Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { UserGetDto } from '../../users/dtos/user-get.dto';

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
export type LotteryGameSearchDto = Prisma.LotteryGameWhereInput;
// INCLUDE FOR SEARCH
export type LotteryGameIncludeDto = Prisma.LotteryGameInclude;
