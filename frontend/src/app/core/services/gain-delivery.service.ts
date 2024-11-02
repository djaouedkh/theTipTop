import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { GainDeliveryCreateDto } from '../dtos/gain-deliveries/gain-delivery-create.dto';
import { GainDeliveryGetDto, GainDeliverySearchDto, GainDeliveryIncludeDto } from '../dtos/gain-deliveries/gain-delivery-get.dto';
import { GainDeliveryUpdateDto } from '../dtos/gain-deliveries/gain-delivery-update.dto';

@Injectable({
    providedIn: 'root',
})
export class GainDeliveryService {
    private readonly baseUrl = 'gain-deliveries';

    constructor(private apiService: ApiService) {}

    getAll(): Observable<GainDeliveryGetDto[]> {
        return this.apiService.get<GainDeliveryGetDto[]>(`${this.baseUrl}/all`);
    }

    getById(id: number): Observable<GainDeliveryGetDto> {
        return this.apiService.get<GainDeliveryGetDto>(`${this.baseUrl}/by-id/${id}`);
    }

    search(criteria: GainDeliverySearchDto, includeOptions?: GainDeliveryIncludeDto): Observable<GainDeliveryGetDto[]> {
        return this.apiService.post<GainDeliveryGetDto[]>(`${this.baseUrl}/search`, { criteria, includeOptions });
    }

    searches(criteria: GainDeliverySearchDto, includeOptions?: GainDeliveryIncludeDto): Observable<GainDeliveryGetDto[]> {
        return this.apiService.post<GainDeliveryGetDto[]>(`${this.baseUrl}/searches`, { criteria, includeOptions });
    }

    create(data: GainDeliveryCreateDto): Observable<GainDeliveryGetDto> {
        return this.apiService.post<GainDeliveryGetDto>(`${this.baseUrl}/create`, data);
    }

    update(id: number, data: GainDeliveryUpdateDto): Observable<GainDeliveryGetDto> {
        return this.apiService.put<GainDeliveryGetDto>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number): Observable<GainDeliveryGetDto> {
        return this.apiService.delete<GainDeliveryGetDto>(`${this.baseUrl}/${id}`);
    }
}
