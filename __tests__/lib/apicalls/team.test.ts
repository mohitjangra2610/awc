import { describe, it, expect, vi, beforeEach } from "vitest"
import { submitTeamForm } from "@/lib/apicalls/team"

describe("submitTeamForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("submits valid form data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    }))

    const result = await submitTeamForm({
      full_name: "John Doe",
      email: "john@example.com",
      phone: "+1-555-0000",
      message: "Interested",
    })
    expect(result).toEqual({ success: true })
  })

  it("throws if full_name is empty", async () => {
    await expect(
      submitTeamForm({
        full_name: "",
        email: "john@example.com",
      })
    ).rejects.toThrow("Full name is required.")
  })

  it("throws if email is empty", async () => {
    await expect(
      submitTeamForm({
        full_name: "John Doe",
        email: "",
      })
    ).rejects.toThrow("Email is required.")
  })

  it("trims whitespace from fields before sending", async () => {
    let sentBody: string | undefined
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    }))

    await submitTeamForm({
      full_name: "  John Doe  ",
      email: "  john@example.com  ",
      phone: "  +1-555-0000  ",
      message: "  Interested  ",
    })

    const callArgs = vi.mocked(fetch).mock.calls[0]
    sentBody = callArgs[1]?.body as string
    const parsed = JSON.parse(sentBody)
    expect(parsed.full_name).toBe("John Doe")
    expect(parsed.email).toBe("john@example.com")
    expect(parsed.phone).toBe("+1-555-0000")
    expect(parsed.message).toBe("Interested")
  })

  it("sends null for empty phone and message", async () => {
    let sentBody: string | undefined
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    }))

    await submitTeamForm({
      full_name: "John",
      email: "john@test.com",
    })

    const callArgs = vi.mocked(fetch).mock.calls[0]
    sentBody = callArgs[1]?.body as string
    const parsed = JSON.parse(sentBody)
    expect(parsed.phone).toBeNull()
    expect(parsed.message).toBeNull()
  })

  it("throws on API error response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({ error: "Server error" }),
    }))

    await expect(
      submitTeamForm({ full_name: "John", email: "john@test.com" })
    ).rejects.toThrow("Server error")
  })

  it("throws generic error on API failure without error message", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({}),
    }))

    await expect(
      submitTeamForm({ full_name: "John", email: "john@test.com" })
    ).rejects.toThrow("Failed to submit team form.")
  })
})
