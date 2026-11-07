"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { AfterArt, BeforeArt } from "./Graphics";
import { ChevronLeft, ChevronRight } from "./Icons";

export function BeforeAfter() {
  const { dict } = useI18n();
  const [position, setPosition] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const setFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);
  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  }
  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (dragging.current) setFromClientX(event.clientX);
  }
  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 10 : 3;
    if (event.key === "ArrowLeft") setPosition((value) => Math.max(0, value - step));
    if (event.key === "ArrowRight") setPosition((value) => Math.min(100, value + step));
    if (event.key === "Home") setPosition(0);
    if (event.key === "End") setPosition(100);
  }
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl">{dict.beforeAfter.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-concrete">{dict.beforeAfter.text}</p>
        </div>
        <div ref={trackRef} className="relative mt-10 aspect-[16/9] w-full touch-none select-none overflow-hidden border border-line" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
          <AfterArt className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 h-full w-full overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
            <BeforeArt className="absolute inset-0 h-full w-full" />
          </div>
          <span className="absolute left-4 top-4 bg-charcoal/80 px-2.5 py-1 text-xs font-medium text-paper transition-opacity" style={{ opacity: position > 14 ? 1 : 0 }}>{dict.beforeAfter.before}</span>
          <span className="absolute right-4 top-4 bg-charcoal/80 px-2.5 py-1 text-xs font-medium text-paper transition-opacity" style={{ opacity: position < 86 ? 1 : 0 }}>{dict.beforeAfter.after}</span>
          <div role="slider" tabIndex={0} aria-label={dict.beforeAfter.aria} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(position)} onKeyDown={onKeyDown} className="absolute inset-y-0 flex w-10 -translate-x-1/2 cursor-ew-resize items-center justify-center outline-none" style={{ left: `${position}%` }}>
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-paper" aria-hidden="true" />
            <span className="relative grid h-11 w-11 place-items-center rounded-full border border-paper bg-rust text-paper shadow-lg"><ChevronLeft className="absolute left-1.5 h-3.5 w-3.5" /><ChevronRight className="absolute right-1.5 h-3.5 w-3.5" /></span>
          </div>
        </div>
      </div>
    </section>
  );
}
