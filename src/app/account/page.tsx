"use client";

import Link from "next/link";
import { Heart, LogOut, ShoppingBag, UserRound } from "lucide-react";
import { useState } from "react";
import { ProfileForm } from "@/components/profile-form";
import { useStore } from "@/components/providers/store-provider";
import { Button, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

function Avatar({
  name,
  avatarUrl,
  large = false,
}: {
  name: string;
  avatarUrl?: string;
  large?: boolean;
}) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const showImage = Boolean(avatarUrl) && failedUrl !== avatarUrl;
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-olive/20 font-serif text-olive ${
        large ? "size-20 text-2xl" : "size-12 text-base"
      }`}
    >
      {showImage && avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- user-provided remote avatar URLs cannot be statically configured.
        <img
          src={avatarUrl}
          alt=""
          className="size-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setFailedUrl(avatarUrl)}
        />
      ) : (
        <span aria-hidden="true">{initials || "MV"}</span>
      )}
    </div>
  );
}

export default function AccountPage() {
  const {
    hydrated,
    account,
    signOut,
    cartCount,
    wishlistCount,
  } = useStore();

  if (!hydrated) {
    return (
      <Container className="py-16 sm:py-24">
        <div className="mx-auto h-64 max-w-2xl animate-pulse bg-beige/50" />
      </Container>
    );
  }

  if (!account) {
    return (
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-xl border border-charcoal/10 bg-white/40 px-6 py-12 text-center sm:px-10">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-beige/70">
            <UserRound className="size-5" aria-hidden="true" />
          </div>
          <h1 className="mt-5 font-serif text-3xl tracking-[-0.02em] sm:text-4xl">
            Your account
          </h1>
          <p className="mt-3 text-sm leading-7 text-charcoal/60">
            You are not signed in. Sign in to explore the demo profile, or
            create a local account. This is a front-end demo — no real account
            is created.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Link href="/login" className={buttonStyles({ size: "lg" })}>
              Sign in
            </Link>
            <Link
              href="/signup"
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Create demo account
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="flex flex-col gap-5 border-b border-charcoal/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-olive">
            Demo account
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2.4rem,6vw,4rem)] leading-[1] tracking-[-0.03em]">
            Hello, {account.name.split(" ")[0]}.
          </h1>
          <p className="mt-2 text-sm text-charcoal/55">
            Signed in as {account.email} — locally, in this browser only.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-charcoal/15 px-3.5 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-charcoal/55">
          <span className="size-1.5 rounded-full bg-olive" aria-hidden="true" />
          Front-end demo session
        </span>
      </div>

      <div className="mt-9 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <aside>
          <div className="flex items-center gap-4">
            <Avatar
              name={account.name}
              avatarUrl={account.avatarUrl}
              large
            />
            <div className="min-w-0">
              <p className="truncate font-serif text-xl">{account.name}</p>
              <p className="mt-1 truncate text-sm text-charcoal/55">
                {account.email}
              </p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <Link
              href="/cart"
              className="border border-charcoal/10 bg-white/35 p-4 transition-colors hover:border-charcoal/25"
            >
              <ShoppingBag className="size-4 text-olive" aria-hidden="true" />
              <p className="mt-3 text-[0.62rem] uppercase tracking-[0.14em] text-charcoal/45">
                Shopping bag
              </p>
              <p className="mt-1 font-serif text-2xl">{cartCount}</p>
            </Link>
            <Link
              href="/wishlist"
              className="border border-charcoal/10 bg-white/35 p-4 transition-colors hover:border-charcoal/25"
            >
              <Heart className="size-4 text-olive" aria-hidden="true" />
              <p className="mt-3 text-[0.62rem] uppercase tracking-[0.14em] text-charcoal/45">
                Wishlist
              </p>
              <p className="mt-1 font-serif text-2xl">{wishlistCount}</p>
            </Link>
          </div>

          <Button
            variant="outline"
            className="mt-6 w-full sm:w-auto"
            onClick={() => signOut()}
          >
            <LogOut className="size-4" aria-hidden="true" />
            Sign out
          </Button>
        </aside>

        <div>
          <div className="border border-charcoal/10 bg-white/35 p-5 sm:p-7">
            <h2 className="font-serif text-2xl">Profile details</h2>
            <p className="mt-2 text-xs leading-5 text-charcoal/45">
              Update your demo profile. Changes are saved only in this browser.
            </p>
            <ProfileForm account={account} />
          </div>

          <div className="mt-5 border border-charcoal/10 bg-beige/35 p-4 text-xs leading-6 text-charcoal/60">
            <p>
              <strong className="font-medium text-charcoal">Demo only.</strong>{" "}
              There is no backend, database, or real authentication. Your
              password is never stored, and no personal data leaves this
              browser.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
