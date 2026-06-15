# Documentation ECOTRACK

Ce dossier centralise la documentation technique et organisationnelle du projet
**ECOTRACK**, plateforme IoT de gestion intelligente des déchets urbains.
On y retrouve les décisions d'architecture, les procédures d'exploitation,
la politique de sécurité et les métriques de supervision.

## Structure du dossier

| Élément | Description |
|---|---|
| `ADR/` | Architecture Decision Records - décisions d'architecture justifiées et tracées |
| `runbooks/` | Procédures d'exploitation et de réponse à incident |
| `PSSI.md` | Politique de Sécurité des Systèmes d'Information |
| `metriques-production.md` | Indicateurs et métriques de supervision en production |

## Décisions d'architecture (ADR)

| ADR | Sujet |
|---|---|
| [ADR-001](ADR/ADR-001-pfsense.md) | pfSense - pare-feu / routeur central et segmentation VLAN |
| [ADR-002](ADR/ADR-002-suricata.md) | Suricata - détection d'intrusion (IDS/IPS) |
| [ADR-003](ADR/ADR-003-wazuh.md) | Wazuh - SIEM et corrélation des événements de sécurité |
| [ADR-004](ADR/ADR-004.md) | _(à compléter : sujet de l'ADR-004)_ |

## Runbooks

| Procédure | Objet |
|---|---|
| [P1 - Intrusion](runbooks/P1-intrusion.md) | Réponse à une intrusion détectée |
| [P2 - Panne VM](runbooks/P2-panne-vm.md) | Reprise après panne d'une machine virtuelle |
| [Runbook incident](runbooks/runbook-incident.md) | Procédure générale de gestion d'incident |

## Conventions

- **ADR** : contexte -> décision -> alternatives envisagées -> conséquences.
- **Runbooks** : procédures pas à pas, exécutables en condition réelle.
