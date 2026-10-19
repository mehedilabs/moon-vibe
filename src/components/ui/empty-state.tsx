import Link from "next/link";
import type { ReactNode } from "react";
import { buttonStyles } from "@/components/ui/button";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col items-center border border-charcoal/10 bg-white/40 px-6 py-16 text-center sm:py-20">
      <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-beige/70 text-charcoal">
        {icon}
      </div>
      <h2 className="font-serif text-2xl tracking-[-0.01em]">{title}</h2>
      <p className="mt-3 max-w-md text-sm leading-7 text-charcoal/65">
        {description}
      </p>
      {action ? (
        <Link href={action.href} className={buttonStyles({ className: "mt-7" })}>
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
