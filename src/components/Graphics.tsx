import { cn } from "./ui";
import type { ServiceCategory } from "@/lib/data";

/** FNV-1a 32-bit hash — deterministic seed from a string id. */
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** A pseudo-random float in [0, 1), derived from a seed and a salt. No external PRNG needed. */
function rand(seed: number, salt: number): number {
  const h = Math.imul(seed ^ salt, 2654435761) >>> 0;
  return h / 4294967296;
}

// --- Dimension line ---------------------------------------------------
// The site's one recurring graphic device: a measurement annotation, used
// wherever there's a real number to show (durations, areas, stats) rather
// than as pure decoration.

export function DimensionLine({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="relative h-2 w-full">
        <span className="absolute left-0 top-0 h-2 w-px bg-rust" />
        <span className="absolute right-0 top-0 h-2 w-px bg-rust" />
        <span className="absolute left-0 top-1 h-px w-full bg-rust" />
      </div>
      {label && <span className="mt-1.5 text-xs tabular text-rust">{label}</span>}
    </div>
  );
}

// --- Hero: house elevation with dimension lines ------------------------

export function HouseElevation({ className }: { className?: string }) {
  let i = 0;
  const next = () => i++;

  return (
    <svg viewBox="0 0 640 520" className={className} aria-hidden="true" focusable="false" fill="none">
      {/* Backdrop grid: a static blueprint texture, not part of the one animated reveal. */}
      <g stroke="var(--color-concrete)" strokeOpacity="0.1" strokeWidth="1">
        {Array.from({ length: 17 }, (_, idx) => (
          <line key={`v${idx}`} x1={idx * 40} y1="0" x2={idx * 40} y2="520" />
        ))}
        {Array.from({ length: 14 }, (_, idx) => (
          <line key={`h${idx}`} x1="0" y1={idx * 40} x2="640" y2={idx * 40} />
        ))}
      </g>

      <g strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <polyline
          points="120,190 320,70 520,190"
          pathLength={1}
          className="draw-line"
          style={{ "--i": next() } as React.CSSProperties}
          stroke="var(--color-charcoal)"
        />
        <rect
          x="160"
          y="190"
          width="320"
          height="240"
          pathLength={1}
          className="draw-line"
          style={{ "--i": next() } as React.CSSProperties}
          stroke="var(--color-charcoal)"
        />
        <rect
          x="290"
          y="330"
          width="60"
          height="100"
          pathLength={1}
          className="draw-line"
          style={{ "--i": next() } as React.CSSProperties}
          stroke="var(--color-charcoal)"
          strokeWidth="2"
        />
        <rect
          x="205"
          y="250"
          width="70"
          height="60"
          pathLength={1}
          className="draw-line"
          style={{ "--i": next() } as React.CSSProperties}
          stroke="var(--color-concrete)"
          strokeWidth="2"
        />
        <path
          d="M240,250 V310 M205,280 H275"
          pathLength={1}
          className="draw-line"
          style={{ "--i": next() } as React.CSSProperties}
          stroke="var(--color-concrete)"
          strokeWidth="1.5"
        />
        <rect
          x="365"
          y="250"
          width="70"
          height="60"
          pathLength={1}
          className="draw-line"
          style={{ "--i": next() } as React.CSSProperties}
          stroke="var(--color-concrete)"
          strokeWidth="2"
        />
        <path
          d="M400,250 V310 M365,280 H435"
          pathLength={1}
          className="draw-line"
          style={{ "--i": next() } as React.CSSProperties}
          stroke="var(--color-concrete)"
          strokeWidth="1.5"
        />
        <rect
          x="420"
          y="95"
          width="26"
          height="45"
          pathLength={1}
          className="draw-line"
          style={{ "--i": next() } as React.CSSProperties}
          stroke="var(--color-charcoal)"
          strokeWidth="2"
        />
        <line
          x1="60"
          y1="430"
          x2="600"
          y2="430"
          pathLength={1}
          className="draw-line"
          style={{ "--i": next() } as React.CSSProperties}
          stroke="var(--color-concrete)"
          strokeWidth="1.5"
        />

        {/* Dimension: footprint width */}
        <path
          d="M160,430 L160,462 M160,462 L480,462 M480,462 L480,430"
          pathLength={1}
          className="draw-line"
          style={{ "--i": next() } as React.CSSProperties}
          stroke="var(--color-rust)"
          strokeWidth="1.75"
        />
        {/* Dimension: ridge height */}
        <path
          d="M320,70 L580,70 M480,430 L580,430 M580,70 L580,430"
          pathLength={1}
          className="draw-line"
          style={{ "--i": next() } as React.CSSProperties}
          stroke="var(--color-rust)"
          strokeWidth="1.75"
        />
      </g>

      <text x="320" y="486" textAnchor="middle" fontSize="15" fill="var(--color-rust)" className="tabular" fontWeight={500}>
        9.6 m
      </text>
      <text
        x="598"
        y="250"
        textAnchor="middle"
        fontSize="15"
        fill="var(--color-rust)"
        className="tabular"
        fontWeight={500}
        transform="rotate(90 598 250)"
      >
        6.1 m
      </text>
    </svg>
  );
}

