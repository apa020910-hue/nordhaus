"use client";

import { useContent } from "@/lib/i18n/useContent";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { ChevronDown } from "./Icons";

export function Faq() {
  const { dict } = useI18n();
  const { faq } = useContent();
  return <section id="faq" className="bg-mist py-24 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20"><div><h2 className="text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl">{dict.faq.title}</h2><p className="mt-5 max-w-sm text-lg leading-relaxed text-concrete">{dict.faq.intro}</p></div><div className="border-t border-line">{faq.map((item) => <details key={item.q} className="group border-b border-line"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium [&::-webkit-details-marker]:hidden">{item.q}<ChevronDown className="h-5 w-5 shrink-0 text-concrete transition-transform duration-200 group-open:rotate-180" /></summary><p className="max-w-2xl pb-6 leading-relaxed text-concrete">{item.a}</p></details>)}</div></div></section>;
}
