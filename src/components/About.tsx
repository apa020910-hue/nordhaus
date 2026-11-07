"use client";

import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n/LocaleProvider";

export function About() {
  const { dict } = useI18n();
  const stats = [site.stats.years, site.stats.projects, site.stats.specialists, site.stats.satisfaction];
  return (
    <section id="about" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <h2 className="max-w-md text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl">{dict.about.title}</h2>
            <div className="mt-6 max-w-lg space-y-4 text-lg leading-relaxed text-concrete">
              {dict.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 self-start border-t border-line pt-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {stats.map((value, index) => (
              <div key={dict.about.stats[index]}>
                <dt className="sr-only">{dict.about.stats[index]}</dt>
                <dd className="fs-expanded text-4xl font-semibold tabular sm:text-5xl">{value}</dd>
                <dd className="mt-1.5 text-sm text-concrete">{dict.about.stats[index]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
