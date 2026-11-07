"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { Close } from "./Icons";
import { ProjectArt } from "./Graphics";
import { QuoteLink } from "./QuoteLink";
import { buttonClasses, cn } from "./ui";

export function ProjectDetail({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { dict } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = project !== null;
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = previousOverflow; };
  }, [open, onClose]);
  return (
    <div className={cn("fixed inset-0 z-50", !open && "pointer-events-none")} aria-hidden={!open}>
      <div onClick={onClose} className={cn("absolute inset-0 bg-charcoal/50 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")} />
      <div role="dialog" aria-modal="true" aria-labelledby="project-detail-title" className={cn("absolute inset-y-0 right-0 flex w-full max-w-xl flex-col overflow-y-auto bg-paper shadow-2xl transition-transform duration-300", open ? "translate-x-0" : "translate-x-full")}>
        {project && <>
          <div className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-8"><p className="text-sm text-concrete">{dict.projects.detail}</p><button ref={closeRef} type="button" onClick={onClose} aria-label={dict.misc.closeProject} className="grid h-10 w-10 place-items-center rounded border border-line"><Close className="h-4 w-4" /></button></div>
          <div className="px-6 py-8 sm:px-8"><h3 id="project-detail-title" className="text-3xl leading-tight sm:text-4xl">{project.title}</h3><p className="mt-2 text-concrete">{project.location}</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 sm:grid-cols-3"><Field label={dict.projects.location} value={project.location} /><Field label={dict.projects.service} value={project.servicesText} /><Field label={dict.projects.area} value={project.area} /><Field label={dict.projects.duration} value={project.duration} /><Field label={dict.projects.completed} value={String(project.year)} /><Field label={dict.projects.category} value={dict.projects.categories[project.category]} /></dl>
            <p className="mt-8 max-w-prose leading-relaxed text-ink">{project.description}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">{Array.from({ length: project.galleryCount }, (_, idx) => <ProjectArt key={idx} id={`${project.id}-${idx}`} category={project.category} className="aspect-[4/3] w-full border border-line" />)}</div>
            <div className="mt-10 border-t border-line pt-8"><p className="text-lg font-medium">{dict.projects.similar}</p><QuoteLink intent={{ context: project.title }} className={cn(buttonClasses("rust", "lg"), "mt-4")}>{dict.projects.request}</QuoteLink></div>
          </div>
        </>}
      </div>
    </div>
  );
}
function Field({ label, value }: { label: string; value: string }) { return <div><dt className="text-xs text-concrete">{label}</dt><dd className="mt-1 font-medium tabular">{value}</dd></div>; }
