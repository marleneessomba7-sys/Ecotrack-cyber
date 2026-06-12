# Suricata IDS – ECOTRACK

## Objectif

Suricata est déployé sur le serveur **ECO-SEC** afin d'assurer la surveillance du trafic réseau de l'infrastructure ECOTRACK.

Le rôle de Suricata est de détecter les activités suspectes, les tentatives d'intrusion et certains comportements anormaux pouvant affecter les différentes zones du réseau :

- DMZ
- LAN
- Management (MGT)
- IoT

---

## Architecture de sécurité

Le serveur **ECO-SEC** centralise la détection des événements de sécurité et collecte les alertes générées par Suricata.

Flux surveillés :

```text
Internet
   │
pfSense
   │
ECO-PROXY (DMZ)
   │
LAN (APP / DB)
   │
ECO-SEC (Suricata IDS)
```

---

## Règles personnalisées ECOTRACK

Les règles suivantes ont été créées afin de répondre aux besoins de sécurité du projet.

| SID | Détection | Description |
|------|------------|------------|
| 1000001 | SSH Bruteforce | Détection de connexions SSH répétées |
| 1000002 | API Bruteforce | Détection de tentatives répétées d'authentification API |
| 1000003 | Port Scan | Détection d'un scan réseau effectué avec Nmap |
| 1000004 | SQL Injection | Détection de mots-clés caractéristiques d'une injection SQL |
| 1000005 | Trafic IoT Anormal | Détection d'un volume inhabituel de trafic MQTT |

Les règles sont stockées dans :

```text
local.rules
```

---

## Validation de l'installation

Vérification du service :

```bash
sudo systemctl status suricata
```
Résultat attendu :

```text
active (running)
```
![Test Nmap](https://github.com/marleneessomba7-sys/Ecotrack-cyber/blob/main/suricata/ssh-detection.png?raw=true)
---

## Tests réalisés

### Test de connexion SSH

Depuis une machine du réseau :

```bash
ssh fakeuser@10.10.3.20
```

Résultat observé :

```text
SSH connection detected
```

dans :

```bash
/var/log/suricata/fast.log
```
### Résultat du test SSH
![Test Nmap](https://github.com/marleneessomba7-sys/Ecotrack-cyber/blob/main/suricata/ssh-detection.png?raw=true)

La tentative de connexion SSH a été détectée et enregistrée par Suricata dans le journal fast.log.

### Test de scan réseau

Commande utilisée :

```bash
sudo nmap -sS -T4 -p- 10.10.3.20
```

## Exemple d'exécution
![Test Nmap](https://github.com/marleneessomba7-sys/Ecotrack-cyber/blob/main/suricata/nmap-test.png?raw=true)


Objectif :

- Simuler une phase de reconnaissance réseau.
- Vérifier la capacité de Suricata à détecter un scan de ports.

---

## Journalisation

Les alertes générées sont enregistrées dans :

```text
/var/log/suricata/fast.log
/var/log/suricata/eve.json
```

Consultation rapide :

```bash
sudo tail -f /var/log/suricata/fast.log
```

---

## Synchronisation temporelle

Toutes les machines de l'infrastructure ECOTRACK utilisent le fuseau horaire :

```text
Europe/Paris (CEST)
```

Cette synchronisation garantit la cohérence :

- des journaux système ;
- des alertes Suricata ;
- des métriques Prometheus ;
- des tableaux de bord Grafana.

Vérification :

```bash
ansible all -i ~/inventory.ini -a "date"
```

---

## Conclusion

L'intégration de Suricata permet à ECOTRACK de disposer d'une capacité de détection d'intrusion centralisée et d'une visibilité accrue sur les activités réseau. Les règles personnalisées et les tests réalisés démontrent la capacité du système à identifier plusieurs scénarios d'attaque courants dans un environnement d'entreprise.

