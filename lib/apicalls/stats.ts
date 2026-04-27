const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !TENANT_ID) {
  throw new Error('Missing required environment variables');
}

export interface Stat {
  id: string;
  tenant_id: string;
  icon: string;
  number: string;
  title: string;
  description?: string | null;
  is_active?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export async function getStats(): Promise<Stat[]> {
  const url =
    `${SUPABASE_URL}/rest/v1/stats` +
    `?select=*` +
    `&tenant_id=eq.${TENANT_ID}` +
    `&is_active=eq.true` +
    `&order=display_order.asc`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY || '',
        Authorization: `Bearer ${SUPABASE_ANON_KEY || ''}`,
        Accept: 'application/json',
      } as Record<string, string>,
      cache: 'no-store',
    });

    const text = await response.text();

    if (!response.ok) {
      console.error(`Stats fetch failed with status ${response.status}:`, text);
      throw new Error(`Stats fetch failed ${response.status}`);
    }

    if (!text) {
      console.warn('Stats API returned empty response');
      return [];
    }

    const data = JSON.parse(text) as Stat[];
    return data;
  } catch (error) {
    console.error('Error fetching stats from Supabase:', error);
    throw error;
  }
}