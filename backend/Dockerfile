# Utiliser une image Node.js légère
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Ajouter un utilisateur non root pour éviter les problèmes de permissions
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copier uniquement les fichiers nécessaires pour l’installation
COPY package*.json ./

# Configuration du cache npm local pour éviter les erreurs de permissions
RUN npm config set cache /app/.npm-cache

# Installer les dépendances
RUN npm install --include=dev

# Copier le reste de l'application
COPY . .

# Charger les variables d'environnement dynamiquement en fonction de NODE_ENV sans copier .env
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Générer les types Prisma avant la compilation
RUN npx prisma generate

# Compiler l'application
RUN npm run build

# Exposer le port (à ajuster si nécessaire)
EXPOSE 3000

# Commande de démarrage de l'application
CMD ["npm", "run", "start:prod"]
