import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable, map } from 'rxjs';
import { UserStoreService } from '../../stores/users/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    // On observe l'état d'authentification de l'utilisateur dans le store
    this.isAuthenticated$ = this.userStoreService.getUser().pipe(
      map(user => !!user.id) // Si l'ID de l'utilisateur est présent, l'utilisateur est connecté
    );
  }

  logout(): void {
    this.authService.logout();
    // On redirige l'utilisateur vers la page de connexion
  }
}
