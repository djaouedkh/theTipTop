import { createReducer, on } from '@ngrx/store';
import { setSelectedUsers, clearSelectedUsers } from './email.actions'; // Importe les actions pour mettre à jour l'état
import { UserGetDto } from '../../dtos/users/user-get.dto';

// Interface pour définir la structure de l'état
export interface EmailState {
  selectedUsers: UserGetDto[];
}

// Initialisation de l'état
export const initialState: EmailState = {
  selectedUsers: [],
};

// Reducer pour mettre à jour l'état des utilisateurs sélectionnés
export const emailReducer = createReducer( // Crée un reducer à partir de plusieurs fonctions de réduction
  initialState,
  // Définition des actions et des fonctions de réduction associées
  on(setSelectedUsers, (state, { users }) => ({ // écoute l'action 'setSelectedUsers' et met à jour l'état
    ...state,
    selectedUsers: [...users],  // Crée une copie immuable du tableau
  })),
  on(clearSelectedUsers, (state) => ({ // écoute l'action 'clearSelectedUsers' et met à jour l'état
    ...state,
    selectedUsers: [],
  }))
);

