"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { AuthShell } from "@/components/auth-shell";
import { useStore } from "@/components/providers/store-provider";
import { Button, buttonStyles } from "@/components/ui/button";

type SignUpErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignUpPage() {
  const { account, signUp, signOut } = useStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<SignUpErrors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: SignUpErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = "Please enter a display name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (password.length < 6) {
      nextErrors.password = "Use at least 6 characters.";
    }
    if (confirmPassword !== password) {
      nextErrors.confirmPassword = "The passwords do not match.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Passwords are validated here and discarded. Only the display name and
    // email are saved, and only in this browser.
    signUp({ name, email });
    router.push("/account");
  }

  if (account) {
    return (
      <AuthShell
        eyebrow="Demo account"
        title="A demo account is already active."
        description="Sign out first if you would like to create a different local demo profile."
      >
        <div>
          <p className="font-serif text-2xl">Hello, {account.name}.</p>
          <p className="mt-2 text-sm leading-7 text-charcoal/60">
            You are signed in as {account.email} in this browser.
          </p>
          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <Link href="/account" className={buttonStyles({ size: "lg" })}>
              View your account
            </Link>
            <Button variant="outline" size="lg" onClick={() => signOut()}>
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
      title="Create a profile."
      description="A local demo account for exploring the storefront. Your password is never stored."
    >
      <div>
        <h2 className="font-serif text-2xl">Create account</h2>
        <p className="mt-2 text-sm leading-6 text-charcoal/55">
          Only your display name and email are saved, and only in this browser.
          The password is used for this form and then discarded.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
          <div>
            <label
              htmlFor="signup-name"
              className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-charcoal/60"
            >
              Display name
            </label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setErrors((current) => ({ ...current, name: undefined }));
              }}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "signup-name-error" : undefined}
              className="mt-2 h-11 w-full border border-charcoal/20 bg-ivory/70 px-3 text-sm outline-none transition-colors focus:border-charcoal"
            />
            {errors.name ? (
              <p id="signup-name-error" role="alert" className="mt-1.5 text-xs text-red-700">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-charcoal/60"
            >
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((current) => ({ ...current, email: undefined }));
              }}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "signup-email-error" : undefined}
              className="mt-2 h-11 w-full border border-charcoal/20 bg-ivory/70 px-3 text-sm outline-none transition-colors focus:border-charcoal"
            />
            {errors.email ? (
              <p id="signup-email-error" role="alert" className="mt-1.5 text-xs text-red-700">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-charcoal/60"
            >
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrors((current) => ({ ...current, password: undefined }));
                }}
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "signup-password-error" : "signup-password-hint"
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
              <p id="signup-password-error" role="alert" className="mt-1.5 text-xs text-red-700">
                {errors.password}
              </p>
            ) : (
              <p id="signup-password-hint" className="mt-1.5 text-[0.68rem] text-charcoal/45">
                At least 6 characters. Never stored.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="signup-confirm"
              className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-charcoal/60"
            >
              Confirm password
            </label>
            <input
              id="signup-confirm"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setErrors((current) => ({
                  ...current,
                  confirmPassword: undefined,
                }));
              }}
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword ? "signup-confirm-error" : undefined
              }
              className="mt-2 h-11 w-full border border-charcoal/20 bg-ivory/70 px-3 text-sm outline-none transition-colors focus:border-charcoal"
            />
            {errors.confirmPassword ? (
              <p id="signup-confirm-error" role="alert" className="mt-1.5 text-xs text-red-700">
                {errors.confirmPassword}
              </p>
            ) : null}
          </div>

          <Button type="submit" size="lg" className="w-full">
            Create demo account
          </Button>
        </form>

        <p className="mt-6 text-sm text-charcoal/55">
          Already have a demo profile?{" "}
          <Link
            href="/login"
            className="text-charcoal underline decoration-charcoal/30 underline-offset-4 hover:decoration-charcoal"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
