# Utiliser l'image Nginx pour servir les fichiers statiques
FROM nginx:latest

# Copier les fichiers HTML/CSS/JS dans le dossier par défaut de Nginx
COPY . /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
