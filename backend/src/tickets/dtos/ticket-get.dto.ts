import { Exclude, Expose } from 'class-transformer';

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
}
