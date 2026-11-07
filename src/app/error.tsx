"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-4xl">Something went wrong</p>
      <p className="mt-4 text-concrete">Reload the page, or call us directly.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="inline-flex h-12 items-center rounded bg-rust px-6 font-medium text-paper">
          Try again
        </button>
        <a href={site.phoneHref} className="inline-flex h-12 items-center rounded border border-charcoal/30 px-6 font-medium text-charcoal">
          Call: {site.phone}
        </a>
      </div>
    </div>
  );
}
