import { IsString, IsOptional, IsDate } from 'class-validator';

export class ContestUpdateDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @IsDate()
    endDate?: Date;
}
