import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { MoonMark } from "@/components/ui/logo";

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-5xl overflow-hidden border border-charcoal/10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-between gap-10 bg-charcoal p-7 text-ivory sm:p-10 lg:p-12">
          <div>
            <MoonMark className="size-7 text-beige/80" />
            <p className="mt-8 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-beige/60">
              {eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-7 text-ivory/60">
              {description}
            </p>
          </div>
          <div className="border-t border-ivory/15 pt-5">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-beige/55">
              Front-end demo
            </p>
            <p className="mt-2 text-xs leading-6 text-ivory/50">
              There is no backend, database, or real authentication. Your demo
              profile is stored only in this browser, and passwords are never
              saved.
            </p>
          </div>
        </div>
        <div className="bg-white/45 p-6 sm:p-10 lg:p-12">{children}</div>
      </div>
    </Container>
  );
}
