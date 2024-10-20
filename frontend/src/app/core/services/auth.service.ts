import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { AuthResponseDto } from '../../../../../backend/src/auth/dtos/auth-response.dto';
import { UserStoreService } from '../stores/users/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private apiService: ApiService,
    private userStoreService: UserStoreService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getStoredUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getStoredUser(): any {
    const userToken = localStorage.getItem('userToken');
    return userToken ? jwtDecode(userToken) : null;
  }

  private storeUser(token: string): void {
    localStorage.setItem('userToken', token);
    this.currentUserSubject.next(jwtDecode(token));
  }

  // Connexion via formulaire classique
  login(email: string, password: string): Observable<AuthResponseDto> {
    return this.apiService.post<AuthResponseDto>('auth/login', { email, password }).pipe(
      tap((response: AuthResponseDto) => {
        if (response.isSuccess && response.accessToken && response.user) {
          this.storeUser(response.accessToken); // Stocker le token uniquement si succès
          this.userStoreService.setUser(
            response.user.id, 
            response.user.firstname, 
            response.user.email, 
            response.user.role.name, 
            response.accessToken
          );
        }
      })
    );
  }

  // Inscription via formulaire classique
  register(user: any): Observable<AuthResponseDto> {
    return this.apiService.post<AuthResponseDto>('auth/register', user).pipe(
      tap((response: AuthResponseDto) => {
        if (response.isSuccess && response.accessToken && response.user) {
          this.storeUser(response.accessToken); // Stocker le token uniquement si succès
          this.userStoreService.setUser(
            response.user.id, 
            response.user.firstname, 
            response.user.email, 
            response.user.role.name, 
            response.accessToken
          );
        }
      })
    );
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('userToken');
    this.currentUserSubject.next(null);
    this.userStoreService.clearUser();
  }

  // Récupération du token JWT
  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  // Vérification de l'authentification de l'utilisateur
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user && user.role === role;
  }

  refreshToken(): Observable<AuthResponseDto> {
    return this.apiService.post<AuthResponseDto>('auth/refresh', {}).pipe(
      tap((response: AuthResponseDto) => {
        if (response.isSuccess && response.accessToken) {
          this.storeUser(response.accessToken); // Remplacer l'ancien token par le nouveau si succès
        }
      })
    );
  }
}
