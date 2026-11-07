export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

type ButtonVariant = "rust" | "charcoal" | "outline-light" | "outline-dark";
type ButtonSize = "md" | "lg";

const buttonVariants: Record<ButtonVariant, string> = {
  rust: "bg-rust text-paper hover:bg-rust-hi",
  charcoal: "bg-charcoal text-paper hover:bg-charcoal-soft",
  "outline-light": "border border-paper/35 text-paper hover:border-paper hover:bg-paper/10",
  "outline-dark": "border border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-paper",
};

const buttonSizes: Record<ButtonSize, string> = {
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

/** Class list shared by every button-like link or button. Small radius, not a pill — matches the blueprint-rule aesthetic. */
export function buttonClasses(variant: ButtonVariant = "rust", size: ButtonSize = "md", extra?: string): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded font-medium whitespace-nowrap transition-colors duration-200",
    buttonSizes[size],
    buttonVariants[variant],
    extra,
  );
}

export const inputClasses =
  "h-12 w-full rounded border border-line bg-paper px-4 text-base text-ink placeholder:text-concrete/70 transition-colors focus:border-charcoal";

export const textareaClasses =
  "w-full rounded border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-concrete/70 transition-colors focus:border-charcoal resize-y";

/** Small rust underline used for inline text links, instead of a button, where that reads better. */
export const linkClasses =
  "inline-flex items-center gap-1.5 text-sm font-medium underline decoration-rust decoration-2 underline-offset-[5px] hover:decoration-charcoal";
