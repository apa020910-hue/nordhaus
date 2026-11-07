"use client";

import type { ComponentPropsWithoutRef } from "react";
import { openQuote, type QuoteIntent } from "@/lib/quote-events";

type QuoteLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick"> & {
  /** What to pre-fill in the quote form. */
  intent?: QuoteIntent;
};

/** An anchor to #quote (works without JS) that also pre-fills the quote form. */
export function QuoteLink({ intent, children, ...props }: QuoteLinkProps) {
  return (
    <a
      {...props}
      href="#quote"
      onClick={(event) => {
        event.preventDefault();
        openQuote(intent);
      }}
    >
      {children}
    </a>
  );
}
