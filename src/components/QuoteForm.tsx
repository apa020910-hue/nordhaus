"use client";

import { useEffect, useState, type FormEvent } from "react";
import { PROJECT_TYPES, type ProjectTypeId } from "@/lib/estimator";
import { ACCEPTED_FILE_TYPES, BUDGETS, EMPTY_QUOTE_FORM, validateQuote, type BudgetId, type QuoteErrors, type QuoteFormState } from "@/lib/quote";
import { QUOTE_EVENT, type QuoteIntent } from "@/lib/quote-events";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { Check, File, Upload } from "./Icons";
import { buttonClasses, cn, inputClasses, textareaClasses } from "./ui";

export function QuoteForm() {
  const { dict } = useI18n();
  const copy = dict.quoteForm;
  const [form, setForm] = useState<QuoteFormState>(EMPTY_QUOTE_FORM);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [fileName, setFileName] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const onQuote = (event: Event) => {
      const intent: QuoteIntent = (event as CustomEvent<QuoteIntent>).detail ?? {};
      setSent(false); setErrors({});
      setForm((current) => {
        const parts: string[] = [];
        if (intent.context) parts.push(intent.context);
        if (intent.estimateLabel) parts.push(`${copy.estimatedRange}: ${intent.estimateLabel}`);
        return { ...current, projectType: intent.projectType ?? current.projectType, area: intent.area ? String(intent.area) : current.area, message: parts.length > 0 ? `${parts.join(". ")}.` : current.message };
      });
      setNote(intent.context ?? null);
    };
    window.addEventListener(QUOTE_EVENT, onQuote);
    return () => window.removeEventListener(QUOTE_EVENT, onQuote);
  }, [copy.estimatedRange]);
  function update<K extends keyof QuoteFormState>(key: K, value: QuoteFormState[K]) { setForm((current) => ({ ...current, [key]: value })); }
  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) { setFileName(event.target.files?.[0]?.name ?? null); }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const nextErrors = validateQuote(form); setErrors(nextErrors); if (Object.keys(nextErrors).length > 0) return; setSent(true); }
  function resetForm() { setForm(EMPTY_QUOTE_FORM); setFileName(null); setNote(null); setErrors({}); setSent(false); }
  if (sent) return <section id="quote" className="scroll-mt-24 bg-mist py-24 lg:py-32"><div className="mx-auto max-w-2xl px-5 text-center sm:px-8"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-rust text-paper"><Check className="h-7 w-7" /></span><h2 className="mt-6 text-3xl sm:text-4xl">{copy.thank}</h2><p className="mt-3 text-lg text-concrete">{copy.received}</p><p className="mt-1 text-lg text-concrete">{copy.followup}</p><button type="button" onClick={resetForm} className={cn(buttonClasses("outline-dark", "md"), "mt-8")}>{copy.another}</button></div></section>;
  const fieldError = (field: "name" | "email" | "contact") => errors[field] === "required" ? copy.required : errors[field] === "invalid" ? copy.invalidEmail : undefined;
  return <section id="quote" className="scroll-mt-24 bg-mist py-24 lg:py-32"><div className="mx-auto max-w-4xl px-5 sm:px-8"><h2 className="text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl">{copy.title}</h2><p className="mt-5 max-w-xl text-lg leading-relaxed text-concrete">{copy.intro}</p>{note && <p className="mt-4 inline-block border border-rust px-3 py-1.5 text-sm text-rust">{copy.related} {note}</p>}
    <form onSubmit={submit} noValidate className="mt-10 grid gap-6 sm:grid-cols-2">
      <Field label={copy.name} error={fieldError("name")}><input type="text" autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} className={cn(inputClasses, errors.name && "border-rust")} /></Field>
      <div className="grid grid-cols-2 gap-4 sm:col-span-1"><Field label={copy.phone}><input type="tel" inputMode="tel" autoComplete="tel" placeholder="+371" value={form.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={Boolean(errors.contact)} className={cn(inputClasses, errors.contact && "border-rust")} /></Field><Field label={copy.email} error={fieldError("email")}><input type="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email ?? errors.contact)} className={cn(inputClasses, (errors.email || errors.contact) && "border-rust")} /></Field></div>
      {errors.contact && <p className="-mt-4 text-sm text-rust sm:col-span-2">{copy.contactError}</p>}
      <Field label={copy.projectType}><select value={form.projectType} onChange={(event) => update("projectType", event.target.value as ProjectTypeId)} className={inputClasses}><option value="">{copy.selectService}</option>{PROJECT_TYPES.map((item, index) => <option key={item.id} value={item.id}>{dict.estimator.projectTypes[index]}</option>)}</select></Field>
      <Field label={copy.location}><input type="text" placeholder={copy.locationPlaceholder} value={form.location} onChange={(event) => update("location", event.target.value)} className={inputClasses} /></Field>
      <Field label={copy.area}><input type="text" inputMode="numeric" placeholder={copy.areaPlaceholder} value={form.area} onChange={(event) => update("area", event.target.value)} className={inputClasses} /></Field>
      <Field label={copy.budget}><select value={form.budget} onChange={(event) => update("budget", event.target.value as BudgetId)} className={inputClasses}><option value="">{copy.selectRange}</option>{BUDGETS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></Field>
      <Field label={copy.startDate}><input type="date" value={form.startDate} onChange={(event) => update("startDate", event.target.value)} className={inputClasses} /></Field>
      <Field label={copy.message} full><textarea rows={4} value={form.message} onChange={(event) => update("message", event.target.value)} className={textareaClasses} /></Field>
      <div className="sm:col-span-2"><label className="mb-2 block text-sm font-medium">{copy.upload}</label><label className="flex cursor-pointer items-center gap-3 border border-dashed border-line px-4 py-4 text-sm text-concrete hover:border-charcoal"><Upload className="h-5 w-5 shrink-0" /><span className="min-w-0 flex-1">{fileName ? <span className="flex items-center gap-2 text-ink"><File className="h-4 w-4 shrink-0 text-rust" /><span className="truncate">{fileName}</span></span> : copy.uploadHint}</span><input type="file" accept={ACCEPTED_FILE_TYPES} onChange={onFileChange} className="sr-only" /></label></div>
      <div className="sm:col-span-2"><button type="submit" className={cn(buttonClasses("rust", "lg"), "w-full sm:w-auto")}>{copy.send}</button></div>
    </form>
  </div></section>;
}
function Field({ label, error, full, children }: { label: string; error?: string; full?: boolean; children: React.ReactNode }) { return <div className={full ? "sm:col-span-2" : undefined}><label className="mb-2 block text-sm font-medium">{label}</label>{children}{error && <p className="mt-1.5 text-sm text-rust">{error}</p>}</div>; }
