# Configuration Marlene - ECO-PROXY

## VM
ECO-PROXY 10.10.1.10 DMZ VMnet2

## Services
- HAProxy load balancer VIP 10.10.1.100
- Nginx WAF ModSecurity OWASP CRS v4
- Keepalived failover moins de 2 secondes
- TLS 1.3 force sur tous les flux

## Fichiers
- haproxy.cfg : load balancing vers ECO-APP 10.10.2.10
- nginx.conf : WAF ModSecurity TLS 1.3
- keepalived.conf : VIP 10.10.1.100

## Tests valides
- curl -I http://10.10.1.100 repond HTTP 200
- testssl.sh TLS 1.3 OK TLS 1.2 not offered
- Failover HAProxy moins de 2 secondes
