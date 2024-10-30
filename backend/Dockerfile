# Étape 1: Image de base pour build et tests
FROM node:18-alpine as builder

# Répertoire de travail
WORKDIR /app

# Utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copier uniquement package.json
COPY package*.json ./

# Installer les dépendances
RUN npm config set cache /app/.npm-cache --global && npm install --include=dev

# Copier le reste du code
COPY . .

# Générer Prisma
RUN npx prisma generate

# Étape 2: Test
FROM builder as test
ENV NODE_ENV=test
RUN npm test  # Lancer Jest

# Étape 3: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
USER appuser
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
