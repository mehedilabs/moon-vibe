"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { AuthShell } from "@/components/auth-shell";
import { useStore } from "@/components/providers/store-provider";
import { Button, buttonStyles } from "@/components/ui/button";

export default function LoginPage() {
  const { account, signIn, signOut } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: { email?: string; password?: string } = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (password.length < 6) {
      nextErrors.password = "Use at least 6 characters.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // The password is validated here and immediately discarded. Only the
    // email is used to create the local demo session.
    signIn(email);
    router.push("/account");
  }

  if (account) {
    return (
      <AuthShell
        eyebrow="Demo account"
        title="You are already signed in."
        description="This local demo session is active in your browser."
      >
        <div>
          <p className="font-serif text-2xl">Hello, {account.name}.</p>
          <p className="mt-2 text-sm leading-7 text-charcoal/60">
            Signed in as {account.email}. This is a front-end demo session, not
            a real account.
          </p>
          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <Link href="/account" className={buttonStyles({ size: "lg" })}>
              View your account
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </div>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Demo account"
      title="Welcome back."
      description="Sign in to a local demo account. No password is stored or verified against a server."
    >
      <div>
        <h2 className="font-serif text-2xl">Sign in</h2>
        <p className="mt-2 text-sm leading-6 text-charcoal/55">
          Use any valid email and a password of 6 or more characters. The
          password is checked in your browser only and is never saved.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
          <div>
            <label
              htmlFor="login-email"
              className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-charcoal/60"
            >
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((current) => ({ ...current, email: undefined }));
              }}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "login-email-error" : undefined}
              className="mt-2 h-11 w-full border border-charcoal/20 bg-ivory/70 px-3 text-sm outline-none transition-colors focus:border-charcoal"
            />
            {errors.email ? (
              <p id="login-email-error" role="alert" className="mt-1.5 text-xs text-red-700">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-charcoal/60"
            >
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrors((current) => ({ ...current, password: undefined }));
                }}
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "login-password-error" : undefined
                }
                className="h-11 w-full border border-charcoal/20 bg-ivory/70 px-3 pr-11 text-sm outline-none transition-colors focus:border-charcoal"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-1 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-charcoal/45 hover:bg-charcoal/6 hover:text-charcoal"
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password ? (
              <p id="login-password-error" role="alert" className="mt-1.5 text-xs text-red-700">
                {errors.password}
              </p>
            ) : null}
          </div>

          <Button type="submit" size="lg" className="w-full">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-sm text-charcoal/55">
          New here?{" "}
          <Link
            href="/signup"
            className="text-charcoal underline decoration-charcoal/30 underline-offset-4 hover:decoration-charcoal"
          >
            Create a demo account
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
