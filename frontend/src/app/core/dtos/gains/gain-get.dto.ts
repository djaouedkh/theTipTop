import { Expose, Type } from 'class-transformer';
import { TicketGetDto } from '../tickets/ticket-get.dto';

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
export type GainSearchDto = any;
// INCLUDE FOR SEARCH
export type GainIncludeDto = any;
