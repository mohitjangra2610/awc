import { describe, it, expect, beforeEach, vi } from "vitest"
import { getMemoryCachedData, clearMemoryCache } from "@/lib/cache/memory-cache"

describe("memory-cache", () => {
  beforeEach(() => {
    clearMemoryCache()
    vi.useFakeTimers()
  })

  it("returns data from fetcher on first call", async () => {
    const fetcher = vi.fn().mockResolvedValue("data")
    const result = await getMemoryCachedData("key1", 60, fetcher)
    expect(result).toBe("data")
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it("returns cached data on second call within TTL", async () => {
    const fetcher = vi.fn().mockResolvedValue("cached")
    await getMemoryCachedData("key2", 60, fetcher)
    const result = await getMemoryCachedData("key2", 60, fetcher)
    expect(result).toBe("cached")
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it("calls fetcher again after TTL expires", async () => {
    const fetcher = vi.fn().mockResolvedValue("stale")
    await getMemoryCachedData("key3", 10, fetcher)
    vi.advanceTimersByTime(11_000)
    const result = await getMemoryCachedData("key3", 10, fetcher)
    expect(result).toBe("stale")
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it("caches different keys independently", async () => {
    const fetcherA = vi.fn().mockResolvedValue("A")
    const fetcherB = vi.fn().mockResolvedValue("B")
    await getMemoryCachedData("keyA", 60, fetcherA)
    await getMemoryCachedData("keyB", 60, fetcherB)
    const resultA = await getMemoryCachedData("keyA", 60, fetcherA)
    const resultB = await getMemoryCachedData("keyB", 60, fetcherB)
    expect(resultA).toBe("A")
    expect(resultB).toBe("B")
    expect(fetcherA).toHaveBeenCalledTimes(1)
    expect(fetcherB).toHaveBeenCalledTimes(1)
  })

  it("clears specific cache key", async () => {
    const fetcher = vi.fn().mockResolvedValue("data")
    await getMemoryCachedData("clearKey", 60, fetcher)
    clearMemoryCache("clearKey")
    await getMemoryCachedData("clearKey", 60, fetcher)
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it("clears all cache when no key specified", async () => {
    const fetcher = vi.fn().mockResolvedValue("data")
    await getMemoryCachedData("all1", 60, fetcher)
    await getMemoryCachedData("all2", 60, fetcher)
    clearMemoryCache()
    await getMemoryCachedData("all1", 60, fetcher)
    await getMemoryCachedData("all2", 60, fetcher)
    expect(fetcher).toHaveBeenCalledTimes(4)
  })

  it("handles fetcher rejection", async () => {
    const error = new Error("fetch failed")
    const fetcher = vi.fn().mockRejectedValue(error)
    await expect(getMemoryCachedData("fail", 60, fetcher)).rejects.toThrow("fetch failed")
  })
})
