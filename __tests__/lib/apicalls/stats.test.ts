import { describe, it, expect, vi, beforeEach } from "vitest"
import { getStats } from "@/lib/apicalls/stats"

vi.mock("@/lib/cache/memory-cache", () => ({
  getMemoryCachedData: vi.fn((_key, _ttl, fetcher) => fetcher()),
  clearMemoryCache: vi.fn(),
}))

const validStat = {
  id: 1,
  number: "1000",
  title: "Clients Served",
  icon: "users",
  tenant_id: "tenant-1",
  display_order: 1,
  is_active: true,
  description: "Happy clients",
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
}

describe("getStats", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("returns normalized stats from client source", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([validStat]),
    }))

    const result = await getStats({ source: "client" })
    expect(result).toHaveLength(1)
    expect(result[0].number).toBe("1000")
    expect(result[0].title).toBe("Clients Served")
    expect(result[0].icon).toBe("users")
  })

  it("maps value→number and label→title fallbacks", async () => {
    const statWithAliases = {
      id: 2,
      value: 500,
      label: "Offices",
      icon_name: "briefcase",
    }

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([statWithAliases]),
    }))

    const result = await getStats({ source: "client" })
    expect(result[0].number).toBe("500")
    expect(result[0].title).toBe("Offices")
    expect(result[0].icon).toBe("briefcase")
  })

  it("filters out stats without number or title", async () => {
    const stats = [
      validStat,
      { ...validStat, id: 2, number: "", title: "Empty Number" },
      { ...validStat, id: 3, number: "100", title: "" },
      { ...validStat, id: null },
    ]

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(stats),
    }))

    const result = await getStats({ source: "client" })
    expect(result).toHaveLength(1)
  })

  it("sorts by display_order", async () => {
    const stats = [
      { ...validStat, id: 1, display_order: 2 },
      { ...validStat, id: 2, display_order: 1 },
    ]

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(stats),
    }))

    const result = await getStats({ source: "client" })
    expect(result[0].id).toBe("2")
    expect(result[1].id).toBe("1")
  })

  it("returns empty array for non-array data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(null),
    }))

    const result = await getStats({ source: "client" })
    expect(result).toEqual([])
  })

  it("provides default icon when missing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([{ ...validStat, icon: null, icon_name: null }]),
    }))

    const result = await getStats({ source: "client" })
    expect(result[0].icon).toBe("file")
  })
})
