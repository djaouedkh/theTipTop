// core/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseUrl = environment.apiUrl

    constructor(private http: HttpClient) {}

    private setHeaders(): HttpHeaders {
        return new HttpHeaders({
        'Content-Type': 'application/json',
        // Ajoute d’autres en-têtes ici si nécessaire
        });
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        // Logique d'erreur plus détaillée
        console.error('API Error:', error);
        return throwError(() => new Error('Erreur lors de la communication avec le serveur.'));
    }

    // Méthode GET générique
    get<T>(endpoint: string, params?: any): Observable<T> {
        let httpParams = new HttpParams();
    
        // Si des paramètres sont présents, les ajouter
        if (params) {
            Object.keys(params).forEach(key => {
                httpParams = httpParams.set(key, params[key]);
            });
        }
    
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams })
            .pipe(catchError(this.handleError));
    }

    // Méthode POST générique
    post<T>(endpoint: string, data: any): Observable<T> {
        return this.http
        .post<T>(`${this.baseUrl}/${endpoint}`, data, { headers: this.setHeaders() })
        .pipe(catchError(this.handleError));
    }

    // Méthode PUT générique
    put<T>(endpoint: string, data: any): Observable<T> {
        return this.http
        .put<T>(`${this.baseUrl}/${endpoint}`, data, { headers: this.setHeaders() })
        .pipe(catchError(this.handleError));
    }

    // Méthode DELETE générique
    delete<T>(endpoint: string): Observable<T> {
        return this.http
        .delete<T>(`${this.baseUrl}/${endpoint}`, { headers: this.setHeaders() })
        .pipe(catchError(this.handleError));
    }
}
