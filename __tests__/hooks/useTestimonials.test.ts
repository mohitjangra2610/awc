import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"

vi.mock("@/lib/apicalls/testimonial", () => ({
  getTestimonials: vi.fn(),
}))

const mockTestimonials = [
  { id: "1", message: "Great!", full_name: "John", star_rating: 5, display_order: 1 },
]

describe("useTestimonials", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("returns loading state initially", async () => {
    const { getTestimonials } = await import("@/lib/apicalls/testimonial")
    vi.mocked(getTestimonials).mockResolvedValue(mockTestimonials)

    const { useTestimonials } = await import("@/hooks/useTestimonials")
    const { result } = renderHook(() => useTestimonials())
    expect(result.current.loading).toBe(true)
    expect(result.current.testimonials).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it("returns testimonials after successful fetch", async () => {
    const { getTestimonials } = await import("@/lib/apicalls/testimonial")
    vi.mocked(getTestimonials).mockResolvedValue(mockTestimonials)

    const { useTestimonials } = await import("@/hooks/useTestimonials")
    const { result } = renderHook(() => useTestimonials())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.testimonials).toEqual(mockTestimonials)
    expect(result.current.error).toBeNull()
  })

  it("sets error on fetch failure", async () => {
    const { getTestimonials } = await import("@/lib/apicalls/testimonial")
    vi.mocked(getTestimonials).mockRejectedValue(new Error("Network error"))

    const { useTestimonials } = await import("@/hooks/useTestimonials")
    const { result } = renderHook(() => useTestimonials())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.testimonials).toEqual([])
    expect(result.current.error).toBe("Failed to load testimonials")
  })
})
