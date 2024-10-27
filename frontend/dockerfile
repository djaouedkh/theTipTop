# Étape de build de l'application Angular
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Charger le fichier d'environnement en fonction de NODE_ENV
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Construire l'application Angular en fonction de NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then \
        npm run build -- --configuration production; \
    elif [ "$NODE_ENV" = "staging" ]; then \
        npm run build -- --configuration staging; \
    else \
        npm run build -- --configuration development; \
    fi

# Étape de déploiement avec Nginx pour servir l'application
FROM nginx:alpine
COPY --from=build /app/dist/frontend-app /usr/share/nginx/html

# Exposer le port Nginx (à ajuster si nécessaire)
EXPOSE 80

# Commande de démarrage (par défaut pour Nginx)
CMD ["nginx", "-g", "daemon off;"]
