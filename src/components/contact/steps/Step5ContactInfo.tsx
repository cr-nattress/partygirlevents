"use client";

import { useFormContext } from "react-hook-form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { FormValues } from "../InquiryForm";

const referralOptions = [
  { value: "google", label: "Google" },
  { value: "instagram", label: "Instagram" },
  { value: "referral", label: "Referral" },
  { value: "weddingwire", label: "WeddingWire" },
  { value: "the-knot", label: "The Knot" },
  { value: "other", label: "Other" },
];

export function Step5ContactInfo() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();

  const notesValue = watch("notes") ?? "";
  const referralValue = watch("referralSource") ?? "";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          Your Contact Information
        </h2>
        <p className="mt-2 text-muted">
          Almost there! Tell us how to reach you.
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-4">
        {/* Name fields */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="First Name"
            required
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <Input
            label="Last Name"
            required
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>

        {/* Email */}
        <Input
          label="Email"
          type="email"
          required
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Phone */}
        <Input
          label="Phone"
          type="tel"
          placeholder="(optional)"
          {...register("phone")}
        />

        {/* Notes */}
        <Textarea
          label="Anything else you'd like us to know?"
          placeholder="Share any details, questions, or ideas..."
          maxLength={500}
          showCount
          value={notesValue}
          {...register("notes")}
        />

        {/* Referral Source */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            How did you hear about us?
          </label>
          <Select
            value={referralValue}
            onValueChange={(val) =>
              setValue("referralSource", val, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select one (optional)" />
            </SelectTrigger>
            <SelectContent>
              {referralOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Honeypot — hidden from real users */}
        <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("honeypot")}
          />
        </div>

        {/* Privacy note */}
        <p className="text-xs text-muted">
          By submitting this form you agree to our{" "}
          <Link
            href="/privacy"
            className="text-accent underline hover:text-accent/80"
          >
            Privacy Policy
          </Link>
          . We&apos;ll never share your information with third parties.
        </p>
      </div>
    </div>
  );
}
