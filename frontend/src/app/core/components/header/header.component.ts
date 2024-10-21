import { Component, OnInit } from '@angular/core';
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
  hasBackOfficeAccess$: Observable<boolean>; // Variable combinée

  constructor(
    private router: Router,
    private authService: AuthService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    // On observe l'état d'authentification et le rôle de l'utilisateur
    this.isAuthenticated$ = this.userStoreService.getUser().pipe(
      map(user => !!user.id)
    );
    this.isAdmin$ = this.userStoreService.getUser().pipe(
      map(user => user.role === 'Admin')
    );
    this.isEmployee$ = this.userStoreService.getUser().pipe(
      map(user => user.role === 'Employee')
    );

    // Variable combinée pour gérer l'accès au BackOffice (Admin ou Employee)
    this.hasBackOfficeAccess$ = combineLatest([this.isAdmin$, this.isEmployee$]).pipe(
      map(([isAdmin, isEmployee]) => isAdmin || isEmployee)
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
