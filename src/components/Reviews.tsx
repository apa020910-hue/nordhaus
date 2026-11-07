"use client";

import { useRef } from "react";
import { useContent } from "@/lib/i18n/useContent";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { site } from "@/lib/site";
import { ChevronLeft, ChevronRight, Star } from "./Icons";

export function Reviews() {
  const { dict } = useI18n();
  const { reviews } = useContent();
  const trackRef = useRef<HTMLUListElement>(null);
  function scrollByCard(direction: 1 | -1) { const track = trackRef.current; if (!track) return; const card = track.querySelector("li"); track.scrollBy({ left: ((card?.clientWidth ?? 320) + 24) * direction, behavior: "smooth" }); }
  return <section id="reviews" className="bg-mist py-24 lg:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><h2 className="text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl">{dict.reviews.title}</h2><div className="flex items-center gap-6"><div className="flex items-center gap-2.5"><span className="flex text-rust" role="img" aria-label={dict.misc.rated.replace("{rating}", String(site.rating))}>{Array.from({ length: 5 }, (_, idx) => <Star key={idx} className="h-4 w-4" />)}</span><span className="fs-expanded font-semibold tabular">{site.rating} / 5</span></div><div className="hidden gap-2 sm:flex"><button type="button" onClick={() => scrollByCard(-1)} aria-label={dict.reviews.previous} className="grid h-10 w-10 place-items-center rounded border border-line hover:border-charcoal"><ChevronLeft className="h-4 w-4" /></button><button type="button" onClick={() => scrollByCard(1)} aria-label={dict.reviews.next} className="grid h-10 w-10 place-items-center rounded border border-line hover:border-charcoal"><ChevronRight className="h-4 w-4" /></button></div></div></div><p className="mt-1 text-sm text-concrete">{dict.reviews.based.replace("{count}", String(site.reviewCount))}</p><ul ref={trackRef} className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2">{reviews.map((review) => <li key={`${review.name}-${review.project}`} className="flex w-[85%] shrink-0 snap-start flex-col border-t-2 border-charcoal bg-paper p-6 sm:w-[min(26rem,46%)] sm:p-7"><p className="flex-1 leading-relaxed text-ink">{review.text}</p><div className="mt-6 border-t border-line pt-4 text-sm"><p className="font-medium">{review.name}, {review.location}</p><p className="text-concrete">{review.project}</p></div></li>)}</ul></div></section>;
}
