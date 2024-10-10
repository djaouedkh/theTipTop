import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    title = "Participez à notre Grand Jeu-Concours !";
    description = "Fêtez l'ouverture de notre nouvelle boutique à Nice avec des lots exceptionnels à gagner !";
    prizes = [
        { name: "Infuseur à thé", chance: "60%" },
        { name: "Boîte de thé détox", chance: "20%" },
        { name: "Boîte de thé signature", chance: "10%" },
        { name: "Coffret découverte 39€", chance: "6%" },
        { name: "Coffret découverte 69€", chance: "4%" }
    ];

    constructor(
        private router: Router
    ) {}

    ngOnInit(): void {}

    onParticipate(): void {
        this.router.navigate(['/participate']);
    }
}
