"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useMessages, useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { Button } from "./Button";
import { ArrowIcon, CheckIcon } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "company" | "email" | "sector";
const REQUIRED: Field[] = ["name", "company", "email", "sector"];
const MIN_MS = 3000;

const input =
  "w-full rounded-xl border border-mist-line bg-mist px-5 py-4 text-[16px] text-ink outline-none transition-colors placeholder:text-muted focus:border-violet focus:bg-white aria-[invalid=true]:border-ember-2";

function FieldWrap({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[15px] font-semibold text-ink">
        {label}
        {required ? <span aria-hidden className="text-violet"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="m-0 text-[14px] font-medium text-ember-2">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const messages = useMessages() as unknown as {
    contact: { form: { sizes: string[] } };
    sectors: { items: Array<{ id: string; name: string }> };
  };
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [notice, setNotice] = useState("");
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormData) {
    const next: Partial<Record<Field, string>> = {};
    for (const f of REQUIRED) if (!String(data.get(f) ?? "").trim()) next[f] = t("form.errors.required");
    const email = String(data.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t("form.errors.email");
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (String(data.get("website") ?? "")) return; // honeypot
    const next = validate(data);
    setErrors(next);
    setNotice("");
    const firstBad = REQUIRED.find((f) => next[f]);
    if (firstBad) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
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
      <div role="status" className="relative isolate flex flex-col items-start gap-6 overflow-hidden rounded-2xl bg-night p-[clamp(32px,5vw,60px)] text-white">
        <span aria-hidden className="absolute -end-20 -top-20 -z-10 h-72 w-72 rounded-full bg-violet/50 blur-[80px]" />
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gd-violet">
          <CheckIcon size={26} />
        </span>
        <p className="m-0 text-[44px] font-black leading-none">{t("thanks.title")}</p>
        <p className="m-0 text-[18px] text-white/80">{t("thanks.text")}</p>
        <Button
          variant="outline"
          onClick={() => {
            formRef.current?.reset();
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
    <form ref={formRef} noValidate onSubmit={onSubmit} className="relative flex flex-col gap-6 rounded-2xl bg-white p-[clamp(24px,4vw,50px)] shadow-card">
      <div className="grid gap-6 sm:grid-cols-2">
        <FieldWrap id="name" label={t("form.name")} required error={errors.name}>
          <input id="name" name="name" autoComplete="name" required className={input} {...err("name")} />
        </FieldWrap>
        <FieldWrap id="company" label={t("form.company")} required error={errors.company}>
          <input id="company" name="company" autoComplete="organization" required className={input} {...err("company")} />
        </FieldWrap>
        <FieldWrap id="role" label={t("form.role")}>
          <input id="role" name="role" autoComplete="organization-title" className={input} />
        </FieldWrap>
        <FieldWrap id="email" label={t("form.email")} required error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" required dir="ltr" className={`${input} text-start`} {...err("email")} />
        </FieldWrap>
        <FieldWrap id="phone" label={t("form.phone")}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" dir="ltr" className={`${input} text-start`} />
        </FieldWrap>
        <FieldWrap id="sector" label={t("form.sector")} required error={errors.sector}>
          <select id="sector" name="sector" required defaultValue="" className={`${input} appearance-none`} {...err("sector")}>
            <option value="" disabled>
              {t("form.sectorPlaceholder")}
            </option>
            {messages.sectors.items.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </FieldWrap>
        <FieldWrap id="size" label={t("form.size")}>
          <select id="size" name="size" defaultValue={messages.contact.form.sizes[0]} className={`${input} appearance-none`}>
            {messages.contact.form.sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </FieldWrap>
      </div>
      <FieldWrap id="message" label={t("form.message")}>
        <textarea id="message" name="message" rows={5} className={`${input} resize-y`} />
      </FieldWrap>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="m-0 text-[15px] text-ink-3">{t("form.privacy")}</p>
      {notice ? (
        <p role="alert" className="m-0 rounded-xl bg-ember/10 px-5 py-4 text-[15px] font-medium text-ember-2">
          {notice}
        </p>
      ) : null}
      <Button type="submit" disabled={status === "sending"} className="self-start disabled:opacity-60">
        {status === "sending" ? t("form.sending") : t("form.submit")} <ArrowIcon />
      </Button>
    </form>
  );
}
