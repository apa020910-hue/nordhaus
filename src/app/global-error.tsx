"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f4f5f2", color: "#16180f", fontFamily: "sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "1.5rem",
          }}
        >
          <p style={{ fontSize: "2rem", margin: 0 }}>Something went wrong</p>
          <p style={{ marginTop: "0.75rem", color: "#8b8d86" }}>Please reload the page, or call us directly.</p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              type="button"
              onClick={reset}
              style={{ height: "3rem", padding: "0 1.5rem", border: "none", background: "#b6481a", color: "#f4f5f2", fontWeight: 500 }}
            >
              Try again
            </button>
            <a
              href={site.phoneHref}
              style={{
                height: "3rem",
                display: "inline-flex",
                alignItems: "center",
                padding: "0 1.5rem",
                border: "1px solid rgba(28,30,28,0.3)",
                color: "#1c1e1c",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Call: {site.phone}
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
