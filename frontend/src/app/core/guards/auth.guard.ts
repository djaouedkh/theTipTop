import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStoreService } from '../stores/users/user-store.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userStore: UserStoreService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userStore.getUser().pipe(
      map(user => {
        if (user && user.id) {
          return true; // Autorisé si l'utilisateur est connecté
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
