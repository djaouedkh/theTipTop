// src/app/admin/pages/ticket-management/ticket-details/ticket-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { TicketService } from '../../../../core/services/ticket.service';
// import { TicketGetDto } from '../../../../../backend/src/tickets/dtos/ticket-get.dto';

@Component({
    selector: 'app-ticket-details',
    templateUrl: './ticket-details.component.html'
})
export class TicketDetailsComponent implements OnInit {
    // ticket: TicketGetDto | null = null;
    ticket: any | null = null;

    // constructor(private route: ActivatedRoute, private ticketService: TicketService) {}

    ngOnInit(): void {
        // const ticketId = +this.route.snapshot.paramMap.get('id')!;
        // this.loadTicket(ticketId);
    }

    loadTicket(id: number): void {
        // this.ticketService.getTicketById(id).subscribe({
        //     next: (data) => {
        //         this.ticket = data;
        //     },
        //     error: (error) => {
        //         console.error("Erreur lors du chargement du ticket", error);
        //     }
        // });
    }
}
