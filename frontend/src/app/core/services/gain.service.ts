import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { GainGetDto, GainIncludeDto, GainSearchDto } from '../../../../../backend/src/gains/dtos/gain-get.dto';
import { GainCreateDto } from '../../../../../backend/src/gains/dtos/gain-create.dto';
import { GainUpdateDto } from '../../../../../backend/src/gains/dtos/gain-update.dto';

@Injectable({
    providedIn: 'root',
})
export class GainService {
    private readonly baseUrl = 'gains';

    constructor(private apiService: ApiService) {}

    getAll(): Observable<GainGetDto[]> {
        return this.apiService.get<GainGetDto[]>(`${this.baseUrl}/all`);
    }

    getById(id: number): Observable<GainGetDto> {
        return this.apiService.get<GainGetDto>(`${this.baseUrl}/by-id/${id}`);
    }

    search(criteria: GainSearchDto, includeOptions?: GainIncludeDto): Observable<GainGetDto[]> {
        return this.apiService.post<GainGetDto[]>(`${this.baseUrl}/search`, { criteria, includeOptions });
    }

    searches(criteria: GainSearchDto, includeOptions?: GainIncludeDto): Observable<GainGetDto[]> {
        return this.apiService.post<GainGetDto[]>(`${this.baseUrl}/searches`, { criteria, includeOptions });
    }

    create(data: GainCreateDto): Observable<GainGetDto> {
        return this.apiService.post<GainGetDto>(`${this.baseUrl}/create`, data);
    }

    update(id: number, data: GainUpdateDto): Observable<GainGetDto> {
        return this.apiService.put<GainGetDto>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number): Observable<GainGetDto> {
        return this.apiService.delete<GainGetDto>(`${this.baseUrl}/${id}`);
    }
}