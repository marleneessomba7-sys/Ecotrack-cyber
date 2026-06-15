# Configuration Cynthia - ECO-MON

## VM
ECO-MON 10.10.3.10 VLAN Management VMnet4

## Services
- Prometheus scrape 7 VMs node_exporter port 9100
- Grafana dashboards Infrastructure Securite IoT
- ELK Stack centralisation logs Suricata et systeme
- Ansible Bastion SSH vers toutes les VMs via pfSense

## Acces
- Grafana : http://10.10.3.10:3000
- Prometheus : http://10.10.3.10:9090
- Kibana : http://10.10.3.10:5601

## Commandes Ansible depuis ECO-MON
ansible all -i inventaire.ini -m ping
ansible-playbook -i inventaire.ini playbook.yml
