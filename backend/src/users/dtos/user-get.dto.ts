import { Exclude, Expose, Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PrizeDistributionGetDto } from '../../prize-distributions/dtos/prize-distribution-get.dto';

export class UserGetDto {
    @Expose()
    id: number;

    @Expose()
    firstname: string;

    @Expose()
    lastname: string;

    @Expose()
    email: string;

    @Expose()
    createdAt: Date;

    @Exclude()
    password?: string;

    @Expose()
    @Type(() => PrizeDistributionGetDto)
    prizeDistributions: PrizeDistributionGetDto[]
}

export type UserSearchCriteria = Prisma.UserWhereInput;
