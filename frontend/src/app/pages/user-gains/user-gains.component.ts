import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';
import { UserStoreService } from '../../core/stores/users/user-store.service';
import { UserState } from '../../core/stores/users/user.reducer';
import { TicketGetDto, TicketSearchDto, TicketIncludeDto } from '../../core/dtos/tickets/ticket-get.dto';

@Component({
    selector: 'app-user-gains',
    templateUrl: './user-gains.component.html'
})
export class UserGainsComponent implements OnInit {
    userGains: TicketGetDto[] = [];
    errorMessage: string | null = null;

    constructor(
        private ticketService: TicketService,
        private userStoreService: UserStoreService // Injecte ton service UserStore
    ) {}

    ngOnInit(): void {
        // Récupérer l'utilisateur connecté depuis le store
        this.userStoreService.getUser().subscribe((user: UserState) => {
            if (user && user.id) {
                const userId = user.id; // Récupérer l'ID de l'utilisateur connecté

                // Critères de recherche et options d'inclusion
                const criteria: TicketSearchDto = { userId };
                const includeOptions: TicketIncludeDto = { gain: true };

                // Appeler le service pour récupérer les gains de l'utilisateur
                this.ticketService.searches(criteria, includeOptions).subscribe({
                    next: (gains) => {
                        this.userGains = gains;
                    },
                    error: () => {
                        this.errorMessage = "Une erreur est survenue lors du chargement des gains.";
                    }
                });
            } else {
                this.errorMessage = "Utilisateur non connecté.";
            }
        });
    }
}
