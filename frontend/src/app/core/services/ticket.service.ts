import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { TicketGetDto } from '../../../../../backend/src/tickets/dtos/ticket-get.dto';
import { TicketCreateDto } from '../../../../../backend/src/tickets/dtos/ticket-create.dto';
import { TicketUpdateDto } from '../../../../../backend/src/tickets/dtos/ticket-update.dto';

@Injectable({
    providedIn: 'root',
})
export class TicketService {
    constructor(private apiService: ApiService) {}

    // Récupérer tous les tickets
    getAll(): Observable<TicketGetDto[]> {
        return this.apiService.get<TicketGetDto[]>('tickets');
    }

    // Récupérer un ticket par son ID
    getById(id: number): Observable<TicketGetDto> {
        return this.apiService.get<TicketGetDto>(`tickets/${id}`);
    }

    // Récupérer les tickets par critères de recherche
    search(criteria: any): Observable<TicketGetDto[]> {
        return this.apiService.get<TicketGetDto[]>(`tickets/search`, criteria);
    }

    getGainOfTicket(ticketCode: string): Observable<TicketGetDto> { 
        return this.apiService.get<TicketGetDto>(`tickets/by-ref/${ticketCode}`);
    }

    // Créer un nouveau ticket
    create(data: TicketCreateDto): Observable<TicketGetDto> {
        return this.apiService.post<TicketGetDto>('tickets/create', data);
    }

    // Mettre à jour un ticket existant
    update(id: number, data: TicketUpdateDto): Observable<TicketGetDto> {
        return this.apiService.put<TicketGetDto>(`tickets/${id}`, data);
    }

    // Supprimer un ticket
    delete(id: number): Observable<TicketGetDto> {
        return this.apiService.delete<TicketGetDto>(`tickets/${id}`);
    }
}
