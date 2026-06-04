\# Politique de Sécurité du SI — ECOTRACK



\## Règles obligatoires



| Domaine | Règle | Statut |

|---------|-------|--------|

| SSH | Clé RSA 4096 uniquement, PermitRootLogin no | Obligatoire |

| Firewall | ufw enable sur toutes les VMs | Obligatoire |

| Mises à jour | Patchs CVE critiques sous 48h | Obligatoire |

| Logs | Centralisés ELK, rétention 90 jours | Obligatoire |

| Chiffrement | TLS 1.3 minimum sur tous les flux | Obligatoire |

| Base de données | Pas d'accès direct depuis Internet | Obligatoire |

| Mots de passe | bcrypt 12 rounds, 12 caractères minimum | Obligatoire |

| Sauvegardes | Chiffrées AES-256, testées mensuellement | Obligatoire |

| Fail2ban | 5 tentatives → blocage 24h | Recommandé |

| SIEM Wazuh | Corrélation événements, alertes SOC | Recommandé |

