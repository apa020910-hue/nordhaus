"use client";

import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { Mail, Phone } from "./Icons";
import { CallbackButton } from "./CallbackButton";

export function QuickContact() {
  const { dict } = useI18n();
  return (
    <section className="border-y border-line bg-charcoal text-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="fs-expanded text-lg font-medium">{dict.quickContact}</p>
        <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:gap-8">
          <a href={site.phoneHref} className="flex items-center gap-2.5 hover:text-rust"><Phone className="h-4 w-4 text-rust" />{site.phone}</a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-rust"><Mail className="h-4 w-4 text-rust" />{site.email}</a>
          <CallbackButton />
        </div>
      </div>
    </section>
  );
}
