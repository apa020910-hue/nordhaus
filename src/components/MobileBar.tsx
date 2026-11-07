"use client";

import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { openQuote } from "@/lib/quote-events";
import { Phone } from "./Icons";
import { buttonClasses, cn } from "./ui";

export function MobileBar() {
  const { dict } = useI18n();
  return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm md:hidden"><div className="mx-auto flex max-w-md gap-3"><a href={site.phoneHref} className={cn(buttonClasses("outline-dark", "md"), "flex-1")}><Phone className="h-4 w-4" />{dict.phone}</a><button type="button" onClick={() => openQuote()} className={cn(buttonClasses("rust", "md"), "flex-[1.6]")}>{dict.quote}</button></div></div>;
}
