import { describe, it, expect } from "vitest"
import { renderHook } from "@testing-library/react"
import { usePartners } from "@/hooks/usepartner"
import type { Partner } from "@/type/supabase"

const makePartner = (overrides: Partial<Partner> = {}): Partner => ({
  id: "1",
  tenant_id: "tenant-1",
  company_name: "Test Partner",
  slug: "test-partner",
  logo_url: "https://example.com/logo.png",
  company_website: null,
  heading_text: null,
  short_description: "A partner",
  review: null,
  review_by: null,
  content: null,
  result: null,
  about_the_company: null,
  is_active: true,
  display_order: 0,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  ...overrides,
})

describe("usePartners", () => {
  it("returns sorted active partners", () => {
    const partners = [
      makePartner({ id: "1", display_order: 2 }),
      makePartner({ id: "2", display_order: 1 }),
    ]
    const { result } = renderHook(() => usePartners({ initialPartners: partners }))
    expect(result.current.partners).toHaveLength(2)
    expect(result.current.partners[0].id).toBe("2")
  })

  it("filters out inactive partners", () => {
    const partners = [
      makePartner({ id: "1", is_active: true }),
      makePartner({ id: "2", is_active: false }),
    ]
    const { result } = renderHook(() => usePartners({ initialPartners: partners }))
    expect(result.current.partners).toHaveLength(1)
    expect(result.current.activePartners).toHaveLength(1)
  })

  it("returns hasPartners as false when empty", () => {
    const { result } = renderHook(() => usePartners())
    expect(result.current.hasPartners).toBe(false)
  })

  it("returns hasPartners as true when partners exist", () => {
    const { result } = renderHook(() => usePartners({ initialPartners: [makePartner()] }))
    expect(result.current.hasPartners).toBe(true)
  })
})
