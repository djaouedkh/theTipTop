import { Exclude, Expose, Type } from 'class-transformer';
import { ContestGetDto } from '../../contests/dtos/contest-get.dto';
import { UserGetDto } from '../../users/dtos/user-get.dto';
import { PrizeDistributionGetDto } from '../../prize-distributions/dtos/prize-distribution-get.dto';

export class TicketGetDto {
    @Expose()
    id: number;

    @Expose()
    ref: string;

    @Expose()
    status: boolean;

    @Expose()
    issuedDate: Date;

    @Expose()
    contestId: number;

    @Expose()
    prizeId: number;

    @Expose()
    userId: number;

    @Expose()
    @Type(() => UserGetDto)
    user: UserGetDto;

    @Expose()
    @Type(() => PrizeDistributionGetDto)
    prize: PrizeDistributionGetDto;

    @Expose()
    @Type(() => ContestGetDto)
    contest: ContestGetDto;
}
