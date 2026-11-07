"use client";

import { useI18n } from "@/lib/i18n/LocaleProvider";
import { openCallback } from "@/lib/quote-events";
import { buttonClasses } from "./ui";

export function CallbackButton({ className }: { className?: string }) {
  const { dict } = useI18n();
  return <button type="button" onClick={() => openCallback()} className={className ?? buttonClasses("outline-light", "md")}>{dict.callback}</button>;
}
