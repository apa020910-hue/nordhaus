/**
 * Demo pricing engine for the cost estimator.
 *
 * Numbers are illustrative, not a real price list — the UI says so explicitly.
 * Rates are per m², deliberately simple (no regional/material nuance) so the
 * result changes predictably as the visitor adjusts the inputs.
 */

export const PROJECT_TYPES = [
  { id: "apartment-renovation", label: "Apartment Renovation" },
  { id: "house-construction", label: "House Construction" },
  { id: "house-renovation", label: "House Renovation" },
  { id: "commercial-renovation", label: "Commercial Renovation" },
  { id: "facade", label: "Facade" },
  { id: "roofing", label: "Roofing" },
] as const;

export type ProjectTypeId = (typeof PROJECT_TYPES)[number]["id"];

export const QUALITY_LEVELS = [
  { id: "standard", label: "Standard", hint: "Good materials, straightforward finishes." },
  { id: "comfort", label: "Comfort", hint: "Mid-range materials, more finishing detail." },
  { id: "premium", label: "Premium", hint: "High-end materials and finishing throughout." },
] as const;

export type QualityId = (typeof QUALITY_LEVELS)[number]["id"];

export const ADDONS = [
  { id: "electrical", label: "Electrical work", ratePerSqm: 35 },
  { id: "plumbing", label: "Plumbing", ratePerSqm: 40 },
  { id: "flooring", label: "Flooring", ratePerSqm: 45 },
  { id: "painting", label: "Painting", ratePerSqm: 20 },
  { id: "demolition", label: "Demolition", ratePerSqm: 25 },
] as const;

export type AddonId = (typeof ADDONS)[number]["id"];

/** Base rate in €/m² at "standard" quality, before add-ons. */
const BASE_RATE: Record<ProjectTypeId, number> = {
  "apartment-renovation": 450,
  "house-construction": 900,
  "house-renovation": 500,
  "commercial-renovation": 350,
  facade: 140,
  roofing: 110,
};

const QUALITY_MULTIPLIER: Record<QualityId, number> = {
  standard: 1,
  comfort: 1.35,
  premium: 1.85,
};

export const AREA_MIN = 20;
export const AREA_MAX = 500;
export const AREA_DEFAULT = 80;

export interface EstimateInput {
  projectType: ProjectTypeId;
  area: number;
  quality: QualityId;
  addons: readonly AddonId[];
}

export interface EstimateResult {
  low: number;
  high: number;
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

/** Rough, deterministic estimate range in EUR. Pure function — easy to unit test. */
export function computeEstimate({ projectType, area, quality, addons }: EstimateInput): EstimateResult {
  const clampedArea = Math.min(AREA_MAX, Math.max(AREA_MIN, area));
  const base = BASE_RATE[projectType] * QUALITY_MULTIPLIER[quality];
  const addonRate = addons.reduce((sum, id) => {
    const addon = ADDONS.find((item) => item.id === id);
    return sum + (addon?.ratePerSqm ?? 0);
  }, 0);

  const midpoint = clampedArea * (base + addonRate);
  const step = midpoint > 20000 ? 500 : 100;

  return {
    low: roundTo(midpoint * 0.85, step),
    high: roundTo(midpoint * 1.15, step),
  };
}

export function formatEur(value: number, locale: "en" | "lv" | "ru" = "en"): string {
  const numberLocale = locale === "lv" ? "lv-LV" : locale === "ru" ? "ru-RU" : "en-GB";
  return new Intl.NumberFormat(numberLocale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}
