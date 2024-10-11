import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { UserGetDto } from '../../users/dtos/user-get.dto';

export class RoleGetDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    @Type(() => UserGetDto)
    users: UserGetDto[];
}

export class RoleCreateDto {
    @IsString()
    @MinLength(2)
    name: string;
}

export class RoleUpdateDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    name?: string;
}
