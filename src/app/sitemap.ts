import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { lv: `${site.url}/lv`, ru: `${site.url}/ru`, en: `${site.url}/en` };
  return Object.entries(languages).map(([lang, url]) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "lv" ? 1 : 0.9,
    alternates: { languages },
  }));
}
