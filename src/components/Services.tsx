"use client";

import { useContent } from "@/lib/i18n/useContent";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { ChevronDown } from "./Icons";
import { ServiceGlyph } from "./Graphics";
import { QuoteLink } from "./QuoteLink";
import { buttonClasses } from "./ui";

export function Services() {
  const { dict } = useI18n();
  const { services } = useContent();
  return (
    <section id="services" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-lg text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl">{dict.services.title}</h2>
          <p className="max-w-sm text-concrete">{dict.services.intro}</p>
        </div>
        <div className="mt-12 border-t border-line">
          {services.map((service, index) => (
            <details key={service.id} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center gap-5 py-6 [&::-webkit-details-marker]:hidden sm:gap-8">
                <span className="hidden w-8 font-medium tabular text-concrete sm:block">{String(index + 1).padStart(2, "0")}</span>
                <ServiceGlyph id={service.id} className="h-9 w-9 shrink-0 text-charcoal" />
                <span className="min-w-0 flex-1"><span className="block text-lg font-medium text-ink sm:text-xl">{service.name}</span><span className="mt-1 hidden text-sm leading-relaxed text-concrete sm:block">{service.short}</span></span>
                <ChevronDown className="h-5 w-5 shrink-0 text-concrete transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-concrete sm:hidden">{service.short}</p>
              <div className="grid gap-8 pb-8 sm:grid-cols-[minmax(0,1fr)_14rem] sm:pl-[6.75rem]">
                <div><p className="text-sm font-medium text-ink">{dict.services.includes}</p><ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 text-sm text-concrete sm:grid-cols-2">{service.includes.map((item) => <li key={item} className="flex gap-2.5"><span className="mt-2 h-px w-3 shrink-0 bg-rust" aria-hidden="true" />{item}</li>)}</ul></div>
                <div className="flex flex-col items-start gap-4 sm:border-l sm:border-line sm:pl-8"><div><p className="text-xs text-concrete">{dict.services.duration}</p><p className="fs-expanded text-xl font-semibold tabular">{service.duration}</p></div><QuoteLink intent={{ context: service.name }} className={buttonClasses("outline-dark", "md", "w-full justify-center sm:w-auto")}>{dict.services.request}</QuoteLink></div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
