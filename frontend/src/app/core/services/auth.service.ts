// core/services/auth.service.ts

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private apiService: ApiService) {
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
    login(email: string, password: string): Observable<any> {
        return this.apiService.post('auth/login', { email, password }).pipe(
            tap((response: any) => {
                this.storeUser(response.token);
            })
        );
    }

    // Connexion via Google
    loginWithGoogle(): Observable<any> {
        return this.apiService.post('auth/google', {}).pipe(
            tap((response: any) => {
                // stock the user
            })
        );
    }

    // Connexion via Facebook
    loginWithFacebook(): Observable<any> {
        return this.apiService.post('auth/facebook', {}).pipe(
            tap((response: any) => {
                // stock the user
            })
        );
    }

    // Déconnexion
    logout(): void {
        localStorage.removeItem('userToken');
        this.currentUserSubject.next(null);
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
}
