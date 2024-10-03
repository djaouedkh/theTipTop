import { Exclude, Expose } from 'class-transformer';

export class UserGetDto {
    @Expose()
    id: number;

    @Expose()
    firstname: string;

    @Expose()
    lastname: string;

    @Expose()
    email: string;

    @Expose()
    createdAt: Date;

    @Exclude()
    password?: string;
}
