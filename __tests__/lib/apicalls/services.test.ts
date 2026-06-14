import { describe, it, expect, vi, beforeEach } from "vitest"
import { getServices } from "@/lib/apicalls/services"

vi.mock("@/lib/cache/memory-cache", () => ({
  getMemoryCachedData: vi.fn((_key, _ttl, fetcher) => fetcher()),
  clearMemoryCache: vi.fn(),
}))

const validService = {
  id: 1,
  slug: "financial-planning",
  service_name: "Financial Planning",
  short_description: "Plan your finances",
  content: "<p>Full content here</p>",
  tenant_id: "tenant-1",
  display_order: 1,
  is_active: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  service_faqs: [
    { id: 1, question: "Q?", answer: "A!", display_order: 1 },
    { id: 2, question: "", answer: "No question" },
  ],
}

describe("getServices", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("returns normalized services from client source", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([validService]),
    }))

    const result = await getServices({ source: "client" })
    expect(result).toHaveLength(1)
    expect(result[0].service_name).toBe("Financial Planning")
    expect(result[0].slug).toBe("financial-planning")
  })

  it("filters out services without required fields", async () => {
    const services = [
      validService,
      { ...validService, id: 2, slug: "", service_name: "No Slug" },
      { ...validService, id: 3, service_name: "", slug: "no-name" },
      { ...validService, id: null },
    ]

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(services),
    }))

    const result = await getServices({ source: "client" })
    expect(result).toHaveLength(1)
  })

  it("normalizes FAQs — filters out invalid and sorts", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([validService]),
    }))

    const result = await getServices({ source: "client" })
    expect(result[0].service_faqs).toHaveLength(1)
    expect(result[0].service_faqs[0].question).toBe("Q?")
  })

  it("sorts services by display_order", async () => {
    const services = [
      { ...validService, id: 1, display_order: 2 },
      { ...validService, id: 2, display_order: 1 },
    ]

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(services),
    }))

    const result = await getServices({ source: "client" })
    expect(result[0].id).toBe("2")
    expect(result[1].id).toBe("1")
  })

  it("returns empty array for non-array data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(null),
    }))

    const result = await getServices({ source: "client" })
    expect(result).toEqual([])
  })
})
