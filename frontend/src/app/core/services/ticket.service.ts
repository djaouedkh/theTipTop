import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { TicketGetDto, TicketIncludeDto, TicketSearchDto } from '../../../../../backend/src/tickets/dtos/ticket-get.dto';
import { TicketCreateDto } from '../../../../../backend/src/tickets/dtos/ticket-create.dto';
import { TicketUpdateDto } from '../../../../../backend/src/tickets/dtos/ticket-update.dto';

@Injectable({
    providedIn: 'root',
})
export class TicketService {
    private readonly baseUrl = 'tickets';

    constructor(private apiService: ApiService) {}

    getAll(): Observable<TicketGetDto[]> {
        return this.apiService.get<TicketGetDto[]>(`${this.baseUrl}/all`);
    }

    getById(id: number): Observable<TicketGetDto> {
        return this.apiService.get<TicketGetDto>(`${this.baseUrl}/by-id/${id}`);
    }

    search(criteria: TicketSearchDto, includeOptions?: TicketIncludeDto): Observable<TicketGetDto[]> {
        return this.apiService.post<TicketGetDto[]>(`${this.baseUrl}/search`, { criteria, includeOptions });
    }

    searches(criteria: TicketSearchDto, includeOptions?: TicketIncludeDto): Observable<TicketGetDto[]> {
        return this.apiService.post<TicketGetDto[]>(`${this.baseUrl}/searches`, { criteria, includeOptions });
    }

    create(data: TicketCreateDto): Observable<TicketGetDto> {
        return this.apiService.post<TicketGetDto>(`${this.baseUrl}/create`, data);
    }

    update(id: number, data: TicketUpdateDto): Observable<TicketGetDto> {
        return this.apiService.put<TicketGetDto>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number): Observable<TicketGetDto> {
        return this.apiService.delete<TicketGetDto>(`${this.baseUrl}/${id}`);
    }
}
