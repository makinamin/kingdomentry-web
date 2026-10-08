"use client";

import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { CookieNotice } from "./CookieNotice";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { NotFoundView } from "./NotFoundView";

/**
 * The root 404 renders on the client only. A server-side next-intl call here would
 * leak its locale into every other page rendered in the same request.
 */
export function RootNotFoundShell({ locale, messages }: { locale: string; messages: AbstractIntlMessages }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Amsterdam">
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <NotFoundView />
      </main>
      <Footer />
      <CookieNotice />
    </NextIntlClientProvider>
  );
}
