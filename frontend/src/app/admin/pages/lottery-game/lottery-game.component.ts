import { Component, OnInit } from '@angular/core';
import { LotteryGameService } from '../../../core/services/use-cases/lottery-game.service';
import { LotteryGameGetDto } from '../../../core/dtos/lottery-games/lottery-game-get.dto';

@Component({
  selector: 'app-lottery-game',
  templateUrl: './lottery-game.component.html',
})
export class LotteryGameComponent implements OnInit {
  lotteryGame: LotteryGameGetDto | null = null; // Utilisé pour stocker les informations du jeu de loterie
  isLoading = false; // Utilisé pour afficher l'état de chargement lors du tirage
  errorMessage: string | null = null; // Utilisé pour afficher les messages d'erreur

  constructor(private lotteryGameService: LotteryGameService) {}

  ngOnInit(): void {
    this.checkForWinner(); // Vérifie s'il y a déjà un gagnant lors de l'initialisation
  }

  // Fonction pour vérifier si un gagnant existe déjà
  checkForWinner(): void {
    this.lotteryGameService.get().subscribe({
      next: (lotteryGame) => {
        this.lotteryGame = lotteryGame; // Stocke les détails du jeu et du gagnant s'il existe
      },
      error: (error) => {
        this.errorMessage = "Erreur lors de la récupération du jeu de loterie.";
        console.error(error);
      },
    });
  }

  // Fonction pour lancer le tirage au sort
  drawWinner(): void {
    this.isLoading = true;
    this.lotteryGameService.play().subscribe({
      next: (lotteryGame) => {
        this.lotteryGame = lotteryGame; // Met à jour les informations du jeu avec le gagnant
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || "Erreur lors du tirage au sort.";
        this.isLoading = false;
        console.error(error);
      },
    });
  }
}
