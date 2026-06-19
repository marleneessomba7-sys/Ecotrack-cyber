# ADR-004 — Choix entre HAProxy et Nginx (couche proxy / répartition de charge)

Statut : Accepté
Date : 2026-06-18
Décideurs : Marlène ESSOMBA, Cynthia IRABARUTA, Jovani ZAMBOU

## Contexte
En zone DMZ, ECO-PROXY (10.10.1.10) doit assurer la répartition de charge vers
le backend ECO-APP (Node.js, port 3000), la haute disponibilité (VIP flottante
10.10.1.100), la terminaison TLS 1.3 et la protection applicative (WAF).
HAProxy et Nginx couvrent des fonctions qui se recouvrent ; il fallait décider
lequel assure la répartition de charge et la haute disponibilité.

## Décision
Les deux solutions sont retenues avec des rôles complémentaires :
- HAProxy : répartition de charge L4/L7, haute disponibilité via Keepalived
  (VIP 10.10.1.100, actif/passif), terminaison TLS 1.3 en frontal.
- Nginx : reverse proxy et service du contenu statique (frontend ECO-WEB),
  hébergement du WAF ModSecurity (OWASP CRS).
HAProxy est préféré à Nginx pour la fonction de répartition de charge et de HA.

## Justification
- HAProxy est spécialisé load balancing : algorithmes avancés (leastconn),
  health checks fins, métriques détaillées, intégration native avec Keepalived.
- Nginx excelle comme serveur web / reverse proxy et porte le WAF ModSecurity,
  que HAProxy ne gère pas nativement.
- Séparer les rôles applique la responsabilité unique et la défense en profondeur.

## Conséquences
Positives : bascule HA < 30 s via Keepalived ; WAF mature via Nginx + ModSecurity ;
terminaison TLS centralisée ; chaque composant utilisé pour ce qu'il fait de mieux.
Négatives : deux composants à maintenir et superviser sur ECO-PROXY ; chaînage
HAProxy -> Nginx -> backend sensible à une mauvaise config (cf. incident 503 causé
par un backend pointé sur ECO-WEB au lieu d'ECO-APP:3000).

## Alternatives écartées
- Nginx seul (LB + WAF + statique) : load balancing et HA moins riches, couplage
  Keepalived moins naturel.
- HAProxy seul : pas de WAF natif (ModSecurity non supporté), protection L7
  insuffisante.
