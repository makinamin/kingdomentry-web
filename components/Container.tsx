import type { ReactNode } from "react";

/** 1200px max, 24px gutters. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-site px-6 ${className}`}>{children}</div>;
}
