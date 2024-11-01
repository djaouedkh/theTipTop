# Étape 1 : Construction de l'application
FROM node:20 AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /backend

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer toutes les dépendancesau moment du build ?
RUN npm install

# Copier le reste des fichiers du backend
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Construire l'application
RUN npm run build

# Étape 2 : Image finale pour l'exécution
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /backend

# Copier uniquement les fichiers nécessaires depuis l'étape de build
COPY --from=builder /backend/dist ./dist
COPY --from=builder /backend/node_modules ./node_modules
COPY --from=builder /backend/package*.json ./
COPY --from=builder /backend/prisma ./prisma

# Exposer le port utilisé par l'application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "dist/main"]
