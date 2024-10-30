# Utiliser une image Node.js légère
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour l’installation
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Charger les variables d'environnement dynamiquement en fonction de NODE_ENV sans copier .env
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Charger les variables du .env et les exporter en variables d'environnement
RUN if [ -f .env.${NODE_ENV} ]; then \
        # Charger les variables du .env.${NODE_ENV} dans les variables d'environnement
        export $(grep -v '^#' .env.${NODE_ENV} | xargs); \
    fi

# Générer les types Prisma avant la compilation
RUN npx prisma generate

# Compiler l'application (les variables sont maintenant accessibles en tant que variables d'environnement)
RUN npm run build

# Exposer le port (à ajuster si nécessaire)
EXPOSE 3000

# Commande de démarrage de l'application
CMD ["npm", "run", "start:prod"]
