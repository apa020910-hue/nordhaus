"use client";

import { useContent } from "@/lib/i18n/useContent";
import { useI18n } from "@/lib/i18n/LocaleProvider";

export function Team() {
  const { dict } = useI18n();
  const { team } = useContent();
  return <section className="bg-paper pb-24 lg:pb-32"><div className="mx-auto max-w-7xl px-5 sm:px-8"><h2 className="text-3xl leading-[1.08] tracking-[-0.01em] sm:text-4xl">{dict.team.title}</h2><ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">{team.map((member) => <li key={member.id}><div className="flex aspect-[4/5] items-end border border-line bg-mist p-5"><span className="fs-expanded text-5xl font-semibold text-charcoal/80">{member.initials}</span></div><h3 className="mt-4 text-lg font-medium">{member.name}</h3><p className="text-sm font-medium text-rust">{member.role}</p><p className="mt-2 text-sm leading-relaxed text-concrete">{member.bio}</p></li>)}</ul></div></section>;
}