// --- Service glyphs ------------------------------------------------------
// One small bespoke line icon per service — used exactly once each.

const SERVICE_GLYPHS: Record<string, React.ReactNode> = {
  "private-house": (
    <>
      <polyline points="6,24 24,8 42,24" />
      <rect x="12" y="24" width="24" height="16" />
      <rect x="21" y="30" width="6" height="10" />
    </>
  ),
  "apartment-renovation": (
    <>
      <rect x="7" y="9" width="34" height="30" />
      <path d="M24 9v12M24 21h17M19 21v18" />
    </>
  ),
  "commercial-renovation": (
    <>
      <rect x="9" y="8" width="30" height="32" />
      {[0, 1, 2].flatMap((row) =>
        [0, 1].map((col) => <rect key={`${row}-${col}`} x={14 + col * 11} y={13 + row * 9} width="7" height="5" />),
      )}
    </>
  ),
  "interior-finishing": (
    <>
      <rect x="18" y="8" width="16" height="10" rx="1" />
      <path d="M22 18v8l-8 8" />
      <circle cx="13" cy="35" r="3" />
    </>
  ),
  roofing: (
    <>
      <polyline points="6,26 24,10 42,26" />
      <path d="M14,22 30,22 M11,25 33,25" />
      <path d="M24 10v30" strokeDasharray="2 4" />
    </>
  ),
  "facade-insulation": (
    <>
      <rect x="8" y="10" width="32" height="7" />
      <rect x="8" y="20.5" width="32" height="7" />
      <rect x="8" y="31" width="32" height="7" />
    </>
  ),
  reconstruction: (
    <>
      <path d="M6 24 24 8l18 16" />
      <path d="M12 24v16h11" strokeDasharray="3 3.5" />
      <path d="M27 40v-9h11v9" />
    </>
  ),
  terraces: (
    <>
      <path d="M6 16h36M6 24h36M6 32h36" />
      <path d="M10 16v20M38 16v20" />
    </>
  ),
};

export function ServiceGlyph({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {SERVICE_GLYPHS[id] ?? null}
    </svg>
  );
}

// --- Project portfolio art -----------------------------------------------
// Deterministic abstract pattern per project — stands in for photography,
// styled differently per category so the grid isn't visually uniform.

export function ProjectArt({ id, category, className }: { id: string; category: ServiceCategory; className?: string }) {
  const seed = hash(id);
  const tint = rand(seed, 1) > 0.5;

  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" focusable="false" fill="none">
      <rect x="0" y="0" width="400" height="300" fill={tint ? "var(--color-mist)" : "var(--color-paper)"} />
      {category === "construction" && <ConstructionArt seed={seed} />}
      {category === "renovation" && <RenovationArt seed={seed} />}
      {category === "commercial" && <CommercialArt seed={seed} />}
      {category === "exterior" && <ExteriorArt seed={seed} />}
    </svg>
  );
}

function ConstructionArt({ seed }: { seed: number }) {
  const rects = [0, 1, 2].map((idx) => {
    const inset = 28 + idx * (26 + rand(seed, idx) * 14);
    return { inset, idx };
  });
  return (
    <g stroke="var(--color-concrete)" strokeWidth="1.5">
      {rects.map(({ inset, idx }) => (
        <rect
          key={idx}
          x={inset}
          y={inset * 0.72}
          width={400 - inset * 2}
          height={300 - inset * 1.44}
          stroke={idx === rects.length - 1 ? "var(--color-rust)" : undefined}
        />
      ))}
    </g>
  );
}

