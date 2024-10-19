import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { UserGetDto } from '../../users/dtos/user-get.dto';
import { RoleType } from '../types/role.type';

export class RoleGetDto {
    @Expose()
    id: number;

    @Expose()
    name: RoleType;

    @Expose()
    @Type(() => UserGetDto)
    users: UserGetDto[];
}

export class RoleCreateDto {
    @IsString()
    @MinLength(2)
    name: RoleType;
}

export class RoleUpdateDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    name?: RoleType;
}
