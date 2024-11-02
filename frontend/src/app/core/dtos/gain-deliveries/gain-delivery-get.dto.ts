import { Expose, Type } from 'class-transformer';
import { UserGetDto } from '../users/user-get.dto';
import { TicketGetDto } from '../tickets/ticket-get.dto';

export class GainDeliveryGetDto {
    @Expose()
    id: number;

    @Expose()
    deliveredDate: Date

    @Expose()
    ticketId: number;
    @Expose()
    @Type(() => TicketGetDto)
    ticket: TicketGetDto;

    @Expose()
    storeId?: number;
    @Expose()
    @Type(() => UserGetDto)
    store?: UserGetDto;
}

// SEARCH
export type GainDeliverySearchDto = any;
// INCLUDE FOR SEARCH
export type GainDeliveryIncludeDto = any;