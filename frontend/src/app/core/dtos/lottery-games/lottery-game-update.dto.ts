import { IsEmail, IsOptional, IsString, MinLength, IsInt, IsDate } from 'class-validator';

export class LotteryGameUpdateDto {
    @IsString()
    @IsOptional()
    name?: string;

    // playDate
    @IsOptional()
    @IsDate()
    playDate?: Date;

    @IsInt()
    @IsOptional()
    userId?: number;
}
