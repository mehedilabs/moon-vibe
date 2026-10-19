import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "ghost" | "light" | "dark";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[0.02em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-charcoal text-ivory hover:bg-olive focus-visible:outline-charcoal",
  outline:
    "border border-charcoal/25 bg-transparent text-charcoal hover:border-charcoal hover:bg-white/60",
  ghost: "bg-transparent text-charcoal hover:bg-charcoal/6",
  light: "bg-ivory text-charcoal hover:bg-white",
  dark: "bg-white/10 text-white ring-1 ring-white/35 backdrop-blur-sm hover:bg-white/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-xs",
  md: "min-h-11 px-6 text-sm",
  lg: "min-h-12 px-7 text-sm",
  icon: "size-11 shrink-0",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
