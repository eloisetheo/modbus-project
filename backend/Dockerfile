# Utiliser une image Node.js officielle
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier uniquement les fichiers de configuration de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Exposer le port que l'application utilise
EXPOSE 3000

# Démarrer l'application
CMD ["node", "main.js"]
