import type { ProjectTypeId } from "./estimator";

/** What the "Get a Quote" / "Request Estimate" buttons can pre-fill in the quote form. */
export interface QuoteIntent {
  projectType?: ProjectTypeId;
  /** Free-text note, e.g. a specific service or project name, shown back to the visitor. */
  context?: string;
  area?: number;
  estimateLabel?: string;
}

export const QUOTE_EVENT = "nordhaus:quote";
export const CALLBACK_EVENT = "nordhaus:callback";

/** Pre-fills the quote form and scrolls to it. Browser only. */
export function openQuote(intent: QuoteIntent = {}): void {
  window.dispatchEvent(new CustomEvent<QuoteIntent>(QUOTE_EVENT, { detail: intent }));
  document.getElementById("quote")?.scrollIntoView();
}

/** Opens the "Request a Call" modal. Browser only. */
export function openCallback(): void {
  window.dispatchEvent(new CustomEvent(CALLBACK_EVENT));
}
