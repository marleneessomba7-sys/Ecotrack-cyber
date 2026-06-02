# Ecotrack-cyber – Infrastructure Cyber & Réseau
Plateforme IoT sécurisée pour la gestion intelligente des déchets urbains.

🔐 Objectifs
Sécuriser l’infrastructure IoT (2000 capteurs)

Superviser l’ensemble du système (Wazuh, Grafana, Prometheus)

Détecter les intrusions (Suricata IDS/IPS)

Assurer la haute disponibilité (pfSense, HAProxy, VLANs)

🧱 Architecture
DMZ (VLAN 10)

LAN Applicatif (VLAN 20)

Management / Monitoring (VLAN 30)

IoT (VLAN 40)

📂 Contenu du dépôt
architecture/ → schémas réseau

configurations/ → fichiers pfSense, Suricata, Wazuh, Prometheus

scripts/ → scripts d’installation

documentation/ → rapports 

🚀 Stack technique

pfSense

Wazuh SIEM

Prometheus + Grafana

Docker

PostgreSQL + PostGIS

MQTT Mosquitto
schéma réseau

schéma VLAN

schéma SIEM

schéma Gantt

schéma pipeline CI/CD
