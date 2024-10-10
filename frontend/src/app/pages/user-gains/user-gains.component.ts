// src/app/pages/user-gains/user-gains.component.ts
import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../core/services/user.service';
// import { PrizeDistributionGetDto } from '../../../../../backend/src/prize-distributions/dtos/prize-distribution-get.dto';

@Component({
    selector: 'app-user-gains',
    templateUrl: './user-gains.component.html'
})
export class UserGainsComponent implements OnInit {
    // userGains: PrizeDistributionGetDto[] = [];
    errorMessage: string | null = null;

    // constructor(private userService: UserService) {}

    ngOnInit(): void {
        // const email = 'value@example.com'; // Remplace par la méthode pour obtenir l'email de l'utilisateur connecté
        // this.userService.getUserGains(email).subscribe({
        // next: (user) => {
        //     if (user && user.prizeDistributions) {
        //     this.userGains = user.prizeDistributions;
        //     } else {
        //     this.errorMessage = 'Aucun gain trouvé pour cet utilisateur.';
        //     }
        // },
        // error: () => {
        //     this.errorMessage = "Erreur lors de la récupération des gains.";
        // }
        // });
    }
}
