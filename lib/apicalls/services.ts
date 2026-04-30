import { fetchFromAPI } from "../api-client";
import { getMemoryCachedData } from "../cache/memory-cache";

import type { ServiceFaq, ServiceItem } from "@/type/supabase";

type ServicePayload = Partial<ServiceItem> & {
  id?: string | number | null;
  service_faqs?: ServiceFaq[] | null;
};

interface GetServicesOptions {
  signal?: AbortSignal;
  source?: "auto" | "client" | "server";
}

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

function readString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

function readNullableString(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value;
  return null;
}

function normalizeFaqs(faqs: ServiceFaq[] | null | undefined): ServiceFaq[] {
  if (!Array.isArray(faqs)) return [];

  return faqs
    .filter((faq) => faq.question && faq.answer)
    .sort((left, right) => left.display_order - right.display_order);
}

function normalizeService(service: ServicePayload): ServiceItem | null {
  if (service.id === null || service.id === undefined) return null;

  const slug = readString(service.slug);
  const serviceName = readString(service.service_name);
  const shortDescription = readString(service.short_description);
  const content = readString(service.content);

  if (!slug || !serviceName || !shortDescription || !content) return null;

  return {
    id: String(service.id),
    tenant_id:
      typeof service.tenant_id === "string"
        ? service.tenant_id
        : TENANT_ID || "",

    slug,
    service_name: serviceName,
    short_description: shortDescription,

    image_url: readNullableString(service.image_url),

    heading: readNullableString(service.heading),
    subheading: readNullableString(service.subheading),
    content,

    is_active: service.is_active !== false,
    display_order:
      typeof service.display_order === "number" ? service.display_order : 0,

    created_at:
      typeof service.created_at === "string" ? service.created_at : "",
    updated_at:
      typeof service.updated_at === "string" ? service.updated_at : "",

    service_faqs: normalizeFaqs(service.service_faqs),
  };
}

export async function fetchServicesFromSupabase(): Promise<ServicePayload[]> {
  return getMemoryCachedData<ServicePayload[]>(
    `services:${TENANT_ID}`,
    600,
    () => fetchServicesFromSupabaseProxy(),
  );
}

async function fetchServicesFromSupabaseProxy(
  signal?: AbortSignal,
): Promise<ServicePayload[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("SUPABASE_URL:", supabaseUrl);
  console.log("TENANT_ID:", TENANT_ID);
  console.log("API KEY EXISTS:", Boolean(apiKey));

  if (!supabaseUrl || !apiKey || !TENANT_ID) {
    throw new Error("Missing Supabase services configuration");
  }

  const url =
    `${supabaseUrl}/rest/v1/services` +
    `?select=*,service_faqs(*)` +
    `&tenant_id=eq.${TENANT_ID}` +
    `&is_active=eq.true` +
    `&order=display_order.asc` +
    `&service_faqs.order=display_order.asc`;

    console.log("service URL:", url);

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
  console.log("Response Status:", response);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Services request failed (${response.status}): ${text}`);
  }

  return response.json() as Promise<ServicePayload[]>;
}

export async function getServices(
  options: GetServicesOptions = {},
): Promise<ServiceItem[]> {
  const shouldUseServerSource =
    options.source === "server" ||
    (options.source !== "client" && typeof globalThis.window === "undefined");

  const data = shouldUseServerSource
    ? await fetchServicesFromSupabase()
    : await fetchFromAPI<ServicePayload[]>("/services", {
        signal: options.signal,
      });

  if (!Array.isArray(data)) return [];

  return data
    .map(normalizeService)
    .filter((service): service is ServiceItem => service !== null)
    .sort((left, right) => left.display_order - right.display_order);
}
