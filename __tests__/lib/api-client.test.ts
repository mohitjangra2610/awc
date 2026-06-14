import { describe, it, expect, vi, beforeEach } from "vitest"
import { fetchFromAPI } from "@/lib/api-client"

describe("fetchFromAPI", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("makes a GET request to the correct endpoint", async () => {
    const mockJson = vi.fn().mockResolvedValue({ data: "test" })
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: mockJson,
    })
    vi.stubGlobal("fetch", mockFetch)

    const result = await fetchFromAPI<{ data: string }>("/events")
    expect(result).toEqual({ data: "test" })
    expect(mockFetch).toHaveBeenCalledWith("/api/events", {
      cache: "no-store",
      headers: { Accept: "application/json" },
    })
  })

  it("supports custom init options", async () => {
    const mockJson = vi.fn().mockResolvedValue({})
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: mockJson,
    })
    vi.stubGlobal("fetch", mockFetch)

    await fetchFromAPI("/test", {
      method: "POST",
      body: JSON.stringify({ foo: "bar" }),
      headers: { "X-Custom": "value" },
    })

    expect(mockFetch).toHaveBeenCalledWith("/api/test", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({ foo: "bar" }),
      headers: {
        Accept: "application/json",
        "X-Custom": "value",
      },
    })
  })

  it("throws on non-ok response", async () => {
    const mockText = vi.fn().mockResolvedValue("Not Found")
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: mockText,
    })
    vi.stubGlobal("fetch", mockFetch)

    await expect(fetchFromAPI("/missing")).rejects.toThrow(
      "Request to /missing failed (404): Not Found"
    )
  })

  it("throws on network error", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"))
    vi.stubGlobal("fetch", mockFetch)

    await expect(fetchFromAPI("/fail")).rejects.toThrow("Failed to fetch")
  })
})
