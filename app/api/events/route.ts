import { getEvents } from "@/lib/apicalls/events";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await getEvents({
      source: "server",
    });

    return NextResponse.json(events);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}