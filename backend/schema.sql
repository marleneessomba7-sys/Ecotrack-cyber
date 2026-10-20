-- ECOTRACK V2 - schema minimal du socle plancher (Sprint 0)
-- A executer depuis le conteneur app :
--   psql -h 10.10.40.10 -U ecotrack -d ecotrack -f schema.sql

CREATE TABLE IF NOT EXISTS zones (
    id   SERIAL PRIMARY KEY,
    nom  TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS conteneurs (
    code             TEXT PRIMARY KEY,
    zone_id          INT  NOT NULL REFERENCES zones(id),
    type_dechet      TEXT NOT NULL DEFAULT 'menager',
    capacite_litres  INT  NOT NULL DEFAULT 660,
    latitude         NUMERIC(9,6),
    longitude        NUMERIC(9,6)
);

CREATE TABLE IF NOT EXISTS mesures (
    id              BIGSERIAL PRIMARY KEY,
    conteneur_code  TEXT        NOT NULL REFERENCES conteneurs(code),
    remplissage     SMALLINT    NOT NULL CHECK (remplissage BETWEEN 0 AND 100),
    source          TEXT        NOT NULL DEFAULT 'api',
    mesure_le       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mesures_conteneur_date
    ON mesures (conteneur_code, mesure_le DESC);

-- Donnees de demonstration
INSERT INTO zones (nom) VALUES ('Centre'), ('Nord'), ('Sud')
ON CONFLICT (nom) DO NOTHING;

INSERT INTO conteneurs (code, zone_id, type_dechet, capacite_litres) VALUES
    ('001', (SELECT id FROM zones WHERE nom = 'Centre'), 'menager',    660),
    ('002', (SELECT id FROM zones WHERE nom = 'Centre'), 'recyclable', 660),
    ('003', (SELECT id FROM zones WHERE nom = 'Nord'),   'menager',    770),
    ('004', (SELECT id FROM zones WHERE nom = 'Nord'),   'verre',      1000),
    ('005', (SELECT id FROM zones WHERE nom = 'Sud'),    'menager',    660),
    ('006', (SELECT id FROM zones WHERE nom = 'Sud'),    'recyclable', 660)
ON CONFLICT (code) DO NOTHING;
