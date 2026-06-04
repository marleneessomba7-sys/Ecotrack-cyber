# Dashboards Grafana

\# Dashboards Grafana ECOTRACK



\## 3 dashboards obligatoires



\### 1. infra.json — Dashboard Infrastructure

Métriques : CPU, RAM, disque des 7 VMs

Alertes : CPU > 80%, disque > 90%, service down



\### 2. security.json — Dashboard Sécurité

Métriques : connexions refusées pfSense, alertes Suricata, Wazuh events

Alertes : bruteforce détecté, scan ports, injection SQL



\### 3. iot.json — Dashboard IoT

Métriques : volume MQTT (400 msg/min), latence capteurs, erreurs TLS

Alertes : capteur silencieux > 15 min, volume anormal



\## Métriques de production Sprint 8

\- Uptime : 99.7% (cible ≥ 99.5% ✅)

\- MTTD : 3 min 42s (cible < 5 min ✅)

\- Incidents P1 : 0 ✅

\- Conformité ANSSI : 47/50 ✅

