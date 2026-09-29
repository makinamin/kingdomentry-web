import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

const variants = {
  // Primary on light surfaces.
  blue: "rounded-sm bg-blue px-6 py-3.5 text-[15px] text-pearl hover:bg-blue-lift hover:text-pearl focus-visible:outline-gold",
  // CTA band and 404. Outline turns pearl on gold.
  gold: "rounded-sm bg-gold px-8 py-4 text-[15.5px] text-blue hover:bg-gold-hover hover:text-blue focus-visible:outline-pearl",
  // Header CTA on the immersive home.
  "gold-light":
    "rounded-sm bg-gold-light px-[22px] py-3 text-[14.5px] tracking-[0.02em] text-blue-deep hover:bg-gold-hover hover:text-blue-deep focus-visible:outline-pearl",
  // Immersive hero primary.
  "gold-gradient-pill":
    "rounded-full bg-[linear-gradient(135deg,theme(colors.gold.light),theme(colors.gold.DEFAULT))] px-[34px] py-[17px] text-[15px] tracking-[0.04em] text-blue-deep shadow-glow hover:text-blue-deep hover:shadow-[0_16px_48px_rgba(210,180,151,0.5)] focus-visible:outline-pearl",
  // Glass pill on dark surfaces (immersive hero secondary).
  "outline-gold":
    "rounded-full border border-gold-light/60 bg-pearl/[0.04] px-[34px] py-[17px] text-[15px] tracking-[0.04em] text-pearl backdrop-blur-[6px] hover:bg-gold-light/[0.12] hover:text-pearl focus-visible:outline-gold",
  // Secondary on light surfaces (cookie decline, "Send another").
  "outline-blue":
    "rounded-sm border border-blue bg-transparent px-[18px] py-2.5 text-[14px] text-blue hover:border-blue-lift hover:text-blue-lift focus-visible:outline-gold",
} as const;

export type ButtonVariant = keyof typeof variants;

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium no-underline transition-[background-color,box-shadow,color,border-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function buttonClass(variant: ButtonVariant, className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

type Common = { variant?: ButtonVariant; className?: string; children: ReactNode };

/** Internal link styled as a button. Locale prefix is added automatically. */
export function ButtonLink({
  variant = "blue",
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={buttonClass(variant, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "blue",
  className,
  children,
  type = "button",
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button type={type} className={buttonClass(variant, className)} {...rest}>
      {children}
    </button>
  );
}
