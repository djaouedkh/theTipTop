// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//     selector: 'app-root',
//     templateUrl: './app.component.html'
// })
// export class AppComponent {
//     constructor(private router: Router) {}

//     isAdminRoute(): boolean {
//         return this.router.url.startsWith('/admin');
//     }
// }


// src/app/app.component.ts

// src/app/app.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgcCookieConsentService,
  NgcInitializingEvent,
  NgcStatusChangeEvent
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private ccSubscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private ccService: NgcCookieConsentService
  ) {}

  ngOnInit(): void {
    // Événement déclenché lorsque CookieConsent commence son initialisation
    this.ccSubscriptions.push(
      this.ccService.initializing$.subscribe((event: NgcInitializingEvent) => {
        console.log('CookieConsent initializing', event);
      })
    );

    // Événement déclenché à chaque changement de statut (allow, deny, dismiss)
    this.ccSubscriptions.push(
      this.ccService.statusChange$.subscribe((event: NgcStatusChangeEvent) => {
        console.log('CookieConsent status:', event.status);
      })
    );
  }

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  ngOnDestroy(): void {
    // Désabonnement pour éviter les fuites mémoire
    this.ccSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
