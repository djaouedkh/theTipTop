# Étape 1
FROM node:20

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

# Définir le répertoire de travail dans le conteneur
WORKDIR /backend

# Copier uniquement les fichiers nécessaires depuis l'étape de build
COPY --from=builder /backend/dist ./dist
COPY --from=builder /backend/node_modules ./node_modules
COPY --from=builder /backend/package*.json ./
COPY --from=builder /backend/prisma ./prisma
COPY --from=builder /backend/src ./src

# Exposer le port utilisé par l'application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "dist/main", "run", "--port", "3000", "--host", "test"]
