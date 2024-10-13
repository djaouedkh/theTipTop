import { IsNotEmpty, IsInt, IsBoolean, IsString } from 'class-validator';

export class TicketCreateDto {
    @IsNotEmpty()
    @IsString()
    code: string;

    // FK
    
    @IsNotEmpty()
    @IsInt()
    contestId: number;

    @IsInt()
    @IsNotEmpty()
    gainId: number;
}
