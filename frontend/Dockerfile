# Dockerfile pour le front-end Angular
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG BUILD_COMMAND=build

RUN $BUILD_COMMAND





# Étape de vérification pour lister les fichiers dans /app/dist/frontend-app
RUN ls -l /app/dist/frontend-app





# Serveur Nginx pour le déploiement
FROM nginx:alpine

COPY --from=build /app/dist/frontend-app /usr/share/nginx/html

EXPOSE 80
