"use client";

import { useContent } from "@/lib/i18n/useContent";
import { useI18n } from "@/lib/i18n/LocaleProvider";

export function Trust() {
  const { dict } = useI18n();
  const { trust } = useContent();
  return <section className="bg-paper py-24 lg:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8"><h2 className="max-w-lg text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl">{dict.trust.title}</h2><ul className="mt-12 grid gap-x-10 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">{trust.map((point) => <li key={point.title} className="border-t-2 border-rust pt-4"><h3 className="text-lg font-medium">{point.title}</h3><p className="mt-1.5 leading-relaxed text-concrete">{point.text}</p></li>)}</ul></div></section>;
}
