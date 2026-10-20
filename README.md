# ECOTRACK V2 — Backend (socle plancher du Sprint 0)

API Node.js / Express (même technologie que le backend V1) qui couvre les 3 routes cœur exigées par le CDC V2 :

| Route | Méthode | Rôle | Protection |
|---|---|---|---|
| `/api/conteneurs` | GET | Liste des conteneurs avec leur dernière mesure | — |
| `/api/mesures` | POST | Ingestion d'une mesure `{"conteneur":"001","remplissage":72}` | En-tête `x-api-key` |
| `/api/stats/zones` | GET | Remplissage moyen et conteneurs à collecter (≥ 80 %) par zone | — |
| `/health` | GET | État de l'API, de la base et de MQTT | — |

Les capteurs publient aussi leurs mesures en MQTT (TLS, port 8883) sur `ecotrack/conteneur/<code>` ; le backend s'y abonne et les enregistre en base.

## Architecture

```
Capteurs (VLAN 10) --MQTT TLS 8883--> Mosquitto (VLAN 20)
                                          |
                          Backend (VLAN 30) abonne
                                          |
                               PostgreSQL 5432 (VLAN 40)
```

## Installation dans le conteneur `app` (10.10.30.10)

```bash
apt update && apt full-upgrade -y && apt install -y nodejs npm git
git clone https://github.com/marleneessomba7-sys/Ecotrack-cyber /opt/ecotrack
cd /opt/ecotrack/backend
npm install --omit=dev
cp .env.example .env && chmod 600 .env && nano .env
psql -h 10.10.40.10 -U ecotrack -d ecotrack -f schema.sql
```

Certificat de l'autorité MQTT (depuis le Shell Proxmox) :

```bash
pct pull 120 /etc/mosquitto/certs/ca.crt /root/ca.crt
pct push 130 /root/ca.crt /opt/ecotrack/backend/ca.crt
```

Service système (démarrage automatique) :

```bash
useradd --system --no-create-home ecotrack
chown -R ecotrack: /opt/ecotrack/backend
cp deploy/ecotrack-api.service /etc/systemd/system/
systemctl daemon-reload && systemctl enable --now ecotrack-api
journalctl -u ecotrack-api -n 20
```

## Tests

```bash
curl -s http://10.10.30.10:3000/health
curl -s http://10.10.30.10:3000/api/conteneurs
curl -s http://10.10.30.10:3000/api/stats/zones
curl -s -X POST http://10.10.30.10:3000/api/mesures \
  -H 'content-type: application/json' -H 'x-api-key: VOTRE_CLE' \
  -d '{"conteneur":"002","remplissage":64}'
```

## Sécurité

- Le fichier `.env` contient des secrets : il n'est jamais publié (voir `.gitignore`).
- Requêtes SQL paramétrées (pas d'injection SQL), validation des entrées (code et remplissage 0–100).
- Connexion MQTT en TLS avec vérification du certificat du broker.
- Service exécuté par un utilisateur système dédié, avec durcissement systemd.
- Évolutions prévues : authentification JWT (comme en V1), HTTPS via le reverse proxy, limitation de débit.
