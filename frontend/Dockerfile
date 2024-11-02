# Dockerfile pour le front-end Angular
FROM node:18 AS build

WORKDIR /frontend

COPY package*.json ./

# Augmenter le délai d'attente de npm et installer les dépendances
RUN npm set timeout 60000 && npm install

COPY . .

ARG BUILD_COMMAND=build

RUN $BUILD_COMMAND

# Serveur Nginx pour le déploiement
FROM nginx:alpine

COPY --from=build /frontend/dist/frontend-app/browser /usr/share/nginx/html

EXPOSE 80
