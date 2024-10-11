import { IsString, IsNumber } from "class-validator";

export class PrizeCreateDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    type: string;

    @IsNumber()
    price: number;
}