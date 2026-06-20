-- Schema para Neon (PostgreSQL)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS ritual_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  time TEXT NOT NULL DEFAULT '19:00',
  location TEXT NOT NULL,
  description TEXT,
  available_spots INTEGER NOT NULL DEFAULT 20,
  google_form_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER,
  phone TEXT,
  email TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Configuração inicial do ritual
INSERT INTO ritual_config (date, time, location, description, available_spots, google_form_url)
VALUES (
  '2025-08-15',
  '19:00',
  'Apucarana, Paraná',
  'Uma jornada de autoconhecimento e reconexão com a natureza. Venha com o coração aberto.',
  20,
  'https://forms.gle/seu-formulario'
)
ON CONFLICT DO NOTHING;
