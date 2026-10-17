"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { validateEmail } from "@/lib/validation";
import { cn } from "@/lib/cn";

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = validateEmail(email);
    setError(next);
    if (next) return;
    setSuccess(true);
  }

  if (success) {
    return (
      <p className={cn("mt-4 text-sm", variant === "dark" ? "text-ivory" : "text-navy")}>
        Saved locally for this demo. A live newsletter service is not connected.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
      <label htmlFor={`newsletter-${variant}`} className="sr-only">
        Email address
      </label>
      <input
        id={`newsletter-${variant}`}
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        className={cn(
          "flex-1 border px-4 py-3 text-sm outline-none",
          variant === "dark"
            ? "border-white/20 bg-transparent text-ivory placeholder:text-slate"
            : "border-navy/15 bg-white",
        )}
        aria-invalid={Boolean(error)}
      />
      <Button type="submit" variant={variant === "dark" ? "light" : "primary"}>
        Join
      </Button>
      {error ? (
        <p className="basis-full text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
