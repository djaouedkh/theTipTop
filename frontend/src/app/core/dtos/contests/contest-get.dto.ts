import { Expose, Type } from 'class-transformer';
import { TicketGetDto } from '../tickets/ticket-get.dto';

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
    tickets?: TicketGetDto[];
}

// SEARCH
export type ContestSearchDto = any;
// INCLUDE FOR SEARCH
export type ContestIncludeDto = any;
