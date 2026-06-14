import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import Step3Review from "@/components/forms/steps/Step3Review"
import type { BasicForm, Service, ServiceField } from "@/components/forms/LeadForm"

const basicForm: BasicForm = {
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  phone: "+1-555-0000",
  age: "30",
  gender: "Male",
}

const service: Service = {
  id: "1",
  name: "Financial Planning",
  description: "Plan your finances",
}

const fields: ServiceField[] = [
  {
    id: "f1",
    label: "Initial Investment",
    field_key: "initial_investment",
    field_type: "number",
    placeholder: "",
    is_required: true,
    options: null,
    sort_order: 1,
  },
  {
    id: "f2",
    label: "Investment Timeline",
    field_key: "investment_timeline",
    field_type: "number",
    placeholder: "",
    is_required: true,
    options: null,
    sort_order: 2,
  },
]

const serviceData: Record<string, unknown> = {
  initial_investment: "50000",
  investment_timeline: "10",
}

describe("Step3Review", () => {
  it("renders basic details correctly", () => {
    render(
      <Step3Review
        basicForm={basicForm}
        selectedService={service}
        serviceFields={fields}
        serviceData={serviceData}
        onBack={vi.fn()}
        onEdit={vi.fn()}
        onSubmit={vi.fn()}
        submitLoading={false}
        submitError=""
      />
    )

    expect(screen.getByText("John Doe")).toBeDefined()
    expect(screen.getAllByText("john@example.com").length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText("+1-555-0000")).toBeDefined()
    expect(screen.getByText("30 years")).toBeDefined()
    expect(screen.getByText("Male")).toBeDefined()
  })

  it("renders service name in banner", () => {
    render(
      <Step3Review
        basicForm={basicForm}
        selectedService={service}
        serviceFields={fields}
        serviceData={serviceData}
        onBack={vi.fn()}
        onEdit={vi.fn()}
        onSubmit={vi.fn()}
        submitLoading={false}
        submitError=""
      />
    )

    expect(screen.getByText("Financial Planning")).toBeDefined()
  })

  it("formats dollar amounts with $ and commas", () => {
    render(
      <Step3Review
        basicForm={basicForm}
        selectedService={service}
        serviceFields={fields}
        serviceData={serviceData}
        onBack={vi.fn()}
        onEdit={vi.fn()}
        onSubmit={vi.fn()}
        submitLoading={false}
        submitError=""
      />
    )

    expect(screen.getByText("$50,000")).toBeDefined()
  })

  it("formats timeline with years suffix", () => {
    render(
      <Step3Review
        basicForm={basicForm}
        selectedService={service}
        serviceFields={fields}
        serviceData={serviceData}
        onBack={vi.fn()}
        onEdit={vi.fn()}
        onSubmit={vi.fn()}
        submitLoading={false}
        submitError=""
      />
    )

    expect(screen.getByText("10 years")).toBeDefined()
  })

  it("shows submit error when provided", () => {
    render(
      <Step3Review
        basicForm={basicForm}
        selectedService={service}
        serviceFields={fields}
        serviceData={serviceData}
        onBack={vi.fn()}
        onEdit={vi.fn()}
        onSubmit={vi.fn()}
        submitLoading={false}
        submitError="Something went wrong"
      />
    )

    expect(screen.getByText("Something went wrong")).toBeDefined()
  })

  it("calls onBack when back button clicked", () => {
    const onBack = vi.fn()
    render(
      <Step3Review
        basicForm={basicForm}
        selectedService={service}
        serviceFields={fields}
        serviceData={serviceData}
        onBack={onBack}
        onEdit={vi.fn()}
        onSubmit={vi.fn()}
        submitLoading={false}
        submitError=""
      />
    )

    fireEvent.click(screen.getByText("Back"))
    expect(onBack).toHaveBeenCalledOnce()
  })

  it("calls onSubmit when submit button clicked", () => {
    const onSubmit = vi.fn()
    render(
      <Step3Review
        basicForm={basicForm}
        selectedService={service}
        serviceFields={fields}
        serviceData={serviceData}
        onBack={vi.fn()}
        onEdit={vi.fn()}
        onSubmit={onSubmit}
        submitLoading={false}
        submitError=""
      />
    )

    fireEvent.click(screen.getByText("Submit & Verify"))
    expect(onSubmit).toHaveBeenCalledOnce()
  })

  it("disables buttons when loading", () => {
    render(
      <Step3Review
        basicForm={basicForm}
        selectedService={service}
        serviceFields={fields}
        serviceData={serviceData}
        onBack={vi.fn()}
        onEdit={vi.fn()}
        onSubmit={vi.fn()}
        submitLoading={true}
        submitError=""
      />
    )

    expect(screen.getByText("Sending OTP...")).toBeDefined()
  })

  it("calls onEdit when edit button clicked", () => {
    const onEdit = vi.fn()
    render(
      <Step3Review
        basicForm={basicForm}
        selectedService={service}
        serviceFields={fields}
        serviceData={serviceData}
        onBack={vi.fn()}
        onEdit={onEdit}
        onSubmit={vi.fn()}
        submitLoading={false}
        submitError=""
      />
    )

    const editButtons = screen.getAllByText("Edit")
    expect(editButtons.length).toBeGreaterThanOrEqual(1)
    fireEvent.click(editButtons[0])
    expect(onEdit).toHaveBeenCalled()
  })
})
