import { RootNotFoundShell } from "@/components/RootNotFoundShell";
import { routing } from "@/i18n/routing";
import { geist, plexArabic, ubuntu } from "@/lib/fonts";
import type { AbstractIntlMessages } from "next-intl";
import en from "@/messages/en.json";

// The files carry a boolean "review" flag, which the message type does not model.
const messages = en as unknown as AbstractIntlMessages;

// Static hosts serve this as 404.html for any unknown path, so it carries its own <html>.
export default function RootNotFound() {
  return (
    <html lang={routing.defaultLocale} className={`${geist.variable} ${plexArabic.variable} ${ubuntu.variable}`}>
      <body className="flex min-h-screen flex-col">
        <RootNotFoundShell locale={routing.defaultLocale} messages={messages} />
      </body>
    </html>
  );
}
