import { NextRequest, NextResponse } from "next/server";
import { checkCredentials, createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!checkCredentials(email, password)) {
    return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ ok: true });
}
