// src/app/admin/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { TicketGetDto, TicketSearchDto } from '../../../../../../backend/src/tickets/dtos/ticket-get.dto';
import { Router } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    stats = {
        totalTickets: 500000,     // Simulations de valeurs, remplacer par des appels API plus tard
        ticketsPlayed: 0,
        ticketsNotPlayed: 0,
        totalParticipants: 0,
        claimedPrizes: 0,
        unclaimedPrizes: 0
    };

    tickets: TicketGetDto[] = [];

    constructor(
        private router: Router,
        private ticketService: TicketService
    ) {}

    ngOnInit(): void {
        this.getAllTickets();
        this.getAllTicketsPlayed();
        this.getAllTicketsNotPlayed();
    }

    getAllTickets(): void {        
        this.ticketService.getAll().subscribe({
            next: (data: TicketGetDto[]) => {
                this.stats.totalTickets = data.length;
            },
            error: (err) => {
                console.error("Erreur lors de la récupération des prix : ", err);
            }
        });
    }

    getAllTicketsPlayed(): void {
        const criteria: TicketSearchDto = { userId: { not: null } };
        this.ticketService.searches(criteria).subscribe({
            next: (data: TicketGetDto[]) => {
                this.stats.ticketsPlayed = data.length;
            },
            error: (err) => {
                console.error("Erreur lors de la récupération des tickets avec participants : ", err);
            }
        });
    }

    getAllTicketsNotPlayed(): void {
        const criteria: TicketSearchDto = { userId: null };
        this.ticketService.searches(criteria).subscribe({
            next: (data: TicketGetDto[]) => {
                this.stats.ticketsNotPlayed = data.length;
            },
            error: (err) => {
                console.error("Erreur lors de la récupération des tickets avec participants : ", err);
            }
        });
    }

    getAllParticipants(): void {
        // obtenir le nombre de participants de manière unique
        const criteria: TicketSearchDto = { userId: { not: null } };
        this.ticketService.searches(criteria).subscribe({
            next: (data: TicketGetDto[]) => {
                const uniqueParticipants = new Set(data.map(ticket => ticket.userId));
                this.stats.totalParticipants = uniqueParticipants.size;
            },
            error: (err) => {
                console.error("Erreur lors de la récupération des participants : ", err);
            }
        });
    }

    // TODO faire tous cela dans le backend et faire juste un seul appel api qui me retourne un objet avec toutes ces valeurs
    
}
