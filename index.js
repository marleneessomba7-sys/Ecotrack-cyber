// ECOTRACK V2 - backend minimal (socle plancher du Sprint 0)
// Routes : liste des conteneurs, ingestion de mesures, statistiques par zone.
// Les mesures arrivent aussi par MQTT (TLS) depuis la zone IoT.

require('dotenv').config();
const fs = require('fs');
const express = require('express');
const { Pool } = require('pg');
const mqtt = require('mqtt');

const PORT = Number(process.env.PORT || 3000);
const API_KEY = process.env.API_KEY || '';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const CODE_VALIDE = /^[A-Za-z0-9_-]{1,32}$/;

function validerMesure(code, remplissage) {
  if (typeof code !== 'string' || !CODE_VALIDE.test(code)) {
    return 'code de conteneur invalide';
  }
  if (!Number.isInteger(remplissage) || remplissage < 0 || remplissage > 100) {
    return 'remplissage invalide (entier entre 0 et 100 attendu)';
  }
  return null;
}

// Enregistre une mesure ; renvoie null si le conteneur est inconnu.
async function enregistrerMesure(code, remplissage, source) {
  const resultat = await pool.query(
    `INSERT INTO mesures (conteneur_code, remplissage, source)
     SELECT $1, $2, $3
     WHERE EXISTS (SELECT 1 FROM conteneurs WHERE code = $1)
     RETURNING id, conteneur_code, remplissage, source, mesure_le`,
    [code, remplissage, source]
  );
  return resultat.rows[0] || null;
}

// ---------- API HTTP ----------
const app = express();
app.use(express.json({ limit: '10kb' }));

function exigerCleApi(req, res, next) {
  if (!API_KEY || req.get('x-api-key') !== API_KEY) {
    return res.status(401).json({ erreur: 'cle API absente ou invalide' });
  }
  next();
}

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ statut: 'ok', base: 'ok', mqtt: clientMqtt && clientMqtt.connected ? 'ok' : 'deconnecte' });
  } catch (e) {
    res.status(503).json({ statut: 'degrade', base: 'injoignable' });
  }
});

// Route 1 : liste des conteneurs avec leur derniere mesure
app.get('/api/conteneurs', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT c.code, z.nom AS zone, c.type_dechet, c.capacite_litres,
             m.remplissage AS dernier_remplissage, m.mesure_le AS derniere_mesure
      FROM conteneurs c
      JOIN zones z ON z.id = c.zone_id
      LEFT JOIN LATERAL (
        SELECT remplissage, mesure_le FROM mesures
        WHERE conteneur_code = c.code
        ORDER BY mesure_le DESC LIMIT 1
      ) m ON true
      ORDER BY c.code`);
    res.json(rows);
  } catch (e) {
    console.error('GET /api/conteneurs :', e.message);
    res.status(500).json({ erreur: 'erreur serveur' });
  }
});

// Route 2 : ingestion d'une mesure (protegee par cle API)
app.post('/api/mesures', exigerCleApi, async (req, res) => {
  const { conteneur, remplissage } = req.body || {};
  const erreur = validerMesure(conteneur, remplissage);
  if (erreur) return res.status(400).json({ erreur });
  try {
    const mesure = await enregistrerMesure(conteneur, remplissage, 'api');
    if (!mesure) return res.status(404).json({ erreur: 'conteneur inconnu' });
    res.status(201).json(mesure);
  } catch (e) {
    console.error('POST /api/mesures :', e.message);
    res.status(500).json({ erreur: 'erreur serveur' });
  }
});

// Route 3 : statistiques par zone (sur la derniere mesure de chaque conteneur)
app.get('/api/stats/zones', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT z.nom AS zone,
             COUNT(c.code)::int AS nb_conteneurs,
             ROUND(AVG(m.remplissage))::int AS remplissage_moyen,
             COUNT(*) FILTER (WHERE m.remplissage >= 80)::int AS a_collecter
      FROM zones z
      LEFT JOIN conteneurs c ON c.zone_id = z.id
      LEFT JOIN LATERAL (
        SELECT remplissage FROM mesures
        WHERE conteneur_code = c.code
        ORDER BY mesure_le DESC LIMIT 1
      ) m ON true
      GROUP BY z.nom
      ORDER BY z.nom`);
    res.json(rows);
  } catch (e) {
    console.error('GET /api/stats/zones :', e.message);
    res.status(500).json({ erreur: 'erreur serveur' });
  }
});

// ---------- Abonnement MQTT ----------
let clientMqtt = null;

function demarrerMqtt() {
  if (!process.env.MQTT_URL) {
    console.warn('MQTT_URL non defini : abonnement MQTT desactive');
    return;
  }
  clientMqtt = mqtt.connect(process.env.MQTT_URL, {
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSWORD,
    ca: process.env.MQTT_CA ? fs.readFileSync(process.env.MQTT_CA) : undefined,
    rejectUnauthorized: true,
    reconnectPeriod: 5000,
  });

  const sujet = process.env.MQTT_TOPIC || 'ecotrack/conteneur/+';

  clientMqtt.on('connect', () => {
    console.log('MQTT connecte, abonnement a', sujet);
    clientMqtt.subscribe(sujet, { qos: 1 });
  });
  clientMqtt.on('error', (e) => console.error('MQTT :', e.message));

  clientMqtt.on('message', async (topic, payload) => {
    const code = topic.split('/').pop();
    let remplissage;
    try {
      remplissage = JSON.parse(payload.toString()).remplissage;
    } catch {
      return console.warn('MQTT : message illisible sur', topic);
    }
    const erreur = validerMesure(code, remplissage);
    if (erreur) return console.warn('MQTT : mesure rejetee (' + erreur + ') sur', topic);
    try {
      const mesure = await enregistrerMesure(code, remplissage, 'mqtt');
      if (!mesure) return console.warn('MQTT : conteneur inconnu', code);
      console.log('MQTT : mesure enregistree', code, remplissage + '%');
    } catch (e) {
      console.error('MQTT : erreur base', e.message);
    }
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log('API ECOTRACK en ecoute sur le port', PORT);
  demarrerMqtt();
});
