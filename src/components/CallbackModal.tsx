"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { CALLBACK_EVENT } from "@/lib/quote-events";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { Check, Close } from "./Icons";
import { buttonClasses, cn, inputClasses } from "./ui";

const TIMES = ["morning", "afternoon", "evening"] as const;
type PreferredTime = (typeof TIMES)[number];

export function CallbackModal() {
  const { dict } = useI18n();
  const copy = dict.callbackModal;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState<PreferredTime | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const close = useCallback(() => { setOpen(false); window.setTimeout(() => { setName(""); setPhone(""); setTime(null); setError(null); setSent(false); }, 200); }, []);
  useEffect(() => { const onOpen = () => setOpen(true); window.addEventListener(CALLBACK_EVENT, onOpen); return () => window.removeEventListener(CALLBACK_EVENT, onOpen); }, []);
  useEffect(() => {
    if (!open) return;
    firstFieldRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = previousOverflow; };
  }, [open, close]);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!name.trim() || !phone.trim()) { setError(copy.required); return; } if (!time) { setError(copy.chooseTime); return; } setError(null); setSent(true); }
  if (!open) return null;
  return <div className="fixed inset-0 z-[60] grid place-items-center px-4" role="presentation"><div className="absolute inset-0 bg-charcoal/55" onClick={close} /><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="callback-title" className="relative w-full max-w-sm bg-paper p-6 shadow-2xl sm:p-8"><button type="button" onClick={close} aria-label={copy.close} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded border border-line"><Close className="h-4 w-4" /></button>{sent ? <div className="pt-4 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-rust text-paper"><Check className="h-6 w-6" /></span><h3 className="mt-5 text-2xl">{copy.received}</h3><p className="mt-2 text-concrete">{copy.success}</p><button type="button" onClick={close} className={cn(buttonClasses("outline-dark", "md"), "mt-6")}>{copy.close}</button></div> : <><h3 id="callback-title" className="pr-8 text-2xl">{copy.title}</h3><form onSubmit={submit} noValidate className="mt-6 grid gap-4"><div><label htmlFor="callback-name" className="mb-1.5 block text-sm font-medium">{copy.name}</label><input ref={firstFieldRef} id="callback-name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className={inputClasses} /></div><div><label htmlFor="callback-phone" className="mb-1.5 block text-sm font-medium">{copy.phone}</label><input id="callback-phone" type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+371" className={inputClasses} /></div><fieldset><legend className="mb-2 text-sm font-medium">{copy.preferred}</legend><div className="grid grid-cols-3 gap-2">{TIMES.map((value) => <button key={value} type="button" aria-pressed={time === value} onClick={() => setTime(value)} className={cn("border px-2 py-2 text-xs font-medium", time === value ? "border-rust bg-rust text-paper" : "border-line text-concrete hover:border-charcoal")}>{copy[value]}</button>)}</div></fieldset>{error && <p role="alert" className="text-sm text-rust">{error}</p>}<button type="submit" className={buttonClasses("rust", "lg")}>{copy.submit}</button></form></>}</div></div>;
}
