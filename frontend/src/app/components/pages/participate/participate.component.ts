import { Component } from '@angular/core';
import { PlayToTheGameDto } from '../../../core/dtos/use-cases/participate/play-to-the-game.dto';
import { ParticipateService } from '../../../core/services/use-cases/participate.service';
import { UserStoreService } from '../../../core/stores/users/user-store.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-participate',
    templateUrl: './participate.component.html'
})
export class ParticipateComponent {
    ticketCode: string = '';
    playResult: PlayToTheGameDto | null = null;
    errorMessage: string | null = null;

    constructor(
        private participateService: ParticipateService,
        private userStoreService: UserStoreService
    ) {}

    onSubmit(): void {
        // Réinitialiser les messages et résultats précédents
        this.playResult = null;
        this.errorMessage = null;

        this.userStoreService.getUser().pipe(take(1)).subscribe(user => {
            if (user && user.id) {
                // Appel au service pour jouer au jeu en passant ticketCode et user.id
                this.participateService.playToTheGame(this.ticketCode, user.id).subscribe({
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
            } else {
                // En cas d'absence d'utilisateur dans le store
                this.errorMessage = "Utilisateur non authentifié ou introuvable.";
            }
        });
    }
}