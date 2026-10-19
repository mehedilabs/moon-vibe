const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

/** Format a numeric price as Bangladeshi Taka, e.g. ৳12,500. */
export function formatPrice(value: number): string {
  return `৳${numberFormatter.format(value)}`;
}

/** Turn "quiet-hours" into "Quiet Hours". */
export function titleCase(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
