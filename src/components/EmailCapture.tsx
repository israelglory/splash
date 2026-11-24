"use client";

import { useId, useState, type FormEvent } from "react";
import { launchpad, mailto } from "@/content";
import { registerInterest } from "@/lib/subscribe";
import { ArrowRight, Check } from "./ui/Icons";

type Status = "idle" | "sending" | "success" | "invalid" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const { form } = launchpad;

export function EmailCapture() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      await registerInterest(value);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex items-start gap-3 rounded-2xl bg-ink p-5 text-paper">
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-green text-ink">
          <Check size={16} strokeWidth={2.5} />
        </span>
        <p className="font-medium">{form.success}</p>
      </div>
    );
  }

  const hasError = status === "invalid" || status === "error";
  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${id}-note`}>
      <label htmlFor={`${id}-email`} className="text-sm font-semibold">
        {form.label}
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder={form.placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (hasError) setStatus("idle");
          }}
          aria-invalid={status === "invalid"}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className="min-h-12 w-full min-w-0 flex-1 rounded-full border border-paper-3 bg-paper px-5 text-[1rem] text-ink placeholder:text-soft-on-light/70 focus-visible:border-green-deep aria-[invalid=true]:border-[#b3261e]"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold text-paper transition-colors hover:bg-green-deep disabled:opacity-70"
        >
          {status === "sending" ? `${form.sending}…` : form.button}
          {status !== "sending" && <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />}
        </button>
      </div>
      <p id={`${id}-error`} role="alert" className="mt-2 min-h-6 text-sm font-medium text-[#9b1c15]">
        {status === "invalid" && form.invalid}
        {status === "error" && (
          <>
            {form.error}{" "}
            <a href={mailto("Splash Launchpad interest")} className="underline underline-offset-2">
              Email us
            </a>
          </>
        )}
      </p>
      <p id={`${id}-note`} className="text-sm text-soft">
        {form.privacy}
      </p>
    </form>
  );
}
