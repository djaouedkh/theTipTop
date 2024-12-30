import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../../core/stores/users/user-store.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html'
})
export class AdminHeaderComponent implements OnInit {
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  mobileMenuOpen = false;

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

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-button') && !target.closest('.mobile-menu')) {
      this.closeMobileMenu();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
