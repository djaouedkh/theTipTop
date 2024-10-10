// user-management.component.ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-user-management',
    template: `
        <h1>Gestion des Utilisateurs</h1>
        <router-outlet></router-outlet>
    `,
})
export class UserManagementComponent {}
