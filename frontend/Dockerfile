# Étape 1 : Construire l'application React/Vue/Angular (ou autre)
FROM node:16 as build

WORKDIR /app

# Copier les fichiers `package.json` et `package-lock.json` depuis le dossier parent
COPY ../package.json ../package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Servir l'application avec un serveur web léger
FROM nginx:alpine

# Copier les fichiers construits dans le dossier de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]