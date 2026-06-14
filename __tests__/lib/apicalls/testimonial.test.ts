import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("@/lib/cache/memory-cache", () => ({
  getMemoryCachedData: vi.fn((_key, _ttl, fetcher) => fetcher()),
  clearMemoryCache: vi.fn(),
}))

const mockTestimonials = [
  {
    id: 1,
    message: "Great service!",
    full_name: "John Doe",
    image_url: "https://example.com/avatar.jpg",
    star_rating: 5,
    tenant_id: "tenant-1",
    display_order: 1,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
]

describe("getTestimonials", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("returns normalized testimonials", async () => {
    vi.stubEnv("NEXT_PUBLIC_TENANT_ID", "tenant-1")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key")

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockTestimonials),
    }))

    const { getTestimonials } = await import("@/lib/apicalls/testimonial")
    const result = await getTestimonials({ source: "client" })
    expect(result).toHaveLength(1)
    expect(result[0].message).toBe("Great service!")
    expect(result[0].full_name).toBe("John Doe")
    expect(result[0].star_rating).toBe(5)
  })

  it("filters out testimonials with null id, non-string message, or non-string full_name", async () => {
    vi.stubEnv("NEXT_PUBLIC_TENANT_ID", "tenant-1")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key")

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([
        ...mockTestimonials,
        { id: null, message: "Null id", full_name: "Null" },
        { id: 4, message: 123, full_name: "Non-string message" },
        { id: 5, message: "No name", full_name: 456 },
      ]),
    }))

    const { getTestimonials } = await import("@/lib/apicalls/testimonial")
    const result = await getTestimonials({ source: "client" })
    expect(result).toHaveLength(1)
  })

  it("defaults star_rating to 5 when not provided", async () => {
    vi.stubEnv("NEXT_PUBLIC_TENANT_ID", "tenant-1")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key")

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([{
        id: 5,
        message: "No rating",
        full_name: "Anon",
        tenant_id: "tenant-1",
      }]),
    }))

    const { getTestimonials } = await import("@/lib/apicalls/testimonial")
    const result = await getTestimonials({ source: "client" })
    expect(result[0].star_rating).toBe(5)
    expect(result[0].image_url).toBeNull()
  })

  it("returns empty array for non-array data", async () => {
    vi.stubEnv("NEXT_PUBLIC_TENANT_ID", "tenant-1")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key")

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(null),
    }))

    const { getTestimonials } = await import("@/lib/apicalls/testimonial")
    const result = await getTestimonials({ source: "client" })
    expect(result).toEqual([])
  })
})
