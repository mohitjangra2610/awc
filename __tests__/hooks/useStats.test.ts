import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useStats } from "@/hooks/useStats"

vi.mock("@/lib/cache/memory-cache", () => ({
  getMemoryCachedData: vi.fn((_key, _ttl, fetcher) => fetcher()),
  clearMemoryCache: vi.fn(),
}))

const mockStat = {
  id: 1,
  number: "1000",
  title: "Clients",
  tenant_id: "tenant-1",
  icon: "users",
  display_order: 1,
  is_active: true,
  description: null,
  created_at: undefined,
  updated_at: undefined,
}

describe("useStats", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("returns loading state initially", () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([mockStat]),
    }))

    const { result } = renderHook(() => useStats())
    expect(result.current.loading).toBe(true)
    expect(result.current.stats).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it("returns stats after successful fetch", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([mockStat]),
    }))

    const { result } = renderHook(() => useStats())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.stats).toHaveLength(1)
    expect(result.current.stats[0].number).toBe("1000")
    expect(result.current.stats[0].title).toBe("Clients")
    expect(result.current.error).toBeNull()
  })

  it("sets error on fetch failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")))

    const { result } = renderHook(() => useStats())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.stats).toEqual([])
    expect(result.current.error).toBe("Failed to load stats")
  })
})
