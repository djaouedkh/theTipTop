import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';
import { TicketGetDto, TicketIncludeDto, TicketSearchDto } from '../../../../../backend/src/tickets/dtos/ticket-get.dto';

@Component({
    selector: 'app-user-gains',
    templateUrl: './user-gains.component.html'
})
export class UserGainsComponent implements OnInit {
    userGains: TicketGetDto[] = [];
    errorMessage: string | null = null;

    constructor(private ticketService: TicketService) {}

    ngOnInit(): void {
        // Récupérer l'id de l'utilisateur connecté
        const userId = 1; // à remplacer par la logique de récupération de l'utilisateur

        // Critères de recherche et options d'inclusion
        const criteria: TicketSearchDto = { userId };
        const includeOptions: TicketIncludeDto = { gain: true };

        // Appeler le service pour récupérer les gains de l'utilisateur
        this.ticketService.searches(criteria, includeOptions).subscribe({
            next: (gains) => {
                console.log(gains);
                this.userGains = gains;
            },
            error: () => {
                this.errorMessage = "Une erreur est survenue lors du chargement des gains.";
            }
        });
    }
}
