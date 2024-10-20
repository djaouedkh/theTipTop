import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setUser, clearUser } from './user.actions';
import { UserState } from './user.reducer';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserStoreService {
    constructor(private store: Store<{ userState: UserState }>) {}

    // Sélecteur pour obtenir l'état utilisateur
    getUser(): Observable<UserState> {
        return this.store.select(state => state.userState);
    }

    // Action pour définir les informations de l'utilisateur
    setUser(id: number, name: string, email: string, role: string, token: string): void {
        this.store.dispatch(setUser({ id, name, email, role, token }));
    }

    // Action pour réinitialiser l'utilisateur
    clearUser(): void {
        this.store.dispatch(clearUser());
    }
}
