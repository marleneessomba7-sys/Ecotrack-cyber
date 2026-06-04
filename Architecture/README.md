# Architecture ECOTRACK

\# Architecture ECOTRACK – Cyber \& Réseaux



\## 1. Contenu du dossier

\- Schéma réseau 4 zones (DMZ / LAN / MGT / IoT)

\- Plan d’adressage IP (7 machines virtuelles)

\- Diagramme Gantt sur 16 semaines

\- Architecture Decision Records (ADR)

\- Documentation technique (services, rôles, flux)

\- Scripts et configurations (réseau, sécurité, supervision)



\## 2. Objectifs de l’architecture

\- Séparer les zones critiques pour limiter les risques

\- Assurer la haute disponibilité des services ECOTRACK

\- Mettre en place une sécurité réseau conforme aux bonnes pratiques

\- Faciliter la supervision et la maintenance

\- Préparer l’infrastructure pour les futures évolutions



\## 3. Description des zones réseau

\### 🔹 DMZ

\- Héberge les services exposés (API Gateway, Reverse Proxy)

\- Filtrage strict via firewall



\### 🔹 LAN

\- Serveurs internes ECOTRACK

\- Base de données

\- Services applicatifs



\### 🔹 MGT (Management)

\- Accès administrateurs

\- Supervision (Grafana, Wazuh, Prometheus)

\- Sauvegardes



\### 🔹 IoT

\- Capteurs et objets connectés

\- Réseau isolé avec règles de flux contrôlées



\## 4. Plan d’adressage (exemple)

| Zone | Sous-réseau | Rôle |

|------|-------------|------|

| DMZ | 10.0.10.0/24 | Services exposés |

| LAN | 10.0.20.0/24 | Backend ECOTRACK |

| MGT | 10.0.30.0/24 | Admin \& supervision |

| IoT | 10.0.40.0/24 | Capteurs |



\## 5. ADR (Architecture Decision Records)

\- ADR-001 : Choix de la segmentation réseau

\- ADR-002 : Choix du firewall

\- ADR-003 : Choix du système de supervision

\- ADR-004 : Choix du stockage et des sauvegardes



\## 6. Diagrammes

\- Diagramme réseau (PNG / PDF)

\- Diagramme Gantt (16 semaines)

\- Diagramme de flux (DFD niveau 0 et 1)



\## 7. Notes

\- Tous les fichiers doivent être versionnés dans Git

\- Les schémas doivent être exportés en PNG + source (Draw.io)

\- Le README doit être mis à jour à chaque modification majeure



