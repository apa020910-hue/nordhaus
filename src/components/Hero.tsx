"use client";

import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { HouseElevation } from "./Graphics";
import { QuoteLink } from "./QuoteLink";
import { Star } from "./Icons";
import { buttonClasses } from "./ui";

export function Hero() {
  const { dict } = useI18n();
  return (
    <section id="top" className="relative overflow-hidden bg-paper pt-28 sm:pt-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-10">
        <div className="lg:py-10">
          <h1 className="max-w-xl text-[clamp(2.4rem,5.4vw,3.75rem)] leading-[1.06] tracking-[-0.01em] text-ink">{dict.hero.titleA}<br />{dict.hero.titleB}</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-concrete">{dict.hero.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteLink className={buttonClasses("rust", "lg")}>{dict.hero.primary}</QuoteLink>
            <a href="#projects" className={buttonClasses("outline-dark", "lg")}>{dict.hero.secondary}</a>
          </div>
          <div className="mt-12 flex items-center gap-2 text-sm">
            <span className="flex text-rust" role="img" aria-label={dict.misc.rated.replace("{rating}", String(site.rating))}><Star className="h-4 w-4" /></span>
            <span className="font-medium tabular">{site.rating}</span>
            <span className="text-concrete">{dict.hero.rating.replace("{count}", String(site.reviewCount))}</span>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
            {dict.hero.trustValues.map((value, index) => <div key={dict.hero.trust[index]}><dt className="sr-only">{dict.hero.trust[index]}</dt><dd className="fs-expanded text-xl font-semibold tabular">{value}</dd><dd className="mt-0.5 text-xs text-concrete">{dict.hero.trust[index]}</dd></div>)}
          </dl>
        </div>
        <HouseElevation className="mx-auto w-full max-w-xl lg:max-w-none" />
      </div>
    </section>
  );
}
