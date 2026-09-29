import { routing } from "@/i18n/routing";
import { LOCALE_KEY } from "@/lib/locale-pref";

// Static export has no middleware. "/" picks the remembered language, then the
// browser language, then English. The meta refresh covers visitors without JavaScript.
const pick = `(function(){var l=${JSON.stringify(routing.locales)},c;try{c=localStorage.getItem(${JSON.stringify(
  LOCALE_KEY,
)})}catch(e){}if(l.indexOf(c)<0){c=(navigator.languages||[navigator.language]).map(function(x){return String(x).slice(0,2).toLowerCase()}).filter(function(x){return l.indexOf(x)>-1})[0]}location.replace('/'+(c||${JSON.stringify(
  routing.defaultLocale,
)})+'/')})()`;

export default function RootPage() {
  const target = `/${routing.defaultLocale}/`;
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: pick }} />
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
