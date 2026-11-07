"use client";

import { useI18n } from "@/lib/i18n/LocaleProvider";
import { cn } from "./ui";

export function Logo({ dark, className }: { dark?: boolean; className?: string }) {
  const { dict } = useI18n();
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="fs-expanded text-xl font-semibold tracking-[0.04em]">NORDHAUS</span>
      <span className={cn("mt-1 text-[0.65rem] tracking-[0.12em]", dark ? "text-paper/60" : "text-concrete")}>
        {dict.brandSubtitle}
      </span>
    </span>
  );
}
