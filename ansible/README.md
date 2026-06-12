# Ansible – Automatisation ECOTRACK

## Objectif

Ansible est utilisé pour administrer l'infrastructure ECOTRACK depuis le serveur de supervision ECO-MON.

L'objectif est de centraliser les opérations d'administration et de vérifier rapidement l'état des différentes machines de l'infrastructure.

---

## Architecture Ansible

```text
ECO-MON (10.10.3.10)
        │
        ├── ECO-PROXY (10.10.1.10)
        ├── ECO-APP   (10.10.2.10)
        ├── ECO-WEB   (10.10.2.20)
        ├── ECO-DB    (10.10.2.30)
        ├── ECO-SEC   (10.10.3.20)
        └── ECO-MQTT  (10.10.4.10)
```

---

## Inventaire

Les hôtes administrés sont définis dans :

```text
inventory.ini
```

Les machines sont regroupées par zones réseau :

- DMZ
- LAN
- MGT
- IoT

---

## Prérequis

Pour qu'Ansible puisse administrer une machine :

- La VM doit être allumée.
- Le réseau et le routage doivent être opérationnels (pfSense actif).
- Le service SSH doit être démarré.
- Les clés SSH doivent être configurées.

Ces prérequis sont vérifiés à l'aide de :

```bash
ansible all -i inventory.ini -m ping
```

## Vérification de connectivité

```bash
ansible all -i inventory.ini -m ping
```

Résultat attendu :

```text
SUCCESS => pong
```

Cette commande permet de vérifier que toutes les machines sont joignables via SSH.

---

## Identification des serveurs

```bash
ansible all -i inventory.ini -a "hostname"
```

Cette commande permet d'afficher le nom de chaque machine distante.

---

## Vérification de disponibilité

```bash
ansible all -i inventory.ini -a "uptime"
```

Cette commande permet de vérifier rapidement :

- le temps de fonctionnement
- la charge système
- l'état général des serveurs

---

## Bénéfices

- Administration centralisée
- Gain de temps
- Réduction des erreurs manuelles
- Gestion simultanée de plusieurs serveurs
- Base pour une automatisation future via des playbooks
