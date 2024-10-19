import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

// Meta-reducer pour persister les données dans le localStorage
export function storageMetaReducer<S, A extends { type: string }>( // S: type de l'état (state), A: type de l'action
    reducer: ActionReducer<S, A> // Reducer à décorer, exemple: emailReducer
): ActionReducer<S, A> { // Retourne un nouveau reducer qui enveloppe le reducer original
    return function (state, action) {
        // Vérifie si l'action est INIT (initialisation du store) ou UPDATE (mise à jour du store)
        if (action.type === INIT || action.type === UPDATE) {
            try { // Bloc try-catch pour gérer les erreurs potentielles lors de la lecture du localStorage
                const savedState = localStorage.getItem('appState'); // Récupère l'état depuis le localStorage
                if (savedState) { // Si l'état existe dans le localStorage
                    const parsedState = JSON.parse(savedState); // Parse l'état en objet JS
                    // Valide le format de l'état (facultatif mais recommandé)
                    if (parsedState && typeof parsedState === 'object') { // Vérifie que l'état est un objet valide
                        return parsedState; // Si valide, retourne l'état sauvegardé
                    }
                }
            } catch (error) {
                console.error('Erreur lors du chargement de l\'état depuis le localStorage', error); 
                localStorage.removeItem('appState'); // Supprime l'état corrompu dans le localStorage pour éviter de futures erreurs
            }
        }

        const nextState = reducer(state, action); // Appel du reducer initial pour obtenir le nouvel état

        // Sauvegarde le nouvel état dans le localStorage si l'état est valide et non null
        if (nextState) { 
            localStorage.setItem('appState', JSON.stringify(nextState)); // Sauvegarde l'état dans le localStorage sous forme de chaîne JSON
        }

        return nextState; // Retourne le nouvel état (modifié ou non)
    };
}
