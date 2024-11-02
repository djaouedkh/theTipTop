import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { UserStoreService } from '../stores/users/user-store.service';
import { AuthResponseDto } from '../dtos/auth/auth-response.dto';
import { UserLoginGoogleDto } from '../dtos/auth/external-auth/user-login-google.dto';

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

  // Connexion via formulaire classique
  loginPostGoogleAuth(data: UserLoginGoogleDto): Observable<AuthResponseDto> {
    return this.apiService.post<AuthResponseDto>('auth/login-post-google-valid', data).pipe(
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

  exchangeCodeForToken(code: string): Observable<AuthResponseDto> {
    console.log('B');
    return this.apiService.post<AuthResponseDto>('auth/google/callback', { code }).pipe(
      tap((response: AuthResponseDto) => {
        console.log('C');
        if (response.isSuccess && response.accessToken) {
          console.log('D');
          this.storeUser(response.accessToken);
          console.log('response', response);
        }
      })
    );
  }
}
