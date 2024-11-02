import { IsString, IsNumber } from "class-validator";

export class GainCreateDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;
}