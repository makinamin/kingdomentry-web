import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { reemKufi, ubuntu } from "@/lib/fonts";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = messages.dir === "rtl" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${ubuntu.variable} ${reemKufi.variable}`}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <Header />
          <main id="main" tabIndex={-1} className="flex flex-1 flex-col focus:outline-none">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
