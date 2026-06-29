# Runbook P5 - Dashboard Grafana indisponible

## Objectif

Restaurer la supervision de l'infrastructure.

---

## Détection

- Dashboard inaccessible
- Graphiques absents
- Erreur HTTP

---

## Diagnostic

```bash
sudo systemctl status grafana-server
sudo systemctl status prometheus
```

Tester Prometheus :

```bash
curl http://localhost:9090
```

---

## Contention

Continuer la supervision directement depuis Prometheus.

---

## Restauration

```bash
sudo systemctl restart prometheus
sudo systemctl restart grafana-server
```

---

## Validation

- Dashboard Grafana accessible.
- Graphiques mis à jour.
- Supervision opérationnelle.
