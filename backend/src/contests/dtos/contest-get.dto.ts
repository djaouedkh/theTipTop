import { Expose, Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { TicketGetDto } from '../../tickets/dtos/ticket-get.dto';

export class ContestGetDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    startDate: Date;

    @Expose()
    endDate: Date;

    @Expose()
    @Type(() => TicketGetDto)
    tickets: TicketGetDto[];
}

// SEARCH
export type ContestSearchDto = Prisma.ContestWhereInput;
// INCLUDE FOR SEARCH
export type ContestIncludeDto = Prisma.ContestInclude;
