import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/archivo/standard.css";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Construction & Renovation`, template: `%s — ${site.name}` },
  description: "NORDHAUS — construction and renovation services in Riga and across Latvia.",
  applicationName: site.name,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-site-locale") ?? "lv";
  return <html lang={locale}><body>{children}</body></html>;
}
