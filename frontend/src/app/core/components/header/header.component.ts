import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable, map, combineLatest } from 'rxjs';
import { UserStoreService } from '../../stores/users/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isEmployee$: Observable<boolean>;
  hasBackOfficeAccess$: Observable<boolean>;

  mobileMenuOpen = false; // État du menu mobile

  constructor(
    private router: Router,
    private authService: AuthService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.userStoreService.getUser().pipe(
      map(user => !!user.id)
    );
    this.isAdmin$ = this.userStoreService.getUser().pipe(
      map(user => user.role === 'Admin')
    );
    this.isEmployee$ = this.userStoreService.getUser().pipe(
      map(user => user.role === 'Employee')
    );
    this.hasBackOfficeAccess$ = combineLatest([this.isAdmin$, this.isEmployee$]).pipe(
      map(([isAdmin, isEmployee]) => isAdmin || isEmployee)
    );
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  // Écoute des clics globaux pour fermer le menu si le clic est à l'extérieur
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Si le clic est en dehors du menu ou du bouton hamburger, fermer le menu
    if (!target.closest('.menu-button') && !target.closest('.mobile-menu')) {
      this.closeMobileMenu();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
