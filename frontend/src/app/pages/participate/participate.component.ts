// src/app/pages/participate/participate.component.ts
import { Component } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';
import { TicketGetDto } from '../../../../../backend/src/tickets/dtos/ticket-get.dto';

@Component({
    selector: 'app-participate',
    templateUrl: './participate.component.html'
})
export class ParticipateComponent {
    ticketCode: string = '';
    ticketDetails: TicketGetDto | null = null;
    errorMessage: string | null = null;

    constructor(private ticketService: TicketService) {}

    onSubmit(): void {
        // Réinitialiser les messages et résultats précédents
        this.ticketDetails = null;
        this.errorMessage = null;

        // Appel au service pour vérifier le ticket
        this.ticketService.getPrizeOfTicket(this.ticketCode).subscribe({
            next: (ticket: TicketGetDto) => {
                if (ticket && ticket.prize) {
                    this.ticketDetails = ticket;
                    this.errorMessage = null;
                } else {
                    this.errorMessage = "Code non valide ou non trouvé.";
                    this.ticketDetails = null;
                }
            },
            error: () => {
                this.errorMessage = "Code non valide ou non trouvé.";
                this.ticketDetails = null;
            }
        });
        
    }
}
