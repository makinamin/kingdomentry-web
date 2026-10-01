"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useMessages, useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { Button } from "./Button";
import { CheckIcon } from "./icons";
import { Label } from "./Label";

type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "company" | "email" | "sector";
const REQUIRED: Field[] = ["name", "company", "email", "sector"];
const MIN_MS = 3000;

const input =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-[16px] text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-royal aria-[invalid=true]:border-alert";

function Err({ id, children }: { id: string; children?: string }) {
  return children ? (
    <p id={`${id}-error`} className="m-0 mt-2 text-[13px] font-medium text-alert">
      {children}
    </p>
  ) : null;
}

function TextField({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[13px] text-navy/70">
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      {children}
      <Err id={id}>{error}</Err>
    </div>
  );
}

/** Zeyna-style choice chips: a radio group that looks like square tags. */
function Chips({ name, legend, options, required, error, value, onChange }: { name: string; legend: string; options: Array<{ value: string; label: string }>; required?: boolean; error?: string; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="m-0 border-0 p-0" aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-3 p-0 text-[13px] text-navy/70">
        {legend}
        {required ? <span aria-hidden> *</span> : null}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input type="radio" name={name} value={o.value} checked={o.value === value} onChange={() => onChange(o.value)} className="peer sr-only" />
            <span className="inline-flex border border-line px-4 py-2.5 text-[14px] text-navy transition-colors hover:border-navy peer-checked:border-royal peer-checked:bg-royal peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-royal-2">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      <Err id={name}>{error}</Err>
    </fieldset>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const messages = useMessages() as unknown as {
    contact: { form: { stages: string[] } };
    sectors: { items: Array<{ id: string; name: string }> };
  };
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [notice, setNotice] = useState("");
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const [sector, setSector] = useState("");
  const [stage, setStage] = useState("");

  // Arriving from the hero finder or a package: preselect sector and journey stage.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const sec = q.get("sector");
    const stg = q.get("stage");
    if (sec && messages.sectors.items.some((s) => s.id === sec)) setSector(sec);
    if (stg && messages.contact.form.stages[Number(stg)]) setStage(messages.contact.form.stages[Number(stg)] ?? "");
  }, [messages]);

  function validate(data: FormData) {
    const next: Partial<Record<Field, string>> = {};
    for (const f of REQUIRED) if (!String(data.get(f) ?? "").trim()) next[f] = t("form.errors.required");
    const email = String(data.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t("form.errors.email");
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website") ?? "")) return; // honeypot
    const next = validate(data);
    setErrors(next);
    setNotice("");
    const firstBad = REQUIRED.find((f) => next[f]);
    if (firstBad) {
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    if (Date.now() - startedAt.current < MIN_MS) {
      setNotice(t("form.errors.tooFast"));
      return;
    }

    const payload = Object.fromEntries([...data.entries()].filter(([k]) => k !== "website"));

    if (!site.formEndpoint) {
      // No endpoint configured yet: hand over to the visitor's mail app.
      const body = Object.entries(payload)
        .map(([k, v]) => `${k}: ${String(v)}`)
        .join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Intro call")}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, elapsedMs: Date.now() - startedAt.current }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
      setNotice(t("form.errors.failed"));
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-6 bg-white p-[clamp(28px,4vw,56px)]">
        <span className="flex h-14 w-14 items-center justify-center bg-royal text-white">
          <CheckIcon size={22} />
        </span>
        <p className="m-0 text-h3 text-navy">{t("thanks.title")}</p>
        <p className="m-0 text-[16px] text-navy/70">{t("thanks.text")}</p>
        <Button
          variant="outline-navy"
          onClick={() => {
            formRef.current?.reset();
            setSector("");
            setStage("");
            startedAt.current = Date.now();
            setStatus("idle");
          }}
        >
          {t("thanks.again")}
        </Button>
      </div>
    );
  }

  const err = (f: Field) => (errors[f] ? { "aria-invalid": true, "aria-describedby": `${f}-error` } : {});

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="relative flex flex-col gap-9 bg-white p-[clamp(24px,4vw,56px)]">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <Label>{t("label")}</Label>
        <p className="m-0 max-w-[26ch] text-h5 text-navy">{t("alt.title")} {t("alt.text")}</p>
      </div>

      <Chips
        name="stage"
        legend={t("form.stage")}
        value={stage}
        onChange={setStage}
        options={messages.contact.form.stages.map((s) => ({ value: s, label: s }))}
      />
      <Chips
        name="sector"
        legend={t("form.sector")}
        required
        error={errors.sector}
        value={sector}
        onChange={setSector}
        options={messages.sectors.items.map((s) => ({ value: s.id, label: s.name }))}
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <TextField id="name" label={t("form.name")} required error={errors.name}>
          <input id="name" name="name" autoComplete="name" required className={input} {...err("name")} />
        </TextField>
        <TextField id="company" label={t("form.company")} required error={errors.company}>
          <input id="company" name="company" autoComplete="organization" required className={input} {...err("company")} />
        </TextField>
        <TextField id="country" label={t("form.country")}>
          <input id="country" name="country" autoComplete="country-name" className={input} />
        </TextField>
        <TextField id="email" label={t("form.email")} required error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" required dir="ltr" className={`${input} text-start`} {...err("email")} />
        </TextField>
        <TextField id="phone" label={t("form.phone")}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" dir="ltr" className={`${input} text-start`} />
        </TextField>
      </div>
      <TextField id="message" label={t("form.message")}>
        <textarea id="message" name="message" rows={4} className={`${input} resize-y`} />
      </TextField>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="m-0 text-[13px] text-navy/70">{t("form.privacy")}</p>
      {notice ? (
        <p role="alert" className="m-0 border-s-2 border-alert bg-soft px-4 py-3 text-[14px] text-navy">
          {notice}
        </p>
      ) : null}
      <Button type="submit" variant="royal" disabled={status === "sending"} className="self-start disabled:opacity-60">
        {status === "sending" ? t("form.sending") : t("form.submit")}
      </Button>
    </form>
  );
}
