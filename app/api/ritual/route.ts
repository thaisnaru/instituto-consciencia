import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT * FROM ritual_config ORDER BY updated_at DESC LIMIT 1
    `;
    return NextResponse.json(rows[0] ?? null);
  } catch {
    return NextResponse.json(null);
  }
}

export async function PUT(req: NextRequest) {
  const sql = getDb();
  const { id, date, time, location, description, available_spots, google_form_url } = await req.json();

  const rows = await sql`
    UPDATE ritual_config
    SET
      date = ${date},
      time = ${time},
      location = ${location},
      description = ${description},
      available_spots = ${available_spots},
      google_form_url = ${google_form_url},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return NextResponse.json(rows[0]);
}
