import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { CookieNotice } from "@/components/CookieNotice";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { routing } from "@/i18n/routing";
import { geist, plexArabic, ubuntu } from "@/lib/fonts";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Kingdom Entry", template: "%s · Kingdom Entry" },
};

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
    <html lang={locale} dir={dir} className={`${geist.variable} ${plexArabic.variable} ${ubuntu.variable}`}>
      <head>
        {/* Lets CSS hide reveal-on-scroll content only when JavaScript can show it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <Header />
          <main id="main" tabIndex={-1} className="flex flex-1 flex-col focus:outline-none">
            {children}
          </main>
          <Footer />
          <CookieNotice />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
