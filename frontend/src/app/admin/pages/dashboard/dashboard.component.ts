// src/app/admin/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    stats = {
        totalTickets: 500000,     // Simulations de valeurs, remplacer par des appels API plus tard
        usedTickets: 250000,
        remainingTickets: 250000,
        totalParticipants: 120000,
        claimedPrizes: 100000,
        unclaimedPrizes: 50000
    };

    constructor() {}

    ngOnInit(): void {
        // Logique pour récupérer les statistiques réelles, si disponible
    }
}
