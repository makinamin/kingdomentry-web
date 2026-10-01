import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "./icons";

// Zeyna pe-button: square, small uppercase label, icon on the end that nudges on hover.
const variants = {
  white: "bg-white text-navy hover:bg-soft hover:text-navy",
  royal: "bg-royal text-white hover:bg-royal-2 hover:text-white",
  navy: "bg-navy text-white hover:bg-royal hover:text-white",
  outline: "border border-current bg-transparent text-white hover:bg-white hover:text-navy",
  "outline-navy": "border border-line bg-transparent text-navy hover:border-navy hover:text-navy",
} as const;

export type ButtonVariant = keyof typeof variants;

const base =
  "group inline-flex cursor-pointer items-center justify-center gap-6 whitespace-nowrap px-5 py-4 text-[12px] font-medium uppercase leading-none tracking-label no-underline transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal-2";

export function buttonClass(variant: ButtonVariant = "white", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

const Icon = () => (
  <ArrowUpRight
    size={14}
    className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
  />
);

type Common = { variant?: ButtonVariant; className?: string; children: ReactNode; icon?: boolean };

export function ButtonLink({
  variant,
  className,
  children,
  icon = true,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={buttonClass(variant, className)} {...rest}>
      {children}
      {icon ? <Icon /> : null}
    </Link>
  );
}

export function Button({
  variant,
  className,
  children,
  icon = true,
  type = "button",
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button type={type} className={buttonClass(variant, className)} {...rest}>
      {children}
      {icon ? <Icon /> : null}
    </button>
  );
}
