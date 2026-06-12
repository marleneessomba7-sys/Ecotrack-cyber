# Dashboards Grafana ECOTRACK

L'infrastructure ECOTRACK est supervisée à l'aide de Grafana connecté à Prometheus et aux différents services de monitoring.

Les tableaux de bord permettent de centraliser la supervision de l'infrastructure, des services IoT et des composants de sécurité.

---

# 1. Infrastructure Dashboard (infra.json)

## Objectif

Surveiller l'état général de l'infrastructure ECOTRACK et garantir la disponibilité des services.

## Métriques supervisées

- Disponibilité des serveurs (24h)
- Nombre de machines opérationnelles
- Utilisation CPU
- Utilisation mémoire (RAM)
- Utilisation disque
- Activité réseau

## Serveurs supervisés

- ECO-PROXY
- ECO-APP
- ECO-WEB
- ECO-DB
- ECO-MON
- ECO-SEC
- ECO-MQTT

## Disponibilité des serveurs

Cette métrique est calculée à partir des données collectées par Prometheus :

```promql
avg_over_time(up[24h]) * 100
```

Elle permet de mesurer le pourcentage de disponibilité observé sur les dernières 24 heures.

Les valeurs inférieures à 100 % correspondent aux opérations de maintenance, redémarrages ou interruptions réalisées durant les phases de test du projet.

![Infrastructure Dashboard](https://github.com/marleneessomba7-sys/Ecotrack-cyber/blob/main/grafana/dashboards/Disponibilit%C3%A9.png?raw=true)

---

# 2. Security Dashboard (security.json)

## Objectif

Superviser les composants de sécurité déployés dans l'infrastructure ECOTRACK.

## Éléments supervisés

- pfSense
- Suricata IDS
- Activité réseau DMZ
- Activité réseau Management
- Connexions TCP
- Événements de sécurité

## Tests de sécurité réalisés

### Détection SSH

Simulation d'une connexion SSH vers un serveur ECOTRACK :

```bash
ssh fakeuser@10.10.3.20
```

Résultat :

- Connexion détectée par Suricata
- Journalisation dans `fast.log`

### Détection de scan réseau

Simulation d'une reconnaissance réseau :

```bash
sudo nmap -sS -T4 -p- 10.10.3.20
```

Résultat :

- Activité réseau observée
- Génération d'événements de sécurité

![Security Dashboard](https://github.com/marleneessomba7-sys/Ecotrack-cyber/blob/main/grafana/dashboards/Activit%C3%A9%20R%C3%A9seau.png?raw=true)

---

# 3. IoT Dashboard (iot.json)

## Objectif

Superviser le traitement des données IoT au sein de l'infrastructure ECOTRACK.

## Éléments supervisés

- Broker MQTT
- Activité du serveur MQTT
- Flux réseau MQTT
- Pipeline de traitement des données
- Serveurs applicatifs et base de données

## Flux surveillé

```text
Capteurs IoT
      ↓
   MQTT
      ↓
  ECO-APP
      ↓
  ECO-DB
```

Le tableau de bord permet de suivre le cheminement des données depuis leur réception jusqu'à leur stockage.

![IoT Dashboard](iot-dashboard.png)

---

# Technologies utilisées

- Grafana
- Prometheus
- Node Exporter
- Suricata IDS
- pfSense
- Mosquitto MQTT
- Ubuntu Server

---


