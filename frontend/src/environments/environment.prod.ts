// src/environments/environment.prod.ts
export const environment = {
    production: true,
    apiUrl: 'https://api.tondomaine.com/api', // Adresse de l'API en production
    authProvider: {
        googleClientId: 'GOOGLE_CLIENT_ID',
        facebookAppId: 'FACEBOOK_APP_ID'
    }
};
