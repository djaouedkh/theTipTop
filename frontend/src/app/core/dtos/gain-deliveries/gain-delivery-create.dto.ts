import { IsNotEmpty, IsBoolean, IsOptional, IsInt, IsDate } from 'class-validator';

export class GainDeliveryCreateDto {

    @IsDate()
    @IsNotEmpty()
    deliveryDate: Date;

    // FK

    @IsInt()
    @IsNotEmpty()
    ticketId: number;

    @IsInt()
    @IsOptional()
    storeId?: number;

}
