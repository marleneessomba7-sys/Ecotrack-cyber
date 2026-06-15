# Configuration Jovani - ECO-MON Bastion Ansible

## VM assignee
ECO-MON 10.10.3.10 VLAN Management VMnet4

## Role
Bastion Ansible SSH securise vers 7 VMs via pfSense

## Commandes principales
ansible all -i inventaire.ini -m ping
ansible-playbook -i inventaire.ini playbook.yml

## Fichiers
inventaire.ini - 7 VMs avec IPs
playbook.yml - hardening SSH node_exporter
