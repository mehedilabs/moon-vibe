"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setEmail("");
    setMessage(
      "Thanks — this is a demo, so no email was stored, sent, or subscribed.",
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label
        htmlFor="newsletter-email"
        className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-charcoal/55"
      >
        Email address
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError(null);
          }}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="h-12 min-w-0 flex-1 border border-charcoal/20 bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-charcoal/35 focus:border-charcoal"
        />
        <button
          type="submit"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-charcoal px-6 text-sm font-medium text-ivory transition-colors hover:bg-olive"
        >
          Join the list
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      {error ? (
        <p id="newsletter-error" role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      ) : null}
      <p aria-live="polite" className="mt-3 min-h-5 text-xs leading-5 text-charcoal/55">
        {message}
      </p>
      <p className="text-[0.68rem] leading-5 text-charcoal/40">
        Demo only — there is no mailing list and no email is stored or sent.
      </p>
    </form>
  );
}
