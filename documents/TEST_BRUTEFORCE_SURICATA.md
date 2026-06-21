Test de détection d'une attaque par force brute SSH
Objectify
L'objectif de ce test est de vérifier que le système de détection d'intrusion Suricata est capable d'identifier une tentative de force brute sur le service SSH dans l'infrastructure ECOTRACK.
 Environnement de test
- IDS : Suricata
- Machine surveillée : ECO-SEC
- Machine de test : Windows PowerShell
- Port surveillé : 22 (SSH)

3. Procédure
Une série de connexions TCP successives a été effectuée vers le port SSH de la machine ECO-SEC afin de simuler une tentative de force brute.

La détection a ensuite été vérifiée dans le journal Suricata avec la commande :

-bash
sudo cat /var/log/suricata/fast.log

Résultats
Le journal Suricata affiche l'alerte suivante :
ECOTRACK - Bruteforce SSH détecté
Cette alerte confirme que la règle de détection fonctionne correctement.

Conclusion
Le test valide le bon fonctionnement de Suricata pour la détection des tentatives de force brute SSH. Les événements sont correctement enregistrés dans les journaux et pourront être exploités par les outils de supervision de l'infrastructure ECOTRACK.
