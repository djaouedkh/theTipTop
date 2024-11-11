# Dockerfile pour le front-end Angular
FROM node:18 AS build

WORKDIR /frontend

COPY package*.json ./

# Augmenter le délai d'attente de npm et installer les dépendances
RUN npm config set fetch-timeout 60000 && npm config set fetch-retries 5 && npm install


COPY . .

ARG BUILD_COMMAND=build

RUN $BUILD_COMMAND

# Utiliser un serveur léger comme `http-server`
FROM node:18
RUN npm install -g http-server

WORKDIR /usr/src/app
COPY --from=build /frontend/dist/frontend-app/browser .

EXPOSE 80
CMD ["http-server", "-p", "80"]
