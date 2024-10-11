import { IsEmail, IsOptional, IsString, MinLength, IsInt } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @MinLength(2)
    firstname?: string;

    @IsString()
    @IsOptional()
    @MinLength(2)
    lastname?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;

    @IsInt()
    @IsOptional()
    roleId?: number;
}
