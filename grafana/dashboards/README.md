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

### Activité Réseau DMZ

#### Objectif

Surveiller le trafic réseau entrant observé sur le serveur **ECO-PROXY** situé dans la zone DMZ.

#### Métrique utilisée

```promql
rate(node_network_receive_bytes_total{instance="10.10.1.10:9100"}[5m])
```

#### Description

Cette métrique mesure le débit de données reçues par le serveur ECO-PROXY sur une fenêtre glissante de 5 minutes.

Le graphique permet :

- d'observer l'activité réseau de la DMZ ;
- d'identifier les pics de trafic ;
- de détecter des comportements inhabituels ;
- de surveiller les services exposés vers les autres zones du réseau.

#### Résultat

Le panneau Grafana affiche l'évolution du trafic réseau reçu par ECO-PROXY en temps réel. Les variations observées correspondent aux échanges réseau générés par les services ECOTRACK et aux opérations de test réalisées durant le projet.

![Activité Réseau DMZ](https://github.com/marleneessomba7-sys/Ecotrack-cyber/blob/main/grafana/dashboards/Activit%C3%A9%20R%C3%A9seau.png?raw=true)
---

# 3. IoT Dashboard (iot.json)

### Pipeline IoT – Flux Capteurs → MQTT → Application → Base de données

#### Objectif

Visualiser le parcours complet des données IoT au sein de l'infrastructure ECOTRACK.

#### Composants surveillés

- ECO-MQTT : réception des données des capteurs
- ECO-APP : traitement des données
- ECO-DB : stockage des données

#### Description

Le graphique représente l'activité réseau observée sur les différents composants du pipeline IoT.

```text
Capteurs IoT
      ↓
   ECO-MQTT
      ↓
   ECO-APP
      ↓
   ECO-DB
```

Cette visualisation permet de vérifier que les données circulent correctement entre les différentes couches de l'architecture jusqu'à leur stockage final.

#### Résultat

Les échanges réseau observés démontrent le fonctionnement du pipeline IoT et la transmission des données depuis leur collecte jusqu'à leur stockage.

![Pipeline IoT](https://github.com/marleneessomba7-sys/Ecotrack-cyber/blob/main/grafana/dashboards/iot-pipeline.png?raw=true)

# Technologies utilisées

- Grafana
- Prometheus
- Node Exporter
- Suricata IDS
- pfSense
- Mosquitto MQTT
- Ubuntu Server

---


