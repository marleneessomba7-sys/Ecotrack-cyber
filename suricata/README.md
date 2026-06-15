# Suricata IDS - ECO-SEC ECOTRACK

## VM
ECO-SEC 10.10.3.20 VLAN Management VMnet4

## 5 regles custom ECOTRACK
- Regle 1 : Bruteforce SSH 5 tentatives en 60 secondes
- Regle 2 : Bruteforce API 10 tentatives en 60 secondes
- Regle 3 : Scan de ports SYN sur DMZ
- Regle 4 : SQL Injection UNION SELECT
- Regle 5 : Trafic IoT anormal 100 messages en 60 secondes

## Logs
Logs EVE JSON : /var/log/suricata/eve.json
Alertes rapides : /var/log/suricata/fast.log

## Tester une regle
curl -k "https://10.10.1.10/?q=1+UNION+SELECT+1,2,3--"
tail -5 /var/log/suricata/fast.log

## Captures disponibles
- suricata-status.png : service actif
- ssh-detection.png : bruteforce SSH detecte
- nmap-test.png : scan ports detecte
