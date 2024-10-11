import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { PrizeDistributionGetDto } from '../../prize-distributions/dtos/prize-distribution-get.dto';
import { TicketGetDto } from '../../tickets/dtos/ticket-get.dto';

export class PrizeGetDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    type: string;

    @Expose()
    price: number;

    // FK

    @Expose()
    @Type(() => TicketGetDto)
    tickets: TicketGetDto[];

    @Expose()
    @Type(() => PrizeDistributionGetDto)
    distributions: PrizeDistributionGetDto[];
}
