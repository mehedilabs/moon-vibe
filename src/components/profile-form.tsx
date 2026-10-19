"use client";

import { useState } from "react";
import { useStore, type AccountProfile } from "@/components/providers/store-provider";
import { Button } from "@/components/ui/button";

type ProfileErrors = {
  name?: string;
  email?: string;
  avatarUrl?: string;
};

export function ProfileForm({ account }: { account: AccountProfile }) {
  const { updateProfile } = useStore();
  const [name, setName] = useState(account.name);
  const [email, setEmail] = useState(account.email);
  const [avatarUrl, setAvatarUrl] = useState(account.avatarUrl ?? "");
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: ProfileErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = "Please enter a display name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    const trimmedAvatar = avatarUrl.trim();
    if (trimmedAvatar && !/^https?:\/\/\S+$/i.test(trimmedAvatar)) {
      nextErrors.avatarUrl = "Use a full http(s) image URL, or leave this empty.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSaved(false);
      return;
    }

    updateProfile({
      name,
      email,
      avatarUrl: trimmedAvatar || undefined,
    });
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
      <div>
        <label
          htmlFor="profile-name"
          className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-charcoal/60"
        >
          Display name
        </label>
        <input
          id="profile-name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setSaved(false);
            setErrors((current) => ({ ...current, name: undefined }));
          }}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "profile-name-error" : undefined}
          className="mt-2 h-11 w-full border border-charcoal/20 bg-ivory/70 px-3 text-sm outline-none transition-colors focus:border-charcoal"
        />
        {errors.name ? (
          <p id="profile-name-error" role="alert" className="mt-1.5 text-xs text-red-700">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="profile-email"
          className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-charcoal/60"
        >
          Email
        </label>
        <input
          id="profile-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setSaved(false);
            setErrors((current) => ({ ...current, email: undefined }));
          }}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "profile-email-error" : undefined}
          className="mt-2 h-11 w-full border border-charcoal/20 bg-ivory/70 px-3 text-sm outline-none transition-colors focus:border-charcoal"
        />
        {errors.email ? (
          <p id="profile-email-error" role="alert" className="mt-1.5 text-xs text-red-700">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="profile-avatar"
          className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-charcoal/60"
        >
          Profile image URL (optional)
        </label>
        <input
          id="profile-avatar"
          type="url"
          value={avatarUrl}
          onChange={(event) => {
            setAvatarUrl(event.target.value);
            setSaved(false);
            setErrors((current) => ({ ...current, avatarUrl: undefined }));
          }}
          placeholder="https://example.com/avatar.jpg"
          aria-invalid={Boolean(errors.avatarUrl)}
          aria-describedby={
            errors.avatarUrl ? "profile-avatar-error" : "profile-avatar-hint"
          }
          className="mt-2 h-11 w-full border border-charcoal/20 bg-ivory/70 px-3 text-sm outline-none transition-colors focus:border-charcoal"
        />
        {errors.avatarUrl ? (
          <p id="profile-avatar-error" role="alert" className="mt-1.5 text-xs text-red-700">
            {errors.avatarUrl}
          </p>
        ) : (
          <p id="profile-avatar-hint" className="mt-1.5 text-[0.68rem] leading-5 text-charcoal/45">
            The URL is saved locally. External images may not load; a monogram
            fallback is used instead.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button type="submit">Save profile</Button>
        <p aria-live="polite" className="text-xs text-olive">
          {saved ? "Profile saved in this browser." : ""}
        </p>
      </div>
    </form>
  );
}
