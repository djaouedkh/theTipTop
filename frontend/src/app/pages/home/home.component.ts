import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrizeService } from '../../core/services/prize.service';
import { PrizeGetDto } from '../../../../../backend/src/prizes/dtos/prize-get.dto';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    title = "Participez à notre Grand Jeu-Concours !";
    description = "Fêtez l'ouverture de notre nouvelle boutique à Nice avec des lots exceptionnels à gagner !";
    prizes: PrizeGetDto[] = [];

    constructor(
        private router: Router,
        private prizeService: PrizeService
    ) {}

    ngOnInit(): void {
        this.loadPrizes();
    }

    loadPrizes(): void {
        this.prizeService.getAll().subscribe({
            next: (data: PrizeGetDto[]) => {
                this.prizes = data;
            },
            error: (err) => {
                console.error("Erreur lors de la récupération des prix : ", err);
            }
        });
    }

    onParticipate(): void {
        this.router.navigate(['/participate']);
    }
}
