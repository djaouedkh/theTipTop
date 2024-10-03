import { Expose } from 'class-transformer';

export class ContestGetDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    startDate: Date;

    @Expose()
    endDate: Date;
}
