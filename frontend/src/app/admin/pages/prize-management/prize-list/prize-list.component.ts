import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-prize-list',
    templateUrl: './prize-list.component.html'
})
export class PrizeListComponent implements OnInit {
  prizes: any[] = []; // Remplacez par le type précis après définition

    ngOnInit(): void {
        // Logique pour charger les prix
    }
}
