import { createAction, props } from '@ngrx/store';

// Actions pour définir les informations de l'utilisateur connecté
export const setUser = createAction(
    '[User] Set User',
    props<{ id: number; name: string; email: string; role: string, token: string }>() // Les propriétés attendues pour l'utilisateur
);

export const clearUser = createAction(
    '[User] Clear User' // Action pour réinitialiser les informations de l'utilisateur
);
