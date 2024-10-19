import { createAction, props } from '@ngrx/store'; 
import { UserGetDto } from '../../../../../../backend/src/users/dtos/user-get.dto';

// Action pour définir les utilisateurs sélectionnés
// 'createAction' est utilisé pour créer une action spécifique dans NgRx
// Ici, nous définissons une action nommée '[Email] Set Selected Users' pour mettre à jour les utilisateurs sélectionnés.
// Le 'props' permet de passer des données supplémentaires avec l'action, ici un tableau d'utilisateurs (UserGetDto[]).
export const setSelectedUsers = createAction(
    '[Email] Set Selected Users',  // Nom de l'action, qui sert d'identifiant
    props<{ users: UserGetDto[] }>() // props est utilisé pour transmettre les utilisateurs à l'action
);

// Action pour effacer la sélection d'utilisateurs
// Cette action, '[Email] Clear Selected Users', est créée sans 'props' car elle ne nécessite pas de données supplémentaires.
// Elle est utilisée pour vider ou réinitialiser la liste des utilisateurs sélectionnés.
export const clearSelectedUsers = createAction(
    '[Email] Clear Selected Users' // Nom de l'action pour supprimer les utilisateurs sélectionnés
);
