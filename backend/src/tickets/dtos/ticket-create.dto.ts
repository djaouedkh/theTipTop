import { IsNotEmpty, IsInt, IsBoolean, IsString } from 'class-validator';

export class TicketCreateDto {
    @IsNotEmpty()
    @IsString()
    ref: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;

    // FK
    
    @IsNotEmpty()
    @IsInt()
    contestId: number;

    @IsInt()
    @IsNotEmpty()
    prizeId: number;

    @IsInt()
    @IsNotEmpty()
    userId: number;
}
