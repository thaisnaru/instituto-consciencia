import { neon } from "@neondatabase/serverless";

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL não configurada.");
  return neon(url);
}

export type Participant = {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  notes: string;
  created_at: string;
};

export type RitualConfig = {
  id: string;
  date: string;
  time: string;
  location: string;
  description: string;
  available_spots: number;
  google_form_url: string;
  updated_at: string;
};
