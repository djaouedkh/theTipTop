import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ContestGetDto, ContestIncludeDto, ContestSearchDto } from '../../../../../backend/src/contests/dtos/contest-get.dto';
import { ContestCreateDto } from '../../../../../backend/src/contests/dtos/contest-create.dto';
import { ContestUpdateDto } from '../../../../../backend/src/contests/dtos/contest-update.dto';

@Injectable({
    providedIn: 'root',
})
export class ContestService {
    private readonly baseUrl = 'contests';

    constructor(private apiService: ApiService) {}

    getAll(): Observable<ContestGetDto[]> {
        return this.apiService.get<ContestGetDto[]>(`${this.baseUrl}/all`);
    }

    getById(id: number): Observable<ContestGetDto> {
        return this.apiService.get<ContestGetDto>(`${this.baseUrl}/by-id/${id}`);
    }

    getAllValid(): Observable<ContestGetDto[]> {
        return this.apiService.get<ContestGetDto[]>(`${this.baseUrl}/all-valid`);
    }

    isValid(): Observable<boolean> {
        return this.apiService.get<boolean>(`${this.baseUrl}/is-valid`);
    }

    search(criteria: ContestSearchDto, includeOptions?: ContestIncludeDto): Observable<ContestGetDto[]> {
        return this.apiService.post<ContestGetDto[]>(`${this.baseUrl}/search`, { criteria, includeOptions });
    }

    searches(criteria: ContestSearchDto, includeOptions?: ContestIncludeDto): Observable<ContestGetDto[]> {
        return this.apiService.post<ContestGetDto[]>(`${this.baseUrl}/searches`, { criteria, includeOptions });
    }

    create(data: ContestCreateDto): Observable<ContestGetDto> {
        return this.apiService.post<ContestGetDto>(`${this.baseUrl}/create`, data);
    }

    update(id: number, data: ContestUpdateDto): Observable<ContestGetDto> {
        return this.apiService.put<ContestGetDto>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number): Observable<ContestGetDto> {
        return this.apiService.delete<ContestGetDto>(`${this.baseUrl}/${id}`);
    }
}
