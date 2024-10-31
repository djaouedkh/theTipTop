# Étape 1: Image de base pour build et tests
FROM node:18-alpine AS builder

# Répertoire de travail
WORKDIR /app

# Ajouter un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Passer temporairement à l'utilisateur root pour installer les dépendances
USER root

# Copier uniquement les fichiers nécessaires pour l’installation
COPY package*.json ./

# Configurer le cache npm local pour éviter les erreurs de permissions et installer les dépendances
RUN npm config set cache /app/.npm-cache --global && npm install --include=dev

# Copier le reste de l'application
COPY . .

# Créer le dossier dist avec les bonnes permissions pour l'utilisateur non-root
RUN mkdir /app/dist && chown -R appuser:appgroup /app/dist

# Changer de propriétaire pour tout le contenu avant la compilation
RUN chown -R appuser:appgroup /app

# Revenir à l'utilisateur non-root pour la suite
USER appuser

# Générer Prisma avant la compilation
RUN npx prisma generate

# Compiler l'application
RUN npm run build

# Étape 2: Image de test (exécute les tests Jest)
FROM builder AS test
ENV NODE_ENV=test
RUN npm test

# Étape 3: Image de production
FROM node:18-alpine

# Configurer le répertoire de travail et copier depuis l’étape builder
WORKDIR /app
COPY --from=builder /app .

# Utiliser l'utilisateur non-root en production
USER appuser

# Exposer le port de l'application
EXPOSE 3000

# Commande de démarrage de l'application
CMD ["npm", "run", "start:prod"]
