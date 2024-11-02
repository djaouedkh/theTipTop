// src/app/admin/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatsService } from '../../../core/services/use-cases/stats.service';
import { TicketGetDto } from '../../../core/dtos/tickets/ticket-get.dto';
import { GlobalStatsDto } from '../../../core/dtos/use-cases/stats/global-stats.dto';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    public stats: GlobalStatsDto = {
        totalTickets: 0,
        ticketsPlayed: 0,
        ticketsNotPlayed: 0,
        totalParticipants: 0,
        claimedGains: 0,
        unclaimedGains: 0
    }

    tickets: TicketGetDto[] = [];

    constructor(
        private router: Router,
        private statsService: StatsService
    ) {}

    ngOnInit(): void {
        this.getAllStats();
    }

    getAllStats(): void {        
        this.statsService.getAllStats().subscribe({
            next: (data: GlobalStatsDto) => {
                this.stats = data;
            },
            error: (error) => {
                console.error(error);
            }
        });
    } 
}
