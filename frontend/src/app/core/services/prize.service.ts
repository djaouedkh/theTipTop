import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PrizeGetDto } from '../../../../../backend/src/prizes/dtos/prize-get.dto';
import { PrizeCreateDto } from '../../../../../backend/src/prizes/dtos/prize-create.dto';
import { PrizeUpdateDto } from '../../../../../backend/src/prizes/dtos/prize-update.dto';

@Injectable({
    providedIn: 'root',
})
export class PrizeService {
    constructor(private apiService: ApiService) {}

    getAll(): Observable<PrizeGetDto[]> {
        return this.apiService.get<PrizeGetDto[]>('prizes');
    }

    getById(id: number): Observable<PrizeGetDto> {
        return this.apiService.get<PrizeGetDto>(`prizes/${id}`);
    }

    create(data: PrizeCreateDto): Observable<PrizeGetDto> {
        return this.apiService.post<PrizeGetDto>('prizes/create', data);
    }

    update(id: number, data: PrizeUpdateDto): Observable<PrizeGetDto> {
        return this.apiService.put<PrizeGetDto>(`prizes/${id}`, data);
    }

    delete(id: number): Observable<PrizeGetDto> {
        return this.apiService.delete<PrizeGetDto>(`prizes/${id}`);
    }
}
