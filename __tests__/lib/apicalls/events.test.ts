import { describe, it, expect, vi, beforeEach } from "vitest"
import { getEvents } from "@/lib/apicalls/events"

vi.mock("@/lib/cache/memory-cache", () => ({
  getMemoryCachedData: vi.fn((_key, _ttl, fetcher) => fetcher()),
  clearMemoryCache: vi.fn(),
}))

const validEvent = {
  id: 1,
  event_name: "Test Event",
  slug: "test-event",
  start_at: "2026-07-15T10:00:00Z",
  end_at: "2026-07-15T12:00:00Z",
  registration_link: "https://example.com/register",
  complete_description: "<p>A test event</p>",
  event_type: "online",
  event_tag: "free",
  status: "upcoming",
  tenant_id: "tenant-1",
  cover_image_url: "https://example.com/image.jpg",
  display_order: 1,
  is_active: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  event_addresses: null,
  event_organizers: [],
  event_gallery: [],
}

describe("getEvents", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("returns normalized events from client source", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([validEvent]),
    }))

    const result = await getEvents({ source: "client" })
    expect(result).toHaveLength(1)
    expect(result[0].event_name).toBe("Test Event")
    expect(result[0].slug).toBe("test-event")
  })

  it("filters out events without required fields", async () => {
    const invalidEvents = [
      validEvent,
      { ...validEvent, id: 2, event_name: "", slug: "no-name" },
      { ...validEvent, id: 3, slug: "", event_name: "No Slug" },
      { ...validEvent, id: null },
    ]

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(invalidEvents),
    }))

    const result = await getEvents({ source: "client" })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe("1")
  })

  it("sorts events by display_order then start_at", async () => {
    const events = [
      { ...validEvent, id: 1, display_order: 2, start_at: "2026-08-01T00:00:00Z" },
      { ...validEvent, id: 2, display_order: 1, start_at: "2026-07-01T00:00:00Z" },
      { ...validEvent, id: 3, display_order: 1, start_at: "2026-06-01T00:00:00Z" },
    ]

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(events),
    }))

    const result = await getEvents({ source: "client" })
    expect(result[0].id).toBe("3")
    expect(result[1].id).toBe("2")
    expect(result[2].id).toBe("1")
  })

  it("returns empty array for non-array data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(null),
    }))

    const result = await getEvents({ source: "client" })
    expect(result).toEqual([])
  })

  it("handles missing optional fields with defaults", async () => {
    const partialEvent = {
      id: 1,
      event_name: "Minimal Event",
      slug: "minimal",
      start_at: "2026-07-01T00:00:00Z",
      registration_link: "https://example.com",
      complete_description: "Description",
    }

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([partialEvent]),
    }))

    const result = await getEvents({ source: "client" })
    expect(result).toHaveLength(1)
    expect(result[0].event_type).toBe("offline")
    expect(result[0].event_tag).toBe("free")
    expect(result[0].status).toBe("upcoming")
    expect(result[0].is_active).toBe(true)
    expect(result[0].event_addresses).toBeNull()
    expect(result[0].event_organizers).toEqual([])
    expect(result[0].event_gallery).toEqual([])
  })
})
