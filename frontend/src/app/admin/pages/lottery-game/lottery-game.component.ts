import { Component, OnInit } from '@angular/core';
import { LotteryGameService } from '../../../core/services/use-cases/lottery-game.service';
import { UserGetDto } from '../../../../../../backend/src/users/dtos/user-get.dto';

@Component({
  selector: 'app-lottery-game',
  templateUrl: './lottery-game.component.html',
})
export class LotteryGameComponent implements OnInit {
  winner: UserGetDto | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private lotteryGameService: LotteryGameService) {}

  ngOnInit(): void {
    this.checkForWinner();
  }

  checkForWinner(): void {
    this.lotteryGameService.getWinner().subscribe({
      next: (winner) => {
        this.winner = winner;
      },
      error: (error) => {
        this.errorMessage = "Erreur lors de la récupération du gagnant.";
        console.error(error);
      },
    });
  }

  drawWinner(): void {
    this.isLoading = true;
    this.lotteryGameService.drawWinner().subscribe({
      next: (winner) => {
        this.winner = winner;
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
