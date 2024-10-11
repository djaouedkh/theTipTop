import { Exclude, Expose, Type } from 'class-transformer';
import { ContestGetDto } from '../../contests/dtos/contest-get.dto';
import { UserGetDto } from '../../users/dtos/user-get.dto';
import { PrizeDistributionGetDto } from '../../prize-distributions/dtos/prize-distribution-get.dto';
import { PrizeGetDto } from '../../prizes/dtos/prize-get.dto';

export class TicketGetDto {
    @Expose()
    id: number;

    @Expose()
    ref: string;

    @Expose()
    status: boolean;

    @Expose()
    issuedDate: Date;

    // FK

    @Expose()
    contestId: number;
    @Expose()
    @Type(() => ContestGetDto)
    contest: ContestGetDto;
    
    @Expose()
    prizeId: number;
    @Expose()
    @Type(() => PrizeGetDto)
    prize: PrizeGetDto;

    @Expose()
    userId: number;
    @Expose()
    @Type(() => UserGetDto)
    user: UserGetDto;
}
