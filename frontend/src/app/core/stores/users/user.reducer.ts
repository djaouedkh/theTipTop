// import { createReducer, on } from '@ngrx/store';
// import { setUser, clearUser } from './user.actions';
// import { RoleType } from '../../../../../../backend/src/roles/types/role.type';

// // Définir l'état initial pour l'utilisateur
// export interface UserState {
//   user: {
//     id?: number;
//     name?: string;
//     email?: string;
//     role?: RoleType;
//   } | null;
// }

// export const initialState: UserState = {
//   user: null,
// };

// // Reducer
// export const userReducer = createReducer(
//   initialState,
//   on(setUser, (state, { user }) => ({
//     ...state,
//     user,
//   })),
//   on(clearUser, (state) => ({
//     ...state,
//     user: null,
//   }))
// );
