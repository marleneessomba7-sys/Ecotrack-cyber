### check-infrastructure.yml

Playbook utilisé pour vérifier l'état général de l'infrastructure ECOTRACK.

Fonctions :

- Identification des serveurs
- Vérification du temps de fonctionnement
- Vérification de l'espace disque
- Centralisation des résultats sur ECO-MON

Commande :

```bash
ansible-playbook -i ../inventory.ini check-infrastructure

## Exemple d'exécution
![Exécution du playbook](Ansible%20playbook.png)

### Résultat

Le playbook a été exécuté avec succès sur l'ensemble des serveurs ECOTRACK :

- ECO-PROXY
- ECO-APP
- ECO-WEB
- ECO-DB
- ECO-SEC
- ECO-MQTT

Les informations collectées incluent :
- le nom de la machine ;
- le temps de fonctionnement (uptime) ;
- l'utilisation de l'espace disque.
