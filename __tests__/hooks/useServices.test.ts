import { describe, it, expect } from "vitest"
import { renderHook } from "@testing-library/react"
import { useServices } from "@/hooks/useServices"
import type { ServiceItem } from "@/type/supabase"

const makeService = (overrides: Partial<ServiceItem> = {}): ServiceItem => ({
  id: "1",
  tenant_id: "tenant-1",
  slug: "test-service",
  service_name: "Test Service",
  short_description: "A service",
  image_url: null,
  heading: null,
  subheading: null,
  content: "<p>Content</p>",
  is_active: true,
  display_order: 0,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  service_faqs: [],
  ...overrides,
})

describe("useServices", () => {
  it("returns sorted active services", () => {
    const services = [
      makeService({ id: "1", display_order: 2 }),
      makeService({ id: "2", display_order: 1 }),
    ]
    const { result } = renderHook(() => useServices({ initialServices: services }))
    expect(result.current.services).toHaveLength(2)
    expect(result.current.services[0].id).toBe("2")
  })

  it("filters out inactive services", () => {
    const services = [
      makeService({ id: "1", is_active: true }),
      makeService({ id: "2", is_active: false }),
    ]
    const { result } = renderHook(() => useServices({ initialServices: services }))
    expect(result.current.services).toHaveLength(1)
  })

  it("returns hasServices as false when empty", () => {
    const { result } = renderHook(() => useServices())
    expect(result.current.hasServices).toBe(false)
  })

  it("returns hasServices as true when services exist", () => {
    const { result } = renderHook(() => useServices({ initialServices: [makeService()] }))
    expect(result.current.hasServices).toBe(true)
  })
})
