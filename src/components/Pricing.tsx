"use client";

import { useI18n } from "@/lib/i18n/LocaleProvider";

export function Pricing() {
  const { dict } = useI18n();
  return <section className="bg-mist py-24 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20"><div><h2 className="max-w-md text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl">{dict.pricing.titleA}<br />{dict.pricing.titleB}</h2><p className="mt-6 max-w-md text-lg leading-relaxed text-concrete">{dict.pricing.intro}</p></div><ul className="space-y-5 self-center border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">{dict.pricing.points.map((point) => <li key={point} className="flex gap-3.5"><span className="mt-2.5 h-px w-4 shrink-0 bg-rust" aria-hidden="true" /><p className="leading-relaxed text-ink">{point}</p></li>)}</ul></div></section>;
}
