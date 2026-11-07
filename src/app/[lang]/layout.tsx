import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CallbackModal } from "@/components/CallbackModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileBar } from "@/components/MobileBar";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { isLocale, locales, messages, type Locale } from "@/lib/i18n/messages";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = messages[lang];
  const url = `${site.url}/${lang}`;
  return {
    title: { default: `${site.name} — ${dict.metadata.title}`, template: `%s — ${site.name}` },
    description: dict.metadata.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { lv: "/lv", ru: "/ru", en: "/en", "x-default": "/lv" },
    },
    openGraph: {
      title: `${site.name} — ${dict.metadata.title}`,
      description: dict.metadata.description,
      url,
      siteName: site.name,
      locale: dict.metadata.ogLocale,
      alternateLocale: locales.filter((item) => item !== lang).map((item) => messages[item].metadata.ogLocale),
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${site.name} — ${dict.metadata.title}`, description: dict.metadata.description },
  };
}

export default async function LanguageLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = messages[locale];
  return (
    <LocaleProvider locale={locale}>
      <a href="#main" className="fixed left-4 top-4 z-[60] -translate-y-24 bg-rust px-5 py-2.5 font-medium text-paper transition-transform focus:translate-y-0">{dict.skip}</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileBar />
      <CallbackModal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }} />
    </LocaleProvider>
  );
}

function structuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: "€€",
    address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.city, postalCode: site.address.postalCode, addressCountry: site.address.country },
    areaServed: "Latvia",
    aggregateRating: { "@type": "AggregateRating", ratingValue: site.rating, reviewCount: site.reviewCount },
    sameAs: [site.instagramHref, site.linkedinHref],
  };
}
