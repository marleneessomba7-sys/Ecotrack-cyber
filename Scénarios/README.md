# Installation et sauvegarde des scripts

Ce dossier regroupe les scripts d'installation, de configuration et de sauvegarde de l'infrastructure ECOTRACK.

## Prérequis
- Accès SSH aux 7 VM (pfSense, ECO-WEB, ECO-APP, ECO-DB, ECO-MON, ECO-MQTT, ECO-SEC)
- Ansible installé sur le bastion (ECO-MON)
- Droits sudo sur les serveurs cibles

## Installation
1. Cloner le dépôt sur le bastion ECO-MON :
   `git clone https://github.com/marleneessomba7-sys/Ecotrack-cyber.git`
2. Vérifier l'inventaire et les variables Ansible dans `ansible/`.
3. Lancer le déploiement :
   `ansible-playbook -i ansible/inventory ansible/site.yml`
4. Vérifier les services (Nginx, NodeJS, PostgreSQL, Mosquitto, Suricata, Prometheus, Grafana, ELK).

## Sauvegarde
Éléments sauvegardés :
- Configurations des services (pfSense, Nginx, Suricata, Mosquitto…)
- Base de données PostgreSQL (pg_dump)
- Certificats et clés (PKI EcotrackCA)
- Playbooks et inventaires Ansible

Exemples :
- Base : `pg_dump ecotrack > backups/ecotrack_$(date +%F).sql`
- Certificats : `tar czf backups/pki_$(date +%F).tgz pki/`

## Restauration
- Configurations : redéploiement via Ansible
- Base : `psql ecotrack < backups/ecotrack_AAAA-MM-JJ.sql`
- Certificats : restauration de l'archive puis redémarrage des services

## Scénarios couverts
- Panne serveur applicatif
- Panne serveur base de données
- Perte de configuration pfSense
- Défaillance du broker MQTT
