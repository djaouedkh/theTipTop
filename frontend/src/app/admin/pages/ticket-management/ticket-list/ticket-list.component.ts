// src/app/admin/pages/ticket-management/ticket-list/ticket-list.component.ts
import { Component, OnInit } from '@angular/core';
// import { TicketService } from '../../../../core/services/ticket.service';
// import { TicketGetDto } from '../../../../../backend/src/tickets/dtos/ticket-get.dto';

@Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html'
})
export class TicketListComponent implements OnInit {
    // tickets: TicketGetDto[] = [];
    tickets: any[] = [];

    // constructor(private ticketService: TicketService) {}

    ngOnInit(): void {
        this.loadTickets();
    }

    loadTickets(): void {
        // this.ticketService.getAllTickets().subscribe({
        //     next: (data) => {
        //         this.tickets = data;
        //     },
        //     error: (error) => {
        //         console.error("Erreur lors du chargement des tickets", error);
        //     }
        // });
    }
}
