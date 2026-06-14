import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useScrollEffect } from "@/hooks/useScrollEffect"

describe("useScrollEffect", () => {
  beforeEach(() => {
    vi.stubGlobal("window", {
      ...window,
      scrollY: 0,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("initializes as false", () => {
    const { result } = renderHook(() => useScrollEffect())
    expect(result.current).toBe(false)
  })

  it("adds and removes scroll event listener", () => {
    const addSpy = vi.fn()
    const removeSpy = vi.fn()
    vi.stubGlobal("window", {
      ...window,
      scrollY: 0,
      addEventListener: addSpy,
      removeEventListener: removeSpy,
    })

    const { unmount } = renderHook(() => useScrollEffect())
    expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function))

    unmount()
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function))
  })
})
