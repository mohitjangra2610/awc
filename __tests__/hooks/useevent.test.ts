import { describe, it, expect } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useEvents } from "@/hooks/useevent"
import type { EventItem } from "@/type/supabase"

const makeEvent = (overrides: Partial<EventItem> = {}): EventItem => ({
  id: "1",
  tenant_id: "tenant-1",
  event_name: "Test Event",
  slug: "test-event",
  event_type: "online",
  event_tag: "free",
  status: "upcoming",
  registration_link: "https://example.com/register",
  online_platform: null,
  online_join_label: null,
  short_description: null,
  complete_description: "<p>Description</p>",
  cover_image_url: null,
  is_active: true,
  display_order: 0,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  event_addresses: [],
  event_organizers: [],
  event_gallery: [],
  ...overrides,
})

describe("useEvents", () => {
  it("returns all events with 'all' filter", () => {
    const events = [
      makeEvent({ id: "1", event_type: "online", display_order: 1 }),
      makeEvent({ id: "2", event_type: "offline", display_order: 2 }),
    ]
    const { result } = renderHook(() => useEvents({ initialEvents: events }))
    expect(result.current.filteredEvents).toHaveLength(2)
    expect(result.current.hasEvents).toBe(true)
  })

  it("filters by online type", () => {
    const events = [
      makeEvent({ id: "1", event_type: "online" }),
      makeEvent({ id: "2", event_type: "offline" }),
    ]
    const { result } = renderHook(() => useEvents({ initialEvents: events }))
    act(() => result.current.setSelectedFilter("online"))
    expect(result.current.filteredEvents).toHaveLength(1)
    expect(result.current.filteredEvents[0].id).toBe("1")
  })

  it("filters by offline type", () => {
    const events = [
      makeEvent({ id: "1", event_type: "online" }),
      makeEvent({ id: "2", event_type: "offline" }),
    ]
    const { result } = renderHook(() => useEvents({ initialEvents: events }))
    act(() => result.current.setSelectedFilter("offline"))
    expect(result.current.filteredEvents).toHaveLength(1)
    expect(result.current.filteredEvents[0].id).toBe("2")
  })

  it("resets filter to 'all'", () => {
    const events = [
      makeEvent({ id: "1", event_type: "online" }),
      makeEvent({ id: "2", event_type: "offline" }),
    ]
    const { result } = renderHook(() => useEvents({ initialEvents: events }))
    act(() => result.current.setSelectedFilter("offline"))
    act(() => result.current.resetFilter())
    expect(result.current.selectedFilter).toBe("all")
    expect(result.current.filteredEvents).toHaveLength(2)
  })

  it("filters out inactive events", () => {
    const events = [
      makeEvent({ id: "1", is_active: true }),
      makeEvent({ id: "2", is_active: false }),
    ]
    const { result } = renderHook(() => useEvents({ initialEvents: events }))
    expect(result.current.events).toHaveLength(1)
  })

  it("filters out completed and registration_closed events", () => {
    const events = [
      makeEvent({ id: "1", status: "upcoming" }),
      makeEvent({ id: "2", status: "ongoing" }),
      makeEvent({ id: "3", status: "completed" }),
      makeEvent({ id: "4", status: "registration_closed" }),
    ]
    const { result } = renderHook(() => useEvents({ initialEvents: events }))
    expect(result.current.events).toHaveLength(2)
    expect(result.current.ongoingEvents).toHaveLength(1)
    expect(result.current.upcomingEvents).toHaveLength(1)
  })

  it("sorts by display_order then start_at", () => {
    const events = [
      makeEvent({ id: "1", display_order: 2, event_addresses: [{ id: "a1", event_id: "1", address_line_1: "", city: "", zipcode: "", state: "", country: "", google_map_location: "", start_at: "2026-08-01T00:00:00Z", end_at: null, location_label: null, display_order: 0, created_at: "" }] }),
      makeEvent({ id: "2", display_order: 1, event_addresses: [{ id: "a2", event_id: "2", address_line_1: "", city: "", zipcode: "", state: "", country: "", google_map_location: "", start_at: "2026-07-01T00:00:00Z", end_at: null, location_label: null, display_order: 0, created_at: "" }] }),
    ]
    const { result } = renderHook(() => useEvents({ initialEvents: events }))
    expect(result.current.events[0].id).toBe("2")
    expect(result.current.events[1].id).toBe("1")
  })

  it("sets hasEvents to false when no events", () => {
    const { result } = renderHook(() => useEvents())
    expect(result.current.hasEvents).toBe(false)
    expect(result.current.events).toEqual([])
  })
})