function RenovationArt({ seed }: { seed: number }) {
  const dx = 26 + rand(seed, 2) * 30;
  const dy = 20 + rand(seed, 3) * 22;
  return (
    <g strokeWidth="1.5">
      <rect x={60 - dx} y={46 - dy} width="220" height="170" stroke="var(--color-concrete)" strokeDasharray="4 5" />
      <rect x={60 + dx * 0.4} y={46 + dy * 0.4} width="220" height="170" stroke="var(--color-rust)" />
    </g>
  );
}

function CommercialArt({ seed }: { seed: number }) {
  const cols = 5 + Math.floor(rand(seed, 4) * 3);
  const rows = 4;
  const w = 320 / cols;
  const h = 200 / rows;
  const ox = 40;
  const oy = 50;
  return (
    <g stroke="var(--color-concrete)" strokeWidth="1.25">
      <rect x={ox} y={oy} width={w * cols} height={h * rows} stroke="var(--color-rust)" strokeWidth="1.5" />
      {Array.from({ length: cols - 1 }, (_, idx) => (
        <line key={`c${idx}`} x1={ox + w * (idx + 1)} y1={oy} x2={ox + w * (idx + 1)} y2={oy + h * rows} />
      ))}
      {Array.from({ length: rows - 1 }, (_, idx) => (
        <line key={`r${idx}`} x1={ox} y1={oy + h * (idx + 1)} x2={ox + w * cols} y2={oy + h * (idx + 1)} />
      ))}
    </g>
  );
}

function ExteriorArt({ seed }: { seed: number }) {
  const lines = Array.from({ length: 11 }, (_, idx) => idx);
  const angle = 28 + rand(seed, 5) * 10;
  return (
    <g stroke="var(--color-concrete)" strokeWidth="1.25">
      <g transform={`rotate(${angle} 200 150)`} clipPath="url(#exterior-clip)">
        {lines.map((idx) => (
          <line key={idx} x1={-80 + idx * 48} y1="-60" x2={-80 + idx * 48} y2="360" />
        ))}
      </g>
      <clipPath id="exterior-clip">
        <rect x="0" y="0" width="400" height="300" />
      </clipPath>
      <line x1="0" y1="250" x2="400" y2="250" stroke="var(--color-rust)" strokeWidth="1.75" />
    </g>
  );
}

// --- Before / after textures ----------------------------------------------

export function BeforeArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" focusable="false" fill="none">
      <rect width="400" height="300" fill="var(--color-mist)" />
      <g stroke="var(--color-concrete)" strokeWidth="1.25" strokeOpacity="0.8">
        {Array.from({ length: 16 }, (_, idx) => (
          <line key={idx} x1={-40 + idx * 36} y1="-20" x2={-40 + idx * 36 + 300} y2="320" />
        ))}
      </g>
      <rect x="150" y="60" width="26" height="180" fill="var(--color-mist)" stroke="var(--color-charcoal)" strokeWidth="2" />
      <rect x="150" y="60" width="140" height="26" fill="var(--color-mist)" stroke="var(--color-charcoal)" strokeWidth="2" />
    </svg>
  );
}

export function AfterArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" focusable="false" fill="none">
      <rect width="400" height="300" fill="var(--color-paper)" />
      <g stroke="var(--color-line)" strokeWidth="1.25">
        {Array.from({ length: 11 }, (_, idx) => (
          <line key={idx} x1="0" y1={40 + idx * 22} x2="400" y2={40 + idx * 22} />
        ))}
      </g>
      <rect x="240" y="40" width="120" height="100" fill="none" stroke="var(--color-charcoal)" strokeWidth="2" />
      <path d="M300 40v100M240 90h120" stroke="var(--color-charcoal)" strokeWidth="1.5" />
      <rect x="250" y="50" width="100" height="80" fill="var(--color-rust)" fillOpacity="0.08" />
    </svg>
  );
}
