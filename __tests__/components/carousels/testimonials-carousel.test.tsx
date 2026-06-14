import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import TestimonialsCarousel from "@/components/carousels/testimonials-carousel"
import type { Testimonial } from "@/type/supabase"

const makeTestimonial = (overrides: Partial<Testimonial> = {}): Testimonial => ({
  id: "1",
  tenant_id: "tenant-1",
  message: "Great service!",
  image_url: null,
  full_name: "John Doe",
  star_rating: 5,
  is_active: true,
  display_order: 0,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  ...overrides,
})

describe("TestimonialsCarousel", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("returns null when no testimonials", () => {
    const { container } = render(<TestimonialsCarousel testimonials={[]} />)
    expect(container.innerHTML).toBe("")
  })

  it("returns null when all testimonials are inactive", () => {
    const { container } = render(
      <TestimonialsCarousel testimonials={[makeTestimonial({ is_active: false })]} />
    )
    expect(container.innerHTML).toBe("")
  })

  it("renders the testimonial message and name", () => {
    render(<TestimonialsCarousel testimonials={[makeTestimonial()]} />)
    expect(screen.getByText("Great service!")).toBeDefined()
    expect(screen.getByText("John Doe")).toBeDefined()
  })

  it("renders the correct star rating", () => {
    render(
      <TestimonialsCarousel testimonials={[makeTestimonial({ star_rating: 4 })]} />
    )
    const container = screen.getByLabelText("4 star rating")
    expect(container).toBeDefined()
  })

  it("clamps star rating between 1 and 5", () => {
    const { rerender } = render(
      <TestimonialsCarousel testimonials={[makeTestimonial({ star_rating: 0 })]} />
    )
    expect(screen.getByLabelText("1 star rating")).toBeDefined()

    rerender(
      <TestimonialsCarousel testimonials={[makeTestimonial({ star_rating: 6 })]} />
    )
    expect(screen.getByLabelText("5 star rating")).toBeDefined()
  })

  it("shows initial letter avatar when no image_url", () => {
    render(
      <TestimonialsCarousel testimonials={[makeTestimonial({ image_url: null })]} />
    )
    expect(screen.getByText("J")).toBeDefined()
  })

  it("shows indicator dots when multiple testimonials", () => {
    const testimonials = [
      makeTestimonial({ id: "1" }),
      makeTestimonial({ id: "2" }),
    ]
    render(<TestimonialsCarousel testimonials={testimonials} />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it("hides indicator dots when only one testimonial", () => {
    render(<TestimonialsCarousel testimonials={[makeTestimonial()]} />)
    const buttons = screen.queryAllByRole("button")
    expect(buttons).toHaveLength(0)
  })

  it("rotates testimonials on interval", async () => {
    const testimonials = [
      makeTestimonial({ id: "1", message: "First" }),
      makeTestimonial({ id: "2", message: "Second" }),
    ]
    const { rerender } = render(<TestimonialsCarousel testimonials={testimonials} />)
    expect(screen.getByText("First")).toBeDefined()

    vi.advanceTimersByTime(4000)
    rerender(<TestimonialsCarousel testimonials={testimonials} />)
    expect(screen.getByText("Second")).toBeDefined()

    vi.advanceTimersByTime(4000)
    rerender(<TestimonialsCarousel testimonials={testimonials} />)
    expect(screen.getByText("First")).toBeDefined()
  })
})
