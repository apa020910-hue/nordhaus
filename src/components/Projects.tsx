"use client";

import { useMemo, useState } from "react";
import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from "@/lib/data";
import { useContent } from "@/lib/i18n/useContent";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { ProjectArt } from "./Graphics";
import { ProjectDetail } from "./ProjectDetail";
import { cn } from "./ui";

export function Projects() {
  const { dict } = useI18n();
  const { projects } = useContent();
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const filtered = useMemo(() => category === "all" ? projects : projects.filter((project) => project.category === category), [category, projects]);
  const active = projects.find((project) => project.id === activeId) ?? null;
  return (
    <section id="projects" className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl">{dict.projects.title}</h2>
          <div role="group" aria-label={dict.projects.filterLabel} className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((item) => (
              <button key={item} type="button" aria-pressed={item === category} onClick={() => setCategory(item)} className={cn("rounded border px-4 py-2 text-sm font-medium transition-colors", item === category ? "border-charcoal bg-charcoal text-paper" : "border-line bg-paper text-concrete hover:border-charcoal hover:text-ink")}>{dict.projects.categories[item]}</button>
            ))}
          </div>
        </div>
        <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <li key={project.id} className="bg-paper"><button type="button" onClick={() => setActiveId(project.id)} className="group block w-full text-left">
              <div className="relative overflow-hidden"><ProjectArt id={project.id} category={project.category} className="aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-[1.03]" /><span className="absolute left-3 top-3 fs-expanded text-sm font-semibold tabular text-concrete">{String(index + 1).padStart(2, "0")}</span></div>
              <div className="p-5"><p className="text-xs font-medium text-rust">{dict.projects.categories[project.category]}</p><p className="mt-1.5 text-lg font-medium">{project.title}</p><p className="text-sm text-concrete">{project.location}</p><div className="mt-3 flex items-center gap-3 text-xs text-concrete"><span className="tabular">{project.area}</span><span className="h-3 w-px bg-line" aria-hidden="true" /><span className="tabular">{project.duration}</span></div></div>
            </button></li>
          ))}
        </ul>
      </div>
      <ProjectDetail project={active} onClose={() => setActiveId(null)} />
    </section>
  );
}
