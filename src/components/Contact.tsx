"use client";

import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { Clock, Mail, MapPin, Phone } from "./Icons";
import { CallbackButton } from "./CallbackButton";
import { HouseElevation } from "./Graphics";
import { buttonClasses } from "./ui";

export function Contact() {
  const { dict } = useI18n();
  return <section id="contact" className="bg-charcoal py-24 text-paper lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16"><div><h2 className="text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl">{dict.contact.title}</h2><p className="mt-5 max-w-md text-lg leading-relaxed text-paper/70">{dict.contact.intro}</p><dl className="mt-10 divide-y divide-paper/15 border-y border-paper/15"><Row icon={<MapPin className="h-5 w-5 text-rust" />} label={dict.contact.address}>{site.address.street}, {site.address.city}, {site.address.postalCode}</Row><Row icon={<Phone className="h-5 w-5 text-rust" />} label={dict.contact.phone}><a href={site.phoneHref} className="hover:text-rust">{site.phone}</a></Row><Row icon={<Mail className="h-5 w-5 text-rust" />} label={dict.contact.email}><a href={`mailto:${site.email}`} className="hover:text-rust">{site.email}</a></Row><Row icon={<Clock className="h-5 w-5 text-rust" />} label={dict.contact.hours}>{dict.contact.hoursValue}</Row></dl><div className="mt-8 flex flex-wrap gap-3"><a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className={buttonClasses("rust", "md")}>{dict.contact.directions}</a><CallbackButton /></div></div><HouseElevation className="hidden w-full max-w-md self-center justify-self-end opacity-90 lg:block" /></div></section>;
}
function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) { return <div className="flex items-center gap-4 py-5">{icon}<div><dt className="text-xs text-paper/55">{label}</dt><dd className="mt-0.5">{children}</dd></div></div>; }
