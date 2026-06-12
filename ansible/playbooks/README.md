# Playbooks Ansible

## Objectif

Ce dossier contient les playbooks Ansible utilisés pour automatiser certaines tâches d'administration dans l'infrastructure ECOTRACK.

---

## Playbooks disponibles
check-infrastructure

---
- name: Vérification infrastructure ECOTRACK
  hosts: all
  gather_facts: no

  tasks:

    - name: Afficher le nom de la machine
      command: hostname
      register: hostname_output

    - name: Résultat hostname
      debug:
        var: hostname_output.stdout

    - name: Afficher le temps de fonctionnement
      command: uptime
      register: uptime_output

    - name: Résultat uptime
      debug:
        var: uptime_output.stdout

    - name: Vérifier l'espace disque
      command: df -h
      register: disk_output

    - name: Résultat espace disque
      debug:
        var: disk_output.stdout_lines
