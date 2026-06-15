# Plan adressage IP ECOTRACK

## Mapping VMnet VLAN
VMnet2 = DMZ  = 10.10.1.0/24
VMnet3 = LAN  = 10.10.2.0/24
VMnet4 = MGT  = 10.10.3.0/24
VMnet5 = IoT  = 10.10.4.0/24

## VMs
ECO-PROXY  10.10.1.10  DMZ  HAProxy Nginx Keepalived
ECO-APP    10.10.2.10  LAN  API REST JWT
ECO-WEB    10.10.2.20  LAN  Nginx frontend
ECO-DB     10.10.2.30  LAN  PostgreSQL Redis
ECO-MON    10.10.3.10  MGT  Prometheus Grafana Ansible
ECO-SEC    10.10.3.20  MGT  Suricata IDS
ECO-MQTT   10.10.4.10  IoT  Mosquitto TLS

## VIP Keepalived
10.10.1.100 HAProxy failover moins de 2 secondes
