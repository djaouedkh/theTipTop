import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html'
})
export class AdminHeaderComponent {
    constructor(private authService: AuthService, private router: Router) {}

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
