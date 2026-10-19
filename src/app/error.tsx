"use client";

import Link from "next/link";
import { Button, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center sm:py-24">
      <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-olive">
        Something went wrong
      </p>
      <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl">
        A small interruption.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-charcoal/60">
        This part of the storefront could not be displayed. You can try again,
        or return to the collection.
      </p>
      <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
        <Button size="lg" onClick={() => reset()}>
          Try again
        </Button>
        <Link
          href="/shop"
          className={buttonStyles({ variant: "outline", size: "lg" })}
        >
          Shop all pieces
        </Link>
      </div>
    </Container>
  );
}
