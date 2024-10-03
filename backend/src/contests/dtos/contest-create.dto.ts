import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class ContestCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDate()
    startDate: Date;

    @IsNotEmpty()
    @IsDate()
    endDate: Date;
}
