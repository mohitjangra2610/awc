import { fetchFromAPI } from "../api-client";
import { getMemoryCachedData } from "../cache/memory-cache";
import type {
  EventAddress,
  EventGallery,
  EventItem,
  EventOrganizer,
  EventStatus,
  EventTag,
  EventType,
} from "@/type/supabase";

type EventPayload = Partial<EventItem> & {
  id?: string | number | null;
  tenant_id?: string | null;
  event_addresses?: EventAddress | EventAddress[] | null;
  event_organizers?: EventOrganizer[] | null;
  event_gallery?: EventGallery[] | null;
};

interface GetEventsOptions {
  signal?: AbortSignal;
  source?: "auto" | "client" | "server";
}

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

function readString(value: unknown, fallback = ""): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return fallback;
}

function readNullableString(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  return null;
}

function isEventType(value: unknown): value is EventType {
  return value === "online" || value === "offline";
}

function isEventTag(value: unknown): value is EventTag {
  return value === "free" || value === "paid";
}

function isEventStatus(value: unknown): value is EventStatus {
  return (
    value === "ongoing" ||
    value === "upcoming" ||
    value === "completed" ||
    value === "registration_closed"
  );
}

function normalizeAddress(
  address: EventPayload["event_addresses"]
): EventAddress | null {
  if (!address) {
    return null;
  }

  if (Array.isArray(address)) {
    return address[0] ?? null;
  }

  return address;
}

function normalizeEvent(event: EventPayload): EventItem | null {
  if (event.id === null || event.id === undefined) {
    return null;
  }

  const eventName = readString(event.event_name);
  const slug = readString(event.slug);
  const startAt = readString(event.start_at);
  const registrationLink = readString(event.registration_link);
  const completeDescription = readString(event.complete_description);

  if (!eventName || !slug || !startAt || !registrationLink || !completeDescription) {
    return null;
  }

  return {
    id: String(event.id),
    tenant_id:
      typeof event.tenant_id === "string" ? event.tenant_id : TENANT_ID || "",

    event_name: eventName,
    slug,

    start_at: startAt,
    end_at: readNullableString(event.end_at),

    event_type: isEventType(event.event_type) ? event.event_type : "offline",
    event_tag: isEventTag(event.event_tag) ? event.event_tag : "free",
    status: isEventStatus(event.status) ? event.status : "upcoming",

    registration_link: registrationLink,

    online_platform: readNullableString(event.online_platform),
    online_join_label: readNullableString(event.online_join_label),

    short_description: readNullableString(event.short_description),
    complete_description: completeDescription,

    cover_image_url: readNullableString(event.cover_image_url),

    is_active: event.is_active !== false,
    display_order:
      typeof event.display_order === "number" ? event.display_order : 0,

    created_at: readString(event.created_at),
    updated_at: readString(event.updated_at),

    event_addresses: normalizeAddress(event.event_addresses),
    event_organizers: Array.isArray(event.event_organizers)
      ? event.event_organizers
      : [],
    event_gallery: Array.isArray(event.event_gallery) ? event.event_gallery : [],
  };
}

export async function fetchEventsFromSupabase(): Promise<EventPayload[]> {
  return getMemoryCachedData<EventPayload[]>(
    `events:${TENANT_ID}`,
    600,
    () => fetchEventsFromSupabaseProxy()
  );
}

async function fetchEventsFromSupabaseProxy(
  signal?: AbortSignal
): Promise<EventPayload[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !apiKey || !TENANT_ID) {
    throw new Error("Missing Supabase events configuration");
  }

  const url =
    `${supabaseUrl}/rest/v1/events` +
    `?select=*,event_addresses(*),event_organizers(*),event_gallery(*)` +
    `&tenant_id=eq.${TENANT_ID}` +
    `&is_active=eq.true` +
    `&status=in.(ongoing,upcoming)` +
    `&order=display_order.asc,start_at.asc`;

  const response = await fetch(url, {
    method: "GET",
    signal,
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Events request failed (${response.status}): ${text}`);
  }

  return response.json() as Promise<EventPayload[]>;
}

export async function getEvents(
  options: GetEventsOptions = {}
): Promise<EventItem[]> {
  const shouldUseServerSource =
    options.source === "server" ||
    (options.source !== "client" && typeof globalThis.window === "undefined");

  const data = shouldUseServerSource
    ? await fetchEventsFromSupabase()
    : await fetchFromAPI<EventPayload[]>("/events", {
        signal: options.signal,
      });

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(normalizeEvent)
    .filter((event): event is EventItem => event !== null)
    .sort(
      (left, right) =>
        left.display_order - right.display_order ||
        new Date(left.start_at).getTime() - new Date(right.start_at).getTime()
    );
}