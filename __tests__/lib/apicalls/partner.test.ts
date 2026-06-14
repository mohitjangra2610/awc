import { describe, it, expect, vi, beforeEach } from "vitest"
import { getPartners } from "@/lib/apicalls/partner"

vi.mock("@/lib/cache/memory-cache", () => ({
  getMemoryCachedData: vi.fn((_key, _ttl, fetcher) => fetcher()),
  clearMemoryCache: vi.fn(),
}))

const validPartner = {
  id: 1,
  company_name: "Test Partner",
  slug: "test-partner",
  logo_url: "https://example.com/logo.png",
  short_description: "A great partner",
  tenant_id: "tenant-1",
  display_order: 1,
  is_active: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
}

describe("getPartners", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("returns normalized partners from client source", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([validPartner]),
    }))

    const result = await getPartners({ source: "client" })
    expect(result).toHaveLength(1)
    expect(result[0].company_name).toBe("Test Partner")
    expect(result[0].slug).toBe("test-partner")
  })

  it("filters out partners without required fields", async () => {
    const partners = [
      validPartner,
      { ...validPartner, id: 2, company_name: "", slug: "no-name" },
      { ...validPartner, id: null },
    ]

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(partners),
    }))

    const result = await getPartners({ source: "client" })
    expect(result).toHaveLength(1)
  })

  it("sorts partners by display_order", async () => {
    const partners = [
      { ...validPartner, id: 1, display_order: 3 },
      { ...validPartner, id: 2, display_order: 1 },
      { ...validPartner, id: 3, display_order: 2 },
    ]

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(partners),
    }))

    const result = await getPartners({ source: "client" })
    expect(result[0].id).toBe("2")
    expect(result[1].id).toBe("3")
    expect(result[2].id).toBe("1")
  })

  it("returns empty array for non-array data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(null),
    }))

    const result = await getPartners({ source: "client" })
    expect(result).toEqual([])
  })

  it("handles optional fields", async () => {
    const minimal = {
      id: 1,
      company_name: "Minimal",
      slug: "minimal",
      logo_url: "logo.png",
      short_description: "desc",
    }

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([minimal]),
    }))

    const result = await getPartners({ source: "client" })
    expect(result[0].company_website).toBeNull()
    expect(result[0].is_active).toBe(true)
    expect(result[0].display_order).toBe(0)
  })
})
