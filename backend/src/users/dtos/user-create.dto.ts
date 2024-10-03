import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsInt()
    @IsNotEmpty()
    roleId: number;
}
