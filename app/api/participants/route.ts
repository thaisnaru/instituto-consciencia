import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM participants ORDER BY created_at DESC
  `;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const sql = getDb();
  const { name, age, phone, email, notes } = await req.json();

  const rows = await sql`
    INSERT INTO participants (name, age, phone, email, notes)
    VALUES (${name}, ${age}, ${phone}, ${email}, ${notes})
    RETURNING *
  `;

  return NextResponse.json(rows[0], { status: 201 });
}
