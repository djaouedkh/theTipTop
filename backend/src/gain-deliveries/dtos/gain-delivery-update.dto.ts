import { IsOptional, IsBoolean, IsInt, IsDate } from 'class-validator';

export class GainDeliveryUpdateDto {

    @IsDate()
    @IsOptional()
    deliveryDate?: Date;

    @IsInt()
    @IsOptional()
    storeId?: number;
}
