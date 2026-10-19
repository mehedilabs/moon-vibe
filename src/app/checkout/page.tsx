"use client";

import Link from "next/link";
import { Check, LockKeyhole, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/components/providers/store-provider";
import { Button, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { formatPrice } from "@/lib/format";
import { getProductById } from "@/lib/products";

interface CheckoutFields {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

type FieldErrors = Partial<Record<keyof CheckoutFields, string>>;

const initialFields: CheckoutFields = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

export default function CheckoutPage() {
  const { hydrated, cart, cartCount, clearCart } = useStore();
  const [fields, setFields] = useState<CheckoutFields>(initialFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [placed, setPlaced] = useState<{
    name: string;
    total: number;
    count: number;
  } | null>(null);

  const items = cart.flatMap((line) => {
    const product = getProductById(line.productId);
    return product ? [{ line, product }] : [];
  });

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.line.quantity,
    0,
  );

  function setField(key: keyof CheckoutFields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (fields.name.trim().length < 2) {
      next.name = "Please enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    const digits = fields.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) {
      next.phone = "Please enter a valid phone number.";
    }
    if (fields.address.trim().length < 6) {
      next.address = "Please enter a delivery address.";
    }
    if (fields.city.trim().length < 2) {
      next.city = "Please enter a city or district.";
    }
    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // The form values stay in memory only. Nothing is stored or sent.
    setPlaced({
      name: fields.name.trim(),
      total: subtotal,
      count: cartCount,
    });
    clearCart();
    setFields(initialFields);
  }

  if (placed) {
    return (
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-xl border border-charcoal/10 bg-white/40 px-6 py-12 text-center sm:px-10 sm:py-14">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-olive/15 text-olive">
            <Check className="size-6" aria-hidden="true" />
          </div>
          <p className="mt-6 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-olive">
            Demo checkout complete
          </p>
          <h1 className="mt-3 font-serif text-3xl tracking-[-0.02em] sm:text-4xl">
            Thank you, {placed.name.split(" ")[0]}.
          </h1>
          <p className="mt-4 text-sm leading-7 text-charcoal/60">
            This was a demonstration of the checkout flow. No order was placed,
            no payment was taken, and no information was stored or sent
            anywhere.
          </p>
          <div className="mx-auto mt-7 flex max-w-xs items-center justify-between border-y border-charcoal/10 py-4 text-sm">
            <span className="text-charcoal/55">
              {placed.count} {placed.count === 1 ? "item" : "items"}
            </span>
            <span className="tabular-nums">{formatPrice(placed.total)}</span>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Link href="/shop" className={buttonStyles({ size: "lg" })}>
              Continue shopping
            </Link>
            <Link
              href="/"
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div>
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-olive">
          Almost there
        </p>
        <h1 className="mt-3 font-serif text-[clamp(2.4rem,6vw,4rem)] leading-[1] tracking-[-0.03em]">
          Demo checkout
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-charcoal/55">
          A working example of a checkout screen. Fields are validated in the
          browser, but nothing is submitted or stored.
        </p>
      </div>

      <div className="mt-9 sm:mt-12">
        {!hydrated ? (
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div className="h-96 animate-pulse bg-beige/50" />
            <div className="h-72 animate-pulse bg-beige/50" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="size-5" aria-hidden="true" />}
            title="Your bag is empty"
            description="Add a piece to your bag before starting the demo checkout."
            action={{ href: "/shop", label: "Continue shopping" }}
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <form onSubmit={handleSubmit} noValidate className="order-2 lg:order-1">
              <div className="border border-charcoal/10 bg-white/35 p-5 sm:p-7">
                <h2 className="font-serif text-2xl">Contact &amp; delivery</h2>
                <p className="mt-2 text-xs leading-5 text-charcoal/45">
                  Use any details — they are only used to validate this demo
                  form.
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <CheckoutField
                    id="checkout-name"
                    label="Full name"
                    value={fields.name}
                    onChange={(value) => setField("name", value)}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <CheckoutField
                    id="checkout-email"
                    label="Email"
                    type="email"
                    value={fields.email}
                    onChange={(value) => setField("email", value)}
                    error={errors.email}
                    autoComplete="email"
                  />
                  <CheckoutField
                    id="checkout-phone"
                    label="Phone"
                    type="tel"
                    value={fields.phone}
                    onChange={(value) => setField("phone", value)}
                    error={errors.phone}
                    autoComplete="tel"
                  />
                  <CheckoutField
                    id="checkout-city"
                    label="City or district"
                    value={fields.city}
                    onChange={(value) => setField("city", value)}
                    error={errors.city}
                    autoComplete="address-level2"
                  />
                  <CheckoutField
                    id="checkout-address"
                    label="Delivery address"
                    value={fields.address}
                    onChange={(value) => setField("address", value)}
                    error={errors.address}
                    autoComplete="street-address"
                    className="sm:col-span-2"
                  />
                  <CheckoutField
                    id="checkout-postal"
                    label="Postal code (optional)"
                    value={fields.postalCode}
                    onChange={(value) => setField("postalCode", value)}
                    autoComplete="postal-code"
                  />
                </div>
              </div>

              <div className="mt-5 flex gap-3 border border-charcoal/10 bg-beige/35 p-4 text-xs leading-6 text-charcoal/60">
                <LockKeyhole className="mt-0.5 size-4 shrink-0 text-olive" aria-hidden="true" />
                <p>
                  No payment details are collected. This form has no backend,
                  no database, and no connection to a payment provider.
                </p>
              </div>

              <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
                Place demo order
              </Button>
            </form>

            <aside className="order-1 h-fit border border-charcoal/10 bg-white/40 p-5 sm:p-6 lg:order-2 lg:sticky lg:top-28">
              <h2 className="font-serif text-2xl">Your bag</h2>
              <ul className="mt-4 divide-y divide-charcoal/10 border-b border-charcoal/10">
                {items.map(({ line, product }) => (
                  <li
                    key={`${line.productId}-${line.size ?? "one-size"}`}
                    className="flex items-start justify-between gap-4 py-3 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-serif text-[0.95rem]">
                        {product.name}
                      </p>
                      <p className="mt-0.5 text-xs text-charcoal/50">
                        {line.size ? `Size ${line.size} · ` : ""}Qty{" "}
                        {line.quantity}
                      </p>
                    </div>
                    <span className="shrink-0 tabular-nums">
                      {formatPrice(product.price * line.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="uppercase tracking-[0.12em] text-charcoal/55">
                  Total
                </span>
                <span className="text-lg tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-4 text-[0.68rem] leading-5 text-charcoal/45">
                Demo only. Placing this order empties the bag and shows a
                confirmation, but does not create a real order.
              </p>
            </aside>
          </div>
        )}
      </div>
    </Container>
  );
}

function CheckoutField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-charcoal/60"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 h-11 w-full border border-charcoal/20 bg-ivory/70 px-3 text-sm outline-none transition-colors focus:border-charcoal"
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
