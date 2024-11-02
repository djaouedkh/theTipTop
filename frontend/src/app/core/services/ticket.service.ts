import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { TicketCreateDto } from '../dtos/tickets/ticket-create.dto';
import { TicketGetDto, TicketSearchDto, TicketIncludeDto } from '../dtos/tickets/ticket-get.dto';
import { TicketUpdateDto } from '../dtos/tickets/ticket-update.dto';

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
