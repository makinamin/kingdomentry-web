import { routing } from "@/i18n/routing";

// Static export has no middleware, so "/" forwards to the default locale with a plain meta refresh.
// Browser language detection and the remembered choice arrive with the language switcher.
export default function RootPage() {
  const target = `/${routing.defaultLocale}/`;
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="canonical" href={target} />
        <meta name="robots" content="noindex" />
      </head>
      <body>
        <a href={target}>Kingdom Entry</a>
      </body>
    </html>
  );
}
