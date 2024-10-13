import { Expose, Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { TicketGetDto } from '../../tickets/dtos/ticket-get.dto';

export class GainGetDto {
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
    @Type(() => TicketGetDto)
    tickets: TicketGetDto[];

}

// SEARCH
export type GainSearchDto = Prisma.GainWhereInput;
// INCLUDE FOR SEARCH
export type GainIncludeDto = Prisma.GainInclude;
