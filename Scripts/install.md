\# Scripts d'installation ECOTRACK



\## Déploiement complet en 1 commande

```bash

ansible-playbook -i ansible/inventory/hosts.yml \\

&#x20; ansible/playbooks/deploy-pfsense.yml \\

&#x20; ansible/playbooks/deploy-security.yml \\

&#x20; ansible/playbooks/deploy-monitoring.yml \\

&#x20; --ask-vault-pass

```

Durée mesurée : 23 minutes pour les 7 VMs



\## Scripts disponibles

\- deploy-pfsense.yml : VLANs + 15 règles firewall

\- deploy-security.yml : Suricata + Wazuh + Fail2ban

\- deploy-monitoring.yml : Prometheus + Grafana + ELK

\- deploy-mqtt.yml : Mosquitto MQTT 5.0 TLS

