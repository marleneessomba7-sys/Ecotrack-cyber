# ECOTRACK – Infrastructure IoT Sécurisée

## Objectif du projet

ECOTRACK est une infrastructure IoT sécurisée permettant la collecte, le traitement, le stockage et la supervision de données issues d'équipements connectés.

Le projet met en œuvre une architecture segmentée intégrant des mécanismes de sécurité réseau, de supervision, de journalisation centralisée et d'automatisation.

---

# Architecture globale

L'infrastructure est composée des machines virtuelles suivantes :

| VM       | Rôle principal                           |
| -------- | ---------------------------------------- |
| pfSense  | Pare-feu, routage, filtrage réseau       |
| ECO-WEB  | Serveur Web Nginx                        |
| ECO-APP  | Backend NodeJS / Express                 |
| ECO-DB   | PostgreSQL + Redis                       |
| ECO-MON  | Prometheus, Grafana, ELK, Ansible        |
| ECO-MQTT | Broker MQTT sécurisé                     |
| ECO-SEC  | IDS/IPS Suricata et supervision sécurité |

---

# Segmentation réseau

| VLAN    | Nom | Fonction                                |
| ------- | --- | --------------------------------------- |
| VLAN 10 | DMZ | Services exposés                        |
| VLAN 20 | LAN | Services applicatifs et base de données |
| VLAN 30 | MGT | Administration et supervision           |
| VLAN 40 | IoT | Équipements et capteurs                 |

Cette segmentation permet de limiter les flux réseau et d'appliquer le principe de défense en profondeur.

```
## Architecture schematisée
```
![Architecture](https://github.com/marleneessomba7-sys/Ecotrack-cyber/blob/main/Architecture%20globale.drawio.png?raw=true) 

---

# Sécurité réseau

## pfSense

* Routage inter-VLAN
* Filtrage des flux
* NAT
* Journalisation des événements réseau

## HAProxy

* Reverse Proxy
* Point d'entrée unique des services publiés
* Répartition et contrôle des accès applicatifs

## Chiffrement

* OpenSSL déployé sur les serveurs
* Infrastructure à certificats X.509
* TLS pour les services nécessitant une communication sécurisée

---

# Infrastructure Web

## ECO-WEB

Technologies déployées :

* Nginx
* OpenSSL
* SSH
* UFW
* Node Exporter

Fonctions :

* Publication des services Web
* Hébergement des composants frontaux
* Journalisation des accès

---

# Infrastructure Applicative

## ECO-APP

Technologies déployées :

* NodeJS
* Express
* PM2
* JWT
* bcrypt
* PostgreSQL Driver
* Redis Client

Fonctions :

* API REST ECOTRACK
* Authentification des utilisateurs
* Gestion des sessions
* Traitement des données IoT

Port principal :

* TCP 3000

---

# Infrastructure Base de Données

## ECO-DB

Technologies déployées :

* PostgreSQL 14
* PostGIS
* Redis
* OpenSSL
* Node Exporter

Fonctions :

* Stockage des données métier
* Gestion des données géographiques
* Cache applicatif Redis

Ports principaux :

* PostgreSQL : 5432/TCP
* Redis : 6379/TCP

---

# Infrastructure MQTT

## ECO-MQTT

Technologies déployées :

* Mosquitto
* OpenSSL
* nftables
* rsyslog

Fonctions :

* Réception des données des capteurs
* Publication MQTT
* Gestion des abonnements

Sécurisation :

* Authentification MQTT
* TLS
* Contrôle des accès

---

# Supervision et Observabilité

## ECO-MON

Technologies déployées :

* Prometheus
* Grafana
* Elasticsearch
* Kibana
* Ansible

Fonctions :

* Collecte des métriques
* Centralisation des journaux
* Visualisation des performances
* Déploiement automatisé

Services :

* Prometheus : 9090
* Grafana : 3000
* Elasticsearch : 9200
* Kibana : 5601

---

# Détection et Réponse aux Incidents

## ECO-SEC

Technologies déployées :

* Suricata IDS/IPS
* Suricata Update
* nftables
* rsyslog

Fonctions :

* Détection des attaques réseau
* Analyse du trafic
* Gestion des signatures
* Surveillance de sécurité

Exemples de détection :

* Scan réseau
* Tentatives de brute force
* Activités suspectes
* Règles personnalisées ECOTRACK

---

# Supervision

L'infrastructure utilise :

* Node Exporter
* Prometheus
* Grafana
* Elasticsearch
* Kibana

Les tableaux de bord permettent de suivre :

1. Infrastructure système
2. Services applicatifs
3. Événements de sécurité
4. Activité IoT

---

# Automatisation

L'automatisation est assurée par :

* Ansible
* Playbooks reproductibles
* Configuration centralisée

Fonctions :

* Déploiement des serveurs
* Configuration des services
* Application des politiques de sécurité
* Maintenance de l'infrastructure

---

# Sauvegarde et Continuité d'Activité

Des mécanismes de sauvegarde ont été prévus et partiellement mis en œuvre au cours du projet.

Éléments sauvegardés ou exportés :

* Configurations des services principaux
* Base de données PostgreSQL
* Certificats et clés de l'infrastructure
* Playbooks et fichiers de configuration Ansible

Ces sauvegardes permettent de faciliter la restauration des services en cas d'incident ou de perte de configuration.

Scénarios couverts :

* Panne serveur applicatif
* Panne serveur base de données
* Perte de configuration pfSense
* Défaillance du broker MQTT

---

# Technologies principales

* pfSense
* Nginx
* NodeJS
* Express
* PostgreSQL
* Redis
* Mosquitto
* Prometheus
* Grafana
* Elasticsearch
* Kibana
* Suricata
* Ansible
* OpenSSL

---

# Conclusion

ECOTRACK constitue une infrastructure IoT sécurisée intégrant les principales briques d'une architecture moderne :

* segmentation réseau ;
* supervision centralisée ;
* journalisation ;
* détection d'intrusion ;
* sécurisation des flux ;
* automatisation ;
* continuité de service.

Le projet applique les principes de défense en profondeur, de moindre privilège et de supervision continue afin d'assurer la disponibilité, l'intégrité et la confidentialité des services.
