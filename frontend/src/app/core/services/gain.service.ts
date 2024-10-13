import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { GainGetDto } from '../../../../../backend/src/gains/dtos/gain-get.dto';
import { GainCreateDto } from '../../../../../backend/src/gains/dtos/gain-create.dto';
import { GainUpdateDto } from '../../../../../backend/src/gains/dtos/gain-update.dto';

@Injectable({
    providedIn: 'root',
})
export class GainService {
    constructor(private apiService: ApiService) {}

    getAll(): Observable<GainGetDto[]> {
        return this.apiService.get<GainGetDto[]>('gains');
    }

    getById(id: number): Observable<GainGetDto> {
        return this.apiService.get<GainGetDto>(`gains/${id}`);
    }

    create(data: GainCreateDto): Observable<GainGetDto> {
        return this.apiService.post<GainGetDto>('gains/create', data);
    }

    update(id: number, data: GainUpdateDto): Observable<GainGetDto> {
        return this.apiService.put<GainGetDto>(`gains/${id}`, data);
    }

    delete(id: number): Observable<GainGetDto> {
        return this.apiService.delete<GainGetDto>(`gains/${id}`);
    }
}
