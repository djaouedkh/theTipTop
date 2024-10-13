import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GainService } from '../../core/services/gain.service';
import { GainGetDto } from '../../../../../backend/src/gains/dtos/gain-get.dto';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    title = "Participez à notre Grand Jeu-Concours !";
    description = "Fêtez l'ouverture de notre nouvelle boutique à Nice avec des lots exceptionnels à gagner !";
    gains: GainGetDto[] = [];

    constructor(
        private router: Router,
        private gainService: GainService
    ) {}

    ngOnInit(): void {
        this.loadPrizes();
    }

    loadPrizes(): void {
        this.gainService.getAll().subscribe({
            next: (data: GainGetDto[]) => {
                this.gains = data;
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
