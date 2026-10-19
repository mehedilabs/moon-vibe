import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center sm:py-24">
      <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-olive">
        404 — not found
      </p>
      <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-0.03em] sm:text-6xl">
        This page has wandered off.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-charcoal/60">
        The page you were looking for does not exist, or the piece may have
        moved. Let&apos;s get you back to the collection.
      </p>
      <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
        <Link href="/" className={buttonStyles({ size: "lg" })}>
          Back to home
        </Link>
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
