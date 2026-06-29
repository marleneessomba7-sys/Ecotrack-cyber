# Runbook Incident ECOTRACK

## Relancer tous les services depuis ECO-MON
ansible-playbook -i inventaire.ini playbook.yml

## Vérifier toutes les VMs
ansible all -i inventaire.ini -m ping

## ECO-PROXY
systemctl is-active haproxy nginx keepalived

## ECO-DB
pg_isready -h 10.10.2.30 -p 5432
redis-cli ping

## ECO-SEC
systemctl is-active suricata
tail -10 /var/log/suricata/fast.log
