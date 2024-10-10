// src/app/pages/participate/participate.component.ts
import { Component } from '@angular/core';
// import { TicketService } from '../../core/services/ticket.service';
// import { TicketGetDto } from '../../../../../backend/src/tickets/dtos/ticket-get.dto';

@Component({
    selector: 'app-participate',
    templateUrl: './participate.component.html'
})
export class ParticipateComponent {
    ticketCode: string = '';
    // ticketDetails: TicketGetDto | null = null;
    errorMessage: string | null = null;

    // constructor(private ticketService: TicketService) {}

    onSubmit(): void {
        const criteria = { ref: this.ticketCode };
        
        // this.ticketService.searchTickets(criteria).subscribe({
        //     next: (tickets: TicketGetDto[]) => {
        //         if (tickets.length > 0) {
        //             this.ticketDetails = tickets[0];
        //             this.errorMessage = null;
        //         } else {
        //             this.errorMessage = "Code non valide ou non trouvé.";
        //             this.ticketDetails = null;
        //         }
        //     },
        //     error: (err) => {
        //         this.errorMessage = "Erreur lors de la recherche du ticket.";
        //         this.ticketDetails = null;
        //     }
        // });
    }
}
