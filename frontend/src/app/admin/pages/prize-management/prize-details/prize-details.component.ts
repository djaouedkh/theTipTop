import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-prize-details',
    templateUrl: './prize-details.component.html'
})
export class PrizeDetailsComponent implements OnInit {
    prizeId: number | null = null;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.prizeId = +this.route.snapshot.paramMap.get('id')!;
        // Logique pour récupérer les détails du prix avec prizeId
    }
}
