// src/app/admin/pages/stats-management/stats-management.component.ts
import { Component, OnInit } from '@angular/core';
// import { StatsService } from '../../../core/services/stats.service';

@Component({
    selector: 'app-stats-management',
    templateUrl: './stats-management.component.html'
})
export class StatsManagementComponent implements OnInit {
    totalTickets = 500000; // Exemple de données
    usedTickets = 300000;  // Exemple de données
    prizes = [
        { name: 'Infuseur à thé', count: 180000 },
        { name: 'Boîte de thé détox', count: 60000 },
        { name: 'Boîte de thé signature', count: 30000 },
        { name: 'Coffret découverte 39€', count: 18000 },
        { name: 'Coffret découverte 69€', count: 12000 }
    ]; // Exemple de données
    winnersCount = 200000; // Exemple de données

    // constructor(private statsService: StatsService) {}

    ngOnInit(): void {
        // Charger les statistiques réelles via statsService (à implémenter plus tard)
        // this.statsService.getStats().subscribe(stats => {
        //     this.totalTickets = stats.totalTickets;
        //     this.usedTickets = stats.usedTickets;
        //     this.prizes = stats.prizes;
        //     this.winnersCount = stats.winnersCount;
        // });
    }

    isEmailModalOpen = false;

    openEmailModal() {
        this.isEmailModalOpen = true;
    }

    closeEmailModal() {
        this.isEmailModalOpen = false;
    }
}
