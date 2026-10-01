import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

// Gilroy pr-btn-1: pill, gradient fill, a light sweep crosses on hover and the label tilts.
const variants = {
  primary: "bg-gd-violet text-white shadow-glow hover:text-white",
  light: "bg-white text-ink hover:text-ink",
  dark: "bg-ink text-white hover:text-white",
  outline: "border border-current bg-transparent text-white hover:text-white",
  "outline-dark": "border border-ink/25 bg-transparent text-ink hover:text-ink",
} as const;

export type ButtonVariant = keyof typeof variants;

const base =
  "group relative isolate inline-flex cursor-pointer items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full px-9 py-[18px] text-[16px] font-semibold leading-none no-underline transition-transform duration-300 ease-spring hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet " +
  "after:absolute after:inset-0 after:-z-10 after:rounded-full after:bg-white/20 after:transition-transform after:duration-500 after:ease-out after:content-[''] after:-translate-x-full hover:after:translate-x-0 rtl:after:translate-x-full rtl:hover:after:translate-x-0";

export function buttonClass(variant: ButtonVariant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

const Label = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-2.5 group-hover:animate-tilt">{children}</span>
);

type Common = { variant?: ButtonVariant; className?: string; children: ReactNode };

export function ButtonLink({
  variant,
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={buttonClass(variant, className)} {...rest}>
      <Label>{children}</Label>
    </Link>
  );
}

export function Button({
  variant,
  className,
  children,
  type = "button",
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button type={type} className={buttonClass(variant, className)} {...rest}>
      <Label>{children}</Label>
    </button>
  );
}
