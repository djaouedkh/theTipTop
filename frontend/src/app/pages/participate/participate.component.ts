// src/app/pages/participate/participate.component.ts
import { Component } from '@angular/core';
import { ParticipateService } from '../../core/services/use-cases/participate.service';
import { PlayToTheGameDto } from '../../core/dtos/use-cases/participate/play-to-the-game.dto';

@Component({
    selector: 'app-participate',
    templateUrl: './participate.component.html'
})
export class ParticipateComponent {
    ticketCode: string = '';
    playResult: PlayToTheGameDto | null = null;
    errorMessage: string | null = null;

    constructor(private participateService: ParticipateService) {}

    onSubmit(): void {
        // Réinitialiser les messages et résultats précédents
        this.playResult = null;
        this.errorMessage = null;

        // Appel au service pour jouer au jeu
        this.participateService.playToTheGame(this.ticketCode).subscribe({
            next: (result: PlayToTheGameDto) => {
                if (result.isWinner) {
                    this.playResult = result;
                } else {
                    this.errorMessage = "Malheureusement, vous n'avez pas gagné de gain pour ce code ou le ticket n'est plus valide.";
                }
            },
            error: () => {
                this.errorMessage = "Une erreur est survenue lors de la vérification du code. Veuillez réessayer.";
            }
        });
    }
}
