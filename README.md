# ECOTRACK – Infrastructure Sécurisée IoT

## 🔐 Objectif du projet
ECOTRACK est une infrastructure sécurisée permettant la collecte, la transmission, la supervision et l’analyse de données IoT en temps réel.  
Le projet intègre une architecture réseau segmentée, une chaîne de sécurité complète, un SIEM, un IDS, une haute disponibilité et une automatisation complète via Ansible.

---

## 🧱 Architecture globale
- pfSense (VLANs, firewall, pfBlockerNG)
- Suricata IDS (détection temps réel)
- Wazuh SIEM (corrélation logs)
- MQTT TLS + certificats X.509
- HAProxy + Keepalived (haute disponibilité)
- PostgreSQL réplication streaming
- Grafana (3 dashboards)
- Ansible (déploiement 7 VMs)

---

## 🛰️ Segmentation réseau (pfSense + VLANs)
| VLAN | Nom | Rôle |
|------|------|------|
| 10 | DMZ | Services exposés (MQTT, HAProxy) |
| 20 | LAN | Services internes (API, DB, SIEM) |
| 30 | MGT | Administration (Ansible, Suricata) |
| 40 | IoT | Capteurs isolés |

---

## 🔐 Sécurisation des flux
- TLS 1.3 obligatoire  
- Certificats X.509 pour authentification IoT  
- MQTT sécurisé (port 8883)  
- Filtrage IP malveillantes (pfBlockerNG)  

---

## 🛡️ Détection & Monitoring
### Suricata IDS
- Détection brute-force  
- Détection scans  
- Règles custom ECOTRACK  

### Wazuh SIEM
- Corrélation logs 7 VMs  
- Alertes en temps réel  
- Intégration Suricata  

### Grafana
- Dashboard Infra  
- Dashboard Sécurité  
- Dashboard IoT  

---

## ⚙️ Automatisation (Ansible)
- Déploiement des 7 VMs  
- Playbooks reproductibles  
- Configuration automatique des services  

---

## 🧬 Haute disponibilité
- HAProxy (load balancing)
- Keepalived VRRP (failover automatique)
- PostgreSQL réplication streaming (RPO < 1h)

---

## 📚 Gestion de projet
- 18 User Stories  
- 7 EPICS  
- 50+ TASKS  
- ADR (décisions techniques)  
- Runbooks (procédures incidents)  
- Sprints 1 → 8  
- Labels : MUST / SHOULD / COULD / Sprint / Rôle / ADR / Runbook  

---

## 📦 Scripts d’automatisation GitHub CLI
Scripts permettant de créer automatiquement :
- Labels  
- EPICS  
- TASKS  
- ADR  
- RUNBOOKS  

---

## 🧾 Documentation
- Architecture réseau  
- Architecture sécurité  
- ADR  
- Runbooks  
- Schémas (pfSense, VLAN, IoT, SIEM)  

---

## 🏁 Conclusion
ECOTRACK fournit une infrastructure IoT sécurisée, supervisée, automatisée et conforme aux bonnes pratiques ANSSI.  
Le projet combine réseau, sécurité, monitoring, haute disponibilité et DevOps dans une architecture cohérente et professionnelle.

