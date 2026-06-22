# Configuration Cynthia - ECO-APP

## Présentation

ECO-APP est le serveur applicatif principal de la plateforme ECOTRACK.

- VM : ECO-APP
- Adresse IP : 10.10.2.10
- Zone : LAN (10.10.2.0/24)
- Technologie : Node.js
- API REST sécurisée

## Authentification

- JWT (JSON Web Token)
- RBAC (Role Based Access Control)

## Base de données

- PostgreSQL
- Hôte : 10.10.2.30
- Port : 5432
- Base : ecotrack

## Cache

- Redis
- Hôte : 10.10.2.30
- Port : 6379

## Dépendances principales

- Express
- PostgreSQL (pg)
- Redis
- JWT
- bcryptjs
- dotenv

## Port applicatif

- TCP 3000

## Sécurité

- Authentification JWT
- Contrôle d'accès RBAC
- Communications protégées par TLS dans l'architecture ECOTRACK
