\# Runbook P1 — Détection d'une intrusion



\## Déclencheur

Suricata déclenche une alerte → Alertmanager notifie Slack



\## Étapes de résolution

1\. Alertmanager envoie notification Slack #soc-alerts (< 5 min)

2\. Admin consulte Kibana pour analyser les logs

3\. Blocage manuel de l'IP dans pfSense (règle temporaire 24h)

4\. Vérification accès PostgreSQL, API et MQTT depuis l'IP bloquée

5\. Si compromission : isolation VM, snapshot, analyse forensique

6\. Rapport d'incident dans Confluence dans les 4 heures

7\. Revue post-incident sous 48h



\## Métriques

\- MTTD cible : < 5 minutes

\- MTTR cible : < 1 heure

