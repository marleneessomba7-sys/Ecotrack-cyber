# Runbook P3 - Certificat expiré

## Objectif

Renouveler un certificat TLS expiré.

---

## Détection

- Connexion HTTPS impossible
- Erreur TLS
- Certificat expiré

---

## Diagnostic

```bash
openssl x509 -in certificate.crt -noout -dates
```

Vérifier :

- Date d'expiration
- Autorité de certification

---

## Contention

Retirer le certificat expiré.

---

## Restauration

Créer un nouveau certificat.

Signer le certificat avec EcotrackCA.

Installer le certificat.

Redémarrer le service.

```bash
sudo systemctl restart nginx
```

ou

```bash
sudo systemctl restart mosquitto
```

---

## Validation

```bash
openssl s_client -connect serveur:443
```

Le certificat doit être valide.
