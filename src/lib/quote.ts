import type { ProjectTypeId } from "./estimator";

export const BUDGETS = [
  { id: "under-5k", label: "Under €5,000" },
  { id: "5k-15k", label: "€5,000–€15,000" },
  { id: "15k-30k", label: "€15,000–€30,000" },
  { id: "30k-50k", label: "€30,000–€50,000" },
  { id: "50k-100k", label: "€50,000–€100,000" },
  { id: "100k-plus", label: "€100,000+" },
] as const;

export type BudgetId = (typeof BUDGETS)[number]["id"];

export interface QuoteFormState {
  name: string;
  phone: string;
  email: string;
  projectType: ProjectTypeId | "";
  location: string;
  area: string;
  budget: BudgetId | "";
  startDate: string;
  message: string;
}

export const EMPTY_QUOTE_FORM: QuoteFormState = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  location: "",
  area: "",
  budget: "",
  startDate: "",
  message: "",
};

export type QuoteField = "name" | "contact" | "email";
export type QuoteErrorCode = "required" | "invalid";
export type QuoteErrors = Partial<Record<QuoteField, QuoteErrorCode>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Name is required; at least one of phone/email must be given; email, if given, must look valid. */
export function validateQuote(state: Pick<QuoteFormState, "name" | "phone" | "email">): QuoteErrors {
  const errors: QuoteErrors = {};
  const name = state.name.trim();
  const phone = state.phone.trim();
  const email = state.email.trim();

  if (!name) errors.name = "required";
  if (!phone && !email) errors.contact = "required";
  if (email && !EMAIL_PATTERN.test(email)) errors.email = "invalid";

  return errors;
}

/** Accepted demo upload types, matching the hint text shown next to the field. */
export const ACCEPTED_FILE_TYPES = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";
