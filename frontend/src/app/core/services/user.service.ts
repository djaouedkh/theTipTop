import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { UserGetDto, UserIncludeDto, UserSearchDto } from '../../../../../backend/src/users/dtos/user-get.dto';
import { UserCreateDto } from '../../../../../backend/src/users/dtos/user-create.dto';
import { UpdateUserDto } from '../../../../../backend/src/users/dtos/user-update.dto';
import { UserFilterDto } from '../../../../../backend/src/users/dtos/user-filter.dto';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly baseUrl = 'users';

    constructor(private apiService: ApiService) {}

    getAll(): Observable<UserGetDto[]> {
        return this.apiService.get<UserGetDto[]>(`${this.baseUrl}/all`);
    }

    getById(id: number): Observable<UserGetDto> {
        return this.apiService.get<UserGetDto>(`${this.baseUrl}/by-id/${id}`);
    }

    search(criteria: UserSearchDto, includeOptions?: UserIncludeDto): Observable<UserGetDto[]> {
        return this.apiService.post<UserGetDto[]>(`${this.baseUrl}/search`, { criteria, includeOptions });
    }

    searches(criteria: UserSearchDto, includeOptions?: UserIncludeDto): Observable<UserGetDto[]> {
        return this.apiService.post<UserGetDto[]>(`${this.baseUrl}/searches`, { criteria, includeOptions });
    }

    create(data: UserCreateDto): Observable<UserGetDto> {
        return this.apiService.post<UserGetDto>(`${this.baseUrl}/create`, data);
    }

    update(id: number, data: UpdateUserDto): Observable<UserGetDto> {
        return this.apiService.put<UserGetDto>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number): Observable<UserGetDto> {
        return this.apiService.delete<UserGetDto>(`${this.baseUrl}/${id}`);
    }

    filter(selectedFilters: UserFilterDto): Observable<UserGetDto[]> {
        return this.apiService.post<UserGetDto[]>(`${this.baseUrl}/filter`, selectedFilters);
    }
}
