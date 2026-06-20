import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder"
);

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
