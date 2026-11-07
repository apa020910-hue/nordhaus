"use client";

import { useMemo } from "react";
import { FAQ, PROCESS, PROJECTS, REVIEWS, SERVICES, TEAM, TRUST } from "@/lib/data";
import { useI18n } from "./LocaleProvider";

function localizeLocation(value: string, locale: "en" | "lv" | "ru") {
  if (value === "Riga Centre") return locale === "lv" ? "Rīgas centrs" : locale === "ru" ? "Центр Риги" : value;
  if (value === "Riga") return locale === "lv" ? "Rīga" : locale === "ru" ? "Рига" : value;
  return value;
}
function localizeDuration(value: string, locale: "en" | "lv" | "ru") {
  if (locale === "lv") return value.replace(" months", " mēneši").replace(" weeks", " nedēļas");
  if (locale === "ru") return value.replace(" months", " месяцев").replace(" weeks", " недель");
  return value;
}
function localizeArea(value: string, locale: "en" | "lv" | "ru") {
  if (value !== "410 m² facade") return value;
  return locale === "lv" ? "410 m² fasāde" : locale === "ru" ? "410 м² фасад" : value;
}

export function useContent() {
  const { dict, locale } = useI18n();

  const services = useMemo(() => SERVICES.map((item, index) => ({ ...item, ...dict.services.items[index] })), [dict.services]);
  const projects = useMemo(() => PROJECTS.map((item, index) => ({ ...item, ...dict.projects.items[index], location: localizeLocation(item.location, locale), duration: localizeDuration(item.duration, locale), area: localizeArea(item.area, locale) })), [dict.projects, locale]);
  const team = useMemo(() => TEAM.map((item, index) => ({ ...item, ...dict.team.members[index] })), [dict.team]);
  const reviews = useMemo(() => REVIEWS.map((item, index) => ({ ...item, ...dict.reviews.items[index], location: localizeLocation(item.location, locale) })), [dict.reviews, locale]);
  const process = useMemo(() => PROCESS.map((item, index) => ({ ...item, ...dict.process.steps[index] })), [dict.process]);
  const faq = useMemo(() => FAQ.map((item, index) => ({ ...item, ...dict.faq.items[index] })), [dict.faq]);
  const trust = useMemo(() => TRUST.map((item, index) => ({ ...item, ...dict.trust.items[index] })), [dict.trust]);

  return { services, projects, team, reviews, process, faq, trust };
}
