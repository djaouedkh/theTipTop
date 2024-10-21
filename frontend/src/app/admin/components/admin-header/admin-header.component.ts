import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../../core/stores/users/user-store.service';

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html'
})
export class AdminHeaderComponent {
    isAdmin: boolean = false;
  isEmployee: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.userStoreService.getUser().subscribe(user => {
      this.isAdmin = user.role === 'Admin';
      this.isEmployee = user.role === 'Employee';
    });
  }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
