import { NextResponse } from "next/server";

import type { TeamInsert } from "@/type/supabase";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

interface TeamRequestBody {
  full_name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !TENANT_ID) {
      return NextResponse.json(
        { error: "Missing Supabase team configuration" },
        { status: 500 },
      );
    }

    const body = (await request.json()) as TeamRequestBody;

    const fullName = readString(body.full_name);
    const email = readString(body.email);
    const phone = readString(body.phone);
    const message = readString(body.message);

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required" },
        { status: 400 },
      );
    }

    const payload: TeamInsert = {
      tenant_id: TENANT_ID,
      full_name: fullName,
      email,
      phone: phone || null,
      message: message || null,
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/team`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();

      return NextResponse.json(
        { error: `Team form submission failed: ${text}` },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while submitting team form" },
      { status: 500 },
    );
  }
}