\# ADR-002 : Choix Suricata comme IDS/IPS



Date: 2026-01-15

Statut: Accepté



\## Décision

Suricata 7.x sur ECO-SEC



\## Justification

\- Score : Suricata 44/50 vs Snort 33/50

\- Multi-threading natif

\- Seul IDS avec décodeur MQTT natif pour VLAN 40

\- Export EVE JSON vers ELK natif



\## Conséquences

5 règles personnalisées à créer Sprint 3

