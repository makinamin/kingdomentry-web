import { Fragment } from "react";

/** "Amsterdam · Casablanca · Jeddah" that only wraps between cities, never before a dot. */
export function Cities({ text }: { text: string }) {
  const parts = text.split(/\s*·\s*/);
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={p}>
          {i > 0 ? " " : null}
          <span className="whitespace-nowrap">
            {p}
            {i < parts.length - 1 ? " ·" : null}
          </span>
        </Fragment>
      ))}
    </>
  );
}
