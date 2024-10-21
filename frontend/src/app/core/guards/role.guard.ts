import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserStoreService } from '../stores/users/user-store.service';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private userStore: UserStoreService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRoles = route.data['roles']; // Rôle attendu de la route
    console.log('Role attendu : ', expectedRoles);

    return this.userStore.getUser().pipe(
      map(user => {
        console.log('Role utilisateur : ', user.role);
        if (user && expectedRoles.includes(user.role)) {
          return true;
        }
        this.router.navigate(['/home']); // Redirection si le rôle ne correspond pas
        return false;
      })
    );
  }
}
