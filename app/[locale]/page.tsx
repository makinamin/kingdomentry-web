import { setRequestLocale } from "next-intl/server";

// Placeholder until step 3 builds the immersive home.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return null;
}
