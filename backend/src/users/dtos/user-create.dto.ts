import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    firstname: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
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
