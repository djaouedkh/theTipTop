import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setSelectedUsers, clearSelectedUsers } from './email.actions';
import { EmailState } from './email.reducer';
import { Observable } from 'rxjs';
import { UserGetDto } from '../../dtos/users/user-get.dto';

@Injectable({
    providedIn: 'root',
})
export class EmailStoreService {
    // On injecte le store d'EmailState
    constructor(private store: Store<{ emailState: EmailState }>) {}

    // Sélecteur pour obtenir les utilisateurs sélectionnés
    getSelectedUsers(): Observable<UserGetDto[]> {
        return this.store.select(state => state.emailState.selectedUsers);
    }

    // Action pour définir les utilisateurs sélectionnés
    setSelectedUsers(users: UserGetDto[]): void {
        this.store.dispatch(setSelectedUsers({ users }));
    }

    // Action pour vider la sélection
    clearSelectedUsers(): void {
        this.store.dispatch(clearSelectedUsers());
    }
}
