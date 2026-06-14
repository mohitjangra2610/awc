import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible")
  })

  it("merges tailwind classes correctly (later wins)", () => {
    expect(cn("px-4", "px-2")).toBe("px-2")
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500")
  })

  it("handles clsx array syntax", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz")
  })

  it("handles clsx object syntax", () => {
    expect(cn({ foo: true, bar: false })).toBe("foo")
  })

  it("returns empty string for no args", () => {
    expect(cn()).toBe("")
  })

  it("handles undefined and null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar")
  })

  it("resolves conflicting Tailwind classes", () => {
    expect(cn("p-4", "p-6")).toBe("p-6")
    expect(cn("hidden", "flex")).toBe("flex")
    expect(cn("bg-red-200", "bg-blue-300")).toBe("bg-blue-300")
  })
})
