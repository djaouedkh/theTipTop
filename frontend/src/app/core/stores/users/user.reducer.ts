import { createReducer, on } from '@ngrx/store';
import { setUser, clearUser } from './user.actions';

// Définir l'interface de l'état utilisateur
export interface UserState {
    id: number | null;
    name: string | null;
    email: string | null;
    role: string | null;
}

// État initial de l'utilisateur
export const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    role: null,
};

// Reducer pour gérer les actions sur l'état utilisateur
export const userReducer = createReducer(
    initialState,
    on(setUser, (state, { id, name, email, role }) => ({
        ...state,
        id,
        name,
        email,
        role,
    })),
    on(clearUser, (state) => ({
        ...state,
        id: null,
        name: null,
        email: null,
        role: null,
    }))
);
