"use client";

import { useState } from "react";
import { submitTeamForm } from "@/lib/apicalls/team";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Field, FieldLabel } from "../ui/field";

export function JoinTeam() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await submitTeamForm(form);

      setSuccess(true);

      setForm({
        full_name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-start">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h3 className="text-2xl  md:text-3xl sm:text-md lg:text-2xl font-bold text-gray-900">
            Join Our Team
          </h3>

          <p className="text-base leading-7 text-[#344054]">
            Are you driven and coachable? Join US as a financial services
            entrepreneur. Training provided. No experience necessary. Apply from
            anywhere in US and Canada. 100% remote possible. Assistance and
            training provided to get licensed.
          </p>

          <p className="text-sm text-[#667085] italic">*Conditions apply</p>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-sm"
        >
          <Field>
            <FieldLabel htmlFor="full_name">Full Name</FieldLabel>
            <Input
              id="full_name"
              name="full_name"
              placeholder="Enter your full name"
              value={form.full_name}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <Textarea
              id="message"
              name="message"
              placeholder="Write your message (optional)"
              value={form.message}
              onChange={handleChange}
              rows={4}
            />
          </Field>

          <Button
            variant="default"
            className="w-full px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>

          {success && (
            <p className="text-sm text-green-600 text-center">
              Your request has been submitted successfully.
            </p>
          )}

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </form>
      </div>
    </section>
  );
}
