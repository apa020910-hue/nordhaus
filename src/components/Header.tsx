"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { locales, type Locale } from "@/lib/i18n/messages";
import { site } from "@/lib/site";
import { openQuote } from "@/lib/quote-events";
import { Close, Menu, Phone } from "./Icons";
import { Logo } from "./Logo";
import { buttonClasses, cn } from "./ui";

const NAV_IDS = ["#top", "#services", "#projects", "#about", "#process", "#reviews", "#faq", "#contact"] as const;
const LANG_LABEL: Record<Locale, string> = { lv: "LV", ru: "RU", en: "EN" };

export function Header() {
  const { locale, dict } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = previousOverflow; };
  }, [open]);
  return <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200", open || scrolled ? "border-line bg-paper/95 backdrop-blur-sm" : "border-transparent bg-transparent")}>
    <div className={cn("mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 transition-[height] duration-200 sm:px-8", scrolled ? "h-16" : "h-20")}>
      <Link href="#top" aria-label={site.name} onClick={() => setOpen(false)}><Logo /></Link>
      <nav aria-label={dict.nav[0]} className="hidden items-center gap-7 text-sm xl:flex">{NAV_IDS.map((href, index) => <a key={href} href={href} className="text-ink/80 transition-colors hover:text-ink">{dict.nav[index]}</a>)}</nav>
      <div className="flex items-center gap-3">
        <LanguageSwitch locale={locale} label={dict.languageLabel} onNavigate={() => setOpen(false)} />
        <a href={site.phoneHref} className="hidden items-center gap-2 text-sm font-medium lg:flex"><Phone className="h-4 w-4 text-rust" />{site.phone}</a>
        <button type="button" onClick={() => openQuote()} className={cn(buttonClasses("rust", "md"), "hidden sm:inline-flex")}>{dict.quote}</button>
        <button type="button" className="grid h-11 w-11 place-items-center rounded border border-line xl:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? dict.menuClose : dict.menuOpen} onClick={() => setOpen((value) => !value)}>{open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
    </div>
    {open && <div id="mobile-nav" className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-paper px-5 pb-10 pt-6 sm:px-8 xl:hidden"><nav aria-label={dict.nav[0]} className="flex flex-col">{NAV_IDS.map((href, index) => <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-line py-4 text-2xl fs-expanded font-medium">{dict.nav[index]}</a>)}</nav><LanguageSwitch locale={locale} label={dict.languageLabel} mobile onNavigate={() => setOpen(false)} /><div className="mt-8 flex flex-col gap-3"><button type="button" onClick={() => { setOpen(false); openQuote(); }} className={buttonClasses("rust", "lg")}>{dict.quote}</button><a href={site.phoneHref} className={buttonClasses("outline-dark", "lg")}><Phone className="h-5 w-5" />{site.phone}</a></div></div>}
  </header>;
}

function LanguageSwitch({ locale, label, mobile = false, onNavigate }: { locale: Locale; label: string; mobile?: boolean; onNavigate: () => void }) {
  return <div aria-label={label} className={cn("flex items-center gap-1", mobile && "mt-7 border-t border-line pt-6")}>
    {locales.map((language) => <Link key={language} href={`/${language}`} onClick={onNavigate} aria-current={language === locale ? "page" : undefined} className={cn("rounded px-2.5 py-2 text-xs font-semibold tracking-wide transition-colors", language === locale ? "bg-charcoal text-paper" : "text-concrete hover:bg-mist hover:text-ink")}>{LANG_LABEL[language]}</Link>)}
  </div>;
}
