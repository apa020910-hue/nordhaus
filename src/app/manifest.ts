import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: "Construction and renovation services in Riga and across Latvia.",
    start_url: "/lv",
    lang: "lv",
    display: "standalone",
    background_color: "#f4f5f2",
    theme_color: "#1c1e1c",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
