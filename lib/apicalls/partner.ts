import { fetchFromAPI } from "../api-client";
import { getMemoryCachedData } from "../cache/memory-cache";

import type { Partner } from "@/type/supabase";

type PartnerPayload = Partial<Partner> & {
  id?: string | number | null;
};

interface GetPartnersOptions {
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
  if (typeof value === "string") {
    return value;
  }

  return null;
}

function normalizePartner(partner: PartnerPayload): Partner | null {
  if (partner.id === null || partner.id === undefined) {
    return null;
  }

  const companyName = readString(partner.company_name);

  const slug = readString(partner.slug);

  const logoUrl = readString(partner.logo_url);

  const shortDescription = readString(partner.short_description);

  if (!companyName || !slug || !logoUrl || !shortDescription) {
    return null;
  }

  return {
    id: String(partner.id),
    tenant_id:
      typeof partner.tenant_id === "string"
        ? partner.tenant_id
        : TENANT_ID || "",

    company_name: companyName,
    slug,
    logo_url: logoUrl,

    company_website: readNullableString(partner.company_website),

    heading_text: readNullableString(partner.heading_text),

    short_description: shortDescription,

    review: readNullableString(partner.review),

    review_by: readNullableString(partner.review_by),

    content: readNullableString(partner.content),

    result: readNullableString(partner.result),

    about_the_company: readNullableString(partner.about_the_company),

    is_active: partner.is_active !== false,

    display_order:
      typeof partner.display_order === "number" ? partner.display_order : 0,

    created_at:
      typeof partner.created_at === "string" ? partner.created_at : "",

    updated_at:
      typeof partner.updated_at === "string" ? partner.updated_at : "",
  };
}

export async function fetchPartnersFromSupabase(): Promise<PartnerPayload[]> {
  return getMemoryCachedData<PartnerPayload[]>(`partners:${TENANT_ID}`, 600, () =>
    fetchPartnersFromSupabaseProxy(),
  );
}

async function fetchPartnersFromSupabaseProxy(
  signal?: AbortSignal,
): Promise<PartnerPayload[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


  if (!supabaseUrl || !apiKey || !TENANT_ID) {
    throw new Error("Missing Supabase partners configuration");
  }

  const url =
    `${supabaseUrl}/rest/v1/partners` +
    `?select=*` +
    `&tenant_id=eq.${TENANT_ID}` +
    `&is_active=eq.true` +
    `&order=display_order.asc`;

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

    throw new Error(`Partners request failed (${response.status}): ${text}`);
  }

  return response.json() as Promise<PartnerPayload[]>;
}

export async function getPartners(
  options: GetPartnersOptions = {},
): Promise<Partner[]> {
  const shouldUseServerSource =
    options.source === "server" ||
    (options.source !== "client" && typeof globalThis.window === "undefined");

  const data = shouldUseServerSource
    ? await fetchPartnersFromSupabase()
    : await fetchFromAPI<PartnerPayload[]>("/partners", {
        signal: options.signal,
      });

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(normalizePartner)
    .filter((partner): partner is Partner => partner !== null)
    .sort((left, right) => left.display_order - right.display_order);
}
