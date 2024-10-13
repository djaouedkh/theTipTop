import { Expose, Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { UserGetDto } from '../../users/dtos/user-get.dto';
import { TicketGetDto } from '../../tickets/dtos/ticket-get.dto';

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
export type GainDeliverySearchDto = Prisma.GainDeliveryWhereInput;
// INCLUDE FOR SEARCH
export type GainDeliveryIncludeDto = Prisma.GainDeliveryInclude;
