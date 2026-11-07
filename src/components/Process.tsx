"use client";

import { useContent } from "@/lib/i18n/useContent";
import { useI18n } from "@/lib/i18n/LocaleProvider";

export function Process() {
  const { dict } = useI18n();
  const { process } = useContent();
  return <section id="process" className="bg-paper py-24 lg:py-32"><div className="mx-auto max-w-5xl px-5 sm:px-8"><div className="max-w-xl"><h2 className="text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl">{dict.process.title}</h2><p className="mt-5 text-lg leading-relaxed text-concrete">{dict.process.intro}</p></div><ol className="relative mt-14 border-l border-line pl-9 sm:pl-12">{process.map((step, index) => <li key={step.title} className="relative pb-12 last:pb-0"><span className="absolute -left-[46px] top-0 grid h-9 w-9 place-items-center rounded-full border border-rust bg-paper text-sm font-medium tabular text-rust sm:-left-[58px]">{index + 1}</span><h3 className="text-xl font-medium">{step.title}</h3><p className="mt-2 max-w-md leading-relaxed text-concrete">{step.text}</p></li>)}</ol></div></section>;
}
