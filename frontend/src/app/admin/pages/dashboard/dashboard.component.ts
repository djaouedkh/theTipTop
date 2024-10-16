// src/app/admin/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { TicketGetDto, TicketSearchDto } from '../../../../../../backend/src/tickets/dtos/ticket-get.dto';
import { Router } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.service';
import { GlobalStatsDto } from '../../../../../../backend/src/use-cases/stats/dtos/global-stats.dto';
import { StatsService } from '../../../core/services/use-cases/stats.service';

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
