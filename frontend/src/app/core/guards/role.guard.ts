import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserStoreService } from '../stores/users/user-store.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private userStore: UserStoreService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data['role']; // Rôle attendu de la route

    return this.userStore.getUser().pipe(
      map(user => {
        if (user && user.role === expectedRole) {
          return true;
        }
        this.router.navigate(['/access-denied']); // Redirection si le rôle ne correspond pas
        return false;
      })
    );
  }
}
