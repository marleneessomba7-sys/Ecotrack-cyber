# Runbook P4 - Perte des journaux

## Objectif

Restaurer la collecte et la centralisation des journaux.

---

## Détection

- Plus aucun log dans Kibana
- Dashboards incomplets
- Nouveaux événements absents

---

## Diagnostic

```bash
sudo systemctl status filebeat
sudo systemctl status logstash
sudo systemctl status elasticsearch
```

---

## Contention

Conserver les journaux locaux.

---

## Restauration

```bash
sudo systemctl restart filebeat
sudo systemctl restart logstash
sudo systemctl restart elasticsearch
```

---

## Validation

- Les journaux apparaissent dans Kibana.
- Les nouveaux événements sont visibles.
