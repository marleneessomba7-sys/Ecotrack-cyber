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
![Exécution du playbook](screenshots/playbook-execution.png)

