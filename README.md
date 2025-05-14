Une application backend construite avec [Node.js](http://nodejs.org) et le framework NestJS pour une API de cocktails scalable et efficace.
## Description
Ce projet est une API backend pour une application de cocktails, construite avec le framework [NestJS](https://github.com/nestjs/nest) et TypeScript.
## Prérequis
Avant de commencer, assurez-vous d'avoir installé les éléments suivants :
- **Node.js** : Version 16.x ou supérieure - [Télécharger Node.js](https://nodejs.org/)
- **Docker** : Nécessaire pour exécuter les conteneurs - [Installer Docker](https://www.docker.com/get-started)
- **Docker Compose** : Pour orchestrer les conteneurs - généralement inclus avec Docker Desktop
- **Prisma** : ORM utilisé pour la gestion de la base de données. Pour l'installer globalement :
``` bash
  npm install -g prisma
```
## Configuration de l'environnement
1. Créez un fichier à la racine du projet en vous basant sur le modèle `.env``.env.example`
2. Configurez les variables d'environnement selon vos besoins :
``` 
DATABASE_URL="postgres://yboost:password@localhost:5432/yboost"
BASE_URL='http://localhost:3000'
JWT_SECRET=votre_secret_jwt
ACCESS_TOKEN_EXPIRATION=1h
REFRESH_TOKEN_EXPIRATION=7d
RESET_TOKEN_EXPIRATION=15m
PORT=3000
```
## Installation
``` bash
# Installation des dépendances
$ npm install
```
## Démarrage avec Docker
``` bash
# Démarrer la base de données PostgreSQL avec Docker
$ docker compose up -d

# Pour arrêter et supprimer les conteneurs
$ docker compose down
```
Le fichier configure un conteneur PostgreSQL avec les paramètres suivants : `docker-compose.yml`
- **Utilisateur** : yboost
- **Mot de passe** : password
- **Base de données** : yboostdb
- **Port** : 5432 (accessible sur l'hôte)

## Démarrage de l'application
``` bash
# Mode développement
$ npm run start

# Mode développement avec rechargement automatique
$ npm run start:dev

# Mode production
$ npm run start:prod
```
## Tests
``` bash
# Tests unitaires
$ npm run test

# Tests e2e
$ npm run test:e2e

# Test de couverture
$ npm run test:cov
```
## Structure du projet
Le projet suit l'architecture modulaire de NestJS et utilise Prisma comme ORM pour interagir avec la base de données PostgreSQL.
## API Documentation
La documentation de l'API est disponible via Swagger UI à l'adresse suivante une fois l'application lancée :
``` 
http://localhost:3000/api
```
## Déploiement
Pour déployer l'application en production :
1. Assurez-vous que toutes les variables d'environnement sont correctement configurées
2. Utilisez Docker pour construire et déployer l'application complète :
``` bash
# Construire et démarrer tous les services
$ docker compose up -d --build
```
## Contribution
Les contributions sont les bienvenues ! Veuillez suivre les conventions de code et les pratiques de développement établies pour ce projet.
## Licence
Ce projet est sous licence [MIT](LICENSE).
