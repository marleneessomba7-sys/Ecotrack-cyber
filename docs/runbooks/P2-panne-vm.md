\# Runbook P2 — Panne d'un serveur critique



\## Déclencheur

Prometheus détecte service down → alerte Alertmanager < 2 min



\## Étapes de résolution

1\. Vérification automatique Keepalived (bascule VIP si DMZ)

2\. Connexion SSH via ECO-BASTION

3\. Diagnostic logs : journalctl -u docker + docker ps

4\. Tentative redémarrage : docker compose up -d

5\. Si échec : rollback image Docker stable (< 5 min Ansible)

6\. Restauration backup si perte données (RPO < 1h)

7\. Notification parties prenantes si RTO > 30 min



\## Métriques

\- RTO cible : < 4 heures

\- RPO cible : < 1 heure

