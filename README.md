Déploiement d'un Système d'Informations (DeploiementdunSI)
    📋 Description du Projet
        Ce projet permet de récupérer des variables d’un automate via le protocole Modbus Serial sur un réseau local, de les stocker dans une base de données, et de les afficher sur une interface web. Il a été conçu pour permettre aux utilisateurs de configurer et superviser facilement les données collectées depuis les automates.
________________________________________
    ⚙️ Fonctionnalités
    1. Connexion à l'automate et récupération des variables
        •	L'utilisateur peut entrer les informations suivantes dans l'interface web :
            o	IP de l'automate
            o	Adresse de la variable dans l'automate
            o	Nom de la variable
        •	Après avoir cliqué sur "Récupérer les données", le système se connecte à l'automate via Modbus pour collecter la donnée correspondant à l’adresse fournie.
    2. Stockage des données
        •	Les variables récupérées sont stockées dans une base de données MariaDB pour garantir leur persistance.
    3. Affichage des données
        •	Une interface web (accessible sur un navigateur) permet :
            o	De consulter les variables stockées sous forme de tableau.
            o	De visualiser les informations essentielles : ID, nom, adresse IP, registre, fréquence, unité, et la dernière lecture.
________________________________________
    🐳 Support Docker
    Le projet est entièrement conteneurisé avec Docker et Docker Compose :
        •	Backend : Gère la connexion à la base de données, la communication avec les automates, et expose des API pour l’interface web.
        •	Frontend : Fournit une interface utilisateur simple pour interagir avec les automates et consulter les données.
        •	MariaDB : Base de données pour stocker les variables et les lectures.
    Les conteneurs backend, frontend et la base de données MariaDB fonctionnent correctement en Docker. Ils ont été testés avec succès en local. Cependant, la partie communication avec l’automate Modbus n’a pas encore été testée.
________________________________________
    🛠️ Structure du Projet
        •	backend/ : Gère les API pour la connexion Modbus, l’insertion des données dans la base, et l’interfaçage avec le frontend.
        •	frontend/ : Contient les fichiers HTML, CSS et JavaScript pour l'interface utilisateur.
        •	docker-compose.yml : Définit la configuration des services Docker (frontend, backend, base de données).
        •	index.js : Point d'entrée principal pour le backend.
        •	modbus-client.js : Gestion des communications Modbus.
        •	database.js : Gestion des interactions avec la base de données.
________________________________________
    🧪 Tests
        •	Backend et Frontend : Testés avec succès en local et via Docker.
        •	Base de Données : Les interactions avec MariaDB ont été validées.
        •	Communication Modbus : Non testée à ce jour en raison d’un accès limité à un automate.
________________________________________
    💡 Améliorations Futures
        1.	Tester et valider la communication avec un automate Modbus réel.
        2.	Proposer une interface utilisateur plus riche avec des graphiques et une gestion avancée des variables.
        3.	Sécuriser les données échangées via HTTPS.
