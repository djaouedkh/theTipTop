import { IsEmail, IsOptional, IsString, MinLength, IsInt } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    firstname?: string;

    @IsString()
    @IsOptional()
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
