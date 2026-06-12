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
<img width="948" height="151" alt="image" src="https://github.com/user-attachments/assets/acbaf8ef-ba36-4de9-85fe-d9d8d81541df" />

