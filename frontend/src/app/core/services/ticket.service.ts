// core/services/ticket.service.ts

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
// DTOs importés depuis le back-end
import { TicketGetDto } from '../../../../../backend/src/tickets/dtos/ticket-get.dto';
import { TicketCreateDto } from '../../../../../backend/src/tickets/dtos/ticket-create.dto';
import { TicketUpdateDto } from '../../../../../backend/src/tickets/dtos/ticket-update.dto';

@Injectable({
    providedIn: 'root',
})
export class TicketService {
    constructor(private apiService: ApiService) {}

    // Récupérer tous les tickets
    getAllTickets(): Observable<TicketGetDto[]> {
        return this.apiService.get<TicketGetDto[]>('tickets');
    }

    // Récupérer un ticket par son ID
    getTicketById(id: number): Observable<TicketGetDto> {
        return this.apiService.get<TicketGetDto>(`tickets/${id}`);
    }

    // Récupérer les tickets par critères de recherche
    searchTickets(criteria: any): Observable<TicketGetDto[]> {
        return this.apiService.get<TicketGetDto[]>(`tickets/search`, criteria);
    }

    // Créer un nouveau ticket
    createTicket(data: TicketCreateDto): Observable<TicketGetDto> {
        return this.apiService.post<TicketGetDto>('tickets/create', data);
    }

    // Mettre à jour un ticket existant
    updateTicket(id: number, data: TicketUpdateDto): Observable<TicketGetDto> {
        return this.apiService.put<TicketGetDto>(`tickets/${id}`, data);
    }

    // Supprimer un ticket
    deleteTicket(id: number): Observable<TicketGetDto> {
        return this.apiService.delete<TicketGetDto>(`tickets/${id}`);
    }
}
