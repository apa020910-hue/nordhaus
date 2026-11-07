"use client";

import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { Instagram, LinkedIn } from "./Icons";
import { Logo } from "./Logo";

const NAV_HREFS = ["#services", "#projects", "#about", "#process", "#reviews", "#faq", "#contact"] as const;
const NAV_LABELS = [1, 2, 3, 4, 5, 6, 7] as const;

export function Footer() {
  const { dict } = useI18n();
  return <footer className="bg-charcoal pb-28 pt-16 text-paper md:pb-12"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]"><div><Logo dark /><p className="mt-5 max-w-xs text-paper/65">{dict.footer.description}</p><div className="mt-6 flex gap-3"><a href={site.instagramHref} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded border border-paper/25 transition-colors hover:border-rust hover:text-rust"><Instagram className="h-5 w-5" /></a><a href={site.linkedinHref} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded border border-paper/25 transition-colors hover:border-rust hover:text-rust"><LinkedIn className="h-5 w-5" /></a></div></div><nav aria-label="Footer navigation"><ul className="space-y-3">{NAV_HREFS.map((href, index) => <li key={href}><a href={href} className="text-paper/75 transition-colors hover:text-rust">{dict.nav[NAV_LABELS[index]]}</a></li>)}</ul></nav><div className="space-y-3"><p>{site.address.street}<br />{site.address.city}, {site.address.postalCode}</p><p><a href={site.phoneHref} className="transition-colors hover:text-rust">{site.phone}</a></p><p><a href={`mailto:${site.email}`} className="transition-colors hover:text-rust">{site.email}</a></p></div></div><div className="mt-14 flex flex-col gap-3 border-t border-paper/15 pt-6 text-sm text-paper/55 md:flex-row md:justify-between"><p>© {new Date().getFullYear()} {site.name}. {dict.footer.rights}</p><p>{dict.footer.demo}</p></div></div></footer>;
}
