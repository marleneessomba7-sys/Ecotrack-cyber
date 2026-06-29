# Runbook P1 — Détection d'une intrusion

## Déclencheur

Une alerte de sécurité est générée par **Suricata**, puis transmise par **Alertmanager**, qui envoie une notification sur le canal **Slack `#soc-alerts`**.

---

## Étapes de résolution

1. Réception de la notification Alertmanager sur **Slack `#soc-alerts`** (objectif : moins de 5 minutes).
2. Analyse des événements dans **Kibana** afin d'identifier la nature de l'attaque, l'adresse IP source et les systèmes concernés.
3. Blocage manuel de l'adresse IP malveillante dans **pfSense** à l'aide d'une règle temporaire de **24 heures**.
4. Vérification des accès aux services critiques :
   - PostgreSQL
   - API ECOTRACK
   - Broker MQTT
5. En cas de compromission confirmée :
   - Isoler la machine virtuelle concernée.
   - Réaliser un snapshot.
   - Effectuer une analyse forensique.
6. Rédiger le rapport d'incident dans **Confluence** dans un délai maximal de **4 heures**.
7. Organiser une revue post-incident dans les **48 heures** afin d'identifier les causes, les impacts et les actions correctives.

---

## Métriques

| Indicateur | Objectif |
|------------|----------|
| **MTTD** (Mean Time To Detect) | < 5 minutes |
| **MTTR** (Mean Time To Respond) | < 1 heure |
