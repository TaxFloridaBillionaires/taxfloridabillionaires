import { motion, useReducedMotion } from "framer-motion";
import type { Candidate } from "@/data/candidates";

type Region = Candidate["region"];

/** Rough lng/lat → SVG projection (viewBox 0 0 320 470). */
export const project = ([lng, lat]: [number, number]): [number, number] => [
  ((lng + 87.7) / 7.7) * 300 + 10,
  ((31.1 - lat) / 6.1) * 400 + 35,
];

/**
 * Higher-resolution Florida coastline, clockwise from the NW corner
 * (Alabama line) around the Atlantic, the Keys, the Gulf and Big Bend.
 */
const OUTLINE: [number, number][] = [
  // Northern (state line) border, west → east
  [-87.6, 30.997],
  [-86.7, 30.997],
  [-85.9, 30.997],
  [-85.5, 31.0],
  [-85.11, 31.0],
  [-85.0, 30.79],
  [-84.94, 30.71],
  [-84.0, 30.68],
  [-83.3, 30.63],
  [-82.6, 30.59],
  [-82.21, 30.57],
  [-82.2, 30.44],
  [-82.05, 30.36],
  [-82.02, 30.6],
  [-81.7, 30.75],
  [-81.51, 30.73],
  // Atlantic coast, north → south
  [-81.44, 30.5],
  [-81.4, 30.1],
  [-81.28, 29.75],
  [-81.15, 29.4],
  [-80.98, 29.14],
  [-80.9, 28.98],
  [-80.75, 28.72],
  [-80.55, 28.5],
  [-80.53, 28.35],
  [-80.6, 28.16],
  [-80.5, 27.9],
  [-80.35, 27.55],
  [-80.15, 27.2],
  [-80.06, 26.85],
  [-80.03, 26.5],
  [-80.09, 26.1],
  [-80.13, 25.79],
  [-80.19, 25.55],
  [-80.3, 25.36],
  // Keys arc
  [-80.5, 25.2],
  [-81.1, 24.72],
  [-81.6, 24.57],
  [-81.8, 24.55],
  [-81.6, 24.72],
  [-81.05, 25.0],
  [-80.85, 25.15],
  // Gulf coast, south → north
  [-81.1, 25.2],
  [-81.17, 25.35],
  [-81.34, 25.7],
  [-81.45, 25.9],
  [-81.72, 26.35],
  [-81.85, 26.55],
  [-82.0, 26.75],
  [-82.06, 26.9],
  [-82.18, 26.95],
  [-82.25, 27.08],
  [-82.42, 27.3],
  [-82.52, 27.45],
  [-82.6, 27.6],
  [-82.71, 27.72],
  [-82.62, 27.78],
  [-82.72, 27.86],
  [-82.62, 27.9],
  [-82.65, 28.02],
  [-82.7, 28.2],
  [-82.68, 28.45],
  [-82.72, 28.7],
  [-82.75, 28.9],
  [-82.83, 29.0],
  // Big Bend
  [-83.05, 29.14],
  [-83.25, 29.3],
  [-83.4, 29.45],
  [-83.65, 29.7],
  [-84.0, 30.03],
  [-84.28, 29.95],
  [-84.35, 29.88],
  [-84.75, 29.77],
  [-85.02, 29.72],
  [-85.28, 29.68],
  [-85.4, 29.75],
  [-85.35, 29.9],
  [-85.55, 30.02],
  [-85.75, 30.15],
  [-86.1, 30.32],
  [-86.5, 30.4],
  [-86.9, 30.38],
  [-87.2, 30.32],
  [-87.4, 30.3],
  [-87.52, 30.28],
  [-87.45, 30.5],
  [-87.6, 30.75],
];

const toPath = (pts: [number, number][]) =>
  pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${project(p).map((n) => n.toFixed(1)).join(",")}`)
    .join(" ") + " Z";

const FLORIDA = toPath(OUTLINE);

/** Region highlight bands, clipped to the Florida outline. */
const [, Y29_2] = project([-82, 29.2]);
const [, Y27_2] = project([-82, 27.2]);
const [X84] = project([-84.0, 30]);
const [X81_2] = project([-81.2, 27]);

const REGION_RECTS: Record<Region, { x: number; y: number; w: number; h: number }> = {
  north: { x: 0, y: 0, w: X84, h: 470 },
  northeast: { x: X84, y: 0, w: 320 - X84, h: Y29_2 },
  central: { x: X84, y: Y29_2, w: 320 - X84, h: Y27_2 - Y29_2 },
  southwest: { x: X84, y: Y27_2, w: X81_2 - X84, h: 470 - Y27_2 },
  southeast: { x: X81_2, y: Y27_2, w: 320 - X81_2, h: 470 - Y27_2 },
};

const ORDER: Region[] = ["north", "northeast", "central", "southwest", "southeast"];

interface Props {
  active: Candidate;
  candidates?: Candidate[];
  onSelect?: (candidate: Candidate) => void;
}

export const FloridaMap = ({ active, candidates = [], onSelect }: Props) => {
  const reduce = useReducedMotion();
  const [mx, my] = project(active.center);
  const idx = ORDER.indexOf(active.region);

  const tilt = reduce ? 0 : 15 - idx * 4;
  const spin = reduce ? 0 : (idx - 2) * 6;

  /** First candidate found in a region — used for region click targets. */
  const regionCandidate = (r: Region) => candidates.find((c) => c.region === r);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ perspective: 1100 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,hsl(var(--gold)/0.12),transparent_65%)] pointer-events-none" />
      <motion.div
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateX: tilt,
          rotateZ: spin,
          scale: reduce ? 1 : 0.98,
          x: reduce ? 0 : (160 - mx) * 0.2,
          y: reduce ? 0 : (250 - my) * 0.2,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.9 }}
      >
        <svg
          viewBox="0 0 320 470"
          className="w-full h-full drop-shadow-[0_25px_45px_hsl(var(--gold)/0.15)]"
          role="group"
          aria-label="Map of Florida — select a region to jump to a candidate"
        >
          <defs>
            <clipPath id="fl-clip">
              <path d={FLORIDA} />
            </clipPath>
            <filter id="fl-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="7" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Base state */}
          <path d={FLORIDA} fill="hsl(var(--muted))" opacity={0.75} />

          <g clipPath="url(#fl-clip)">
            {ORDER.map((r) => {
              const rect = REGION_RECTS[r];
              const isActive = r === active.region;
              const target = regionCandidate(r);
              return (
                <g key={r}>
                  <motion.rect
                    x={rect.x}
                    y={rect.y}
                    width={rect.w}
                    height={rect.h}
                    initial={false}
                    animate={{
                      fill: isActive ? "hsl(var(--gold))" : "hsl(var(--muted))",
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    pointerEvents="none"
                  />
                  {target && onSelect && (
                    <rect
                      x={rect.x}
                      y={rect.y}
                      width={rect.w}
                      height={rect.h}
                      fill="transparent"
                      className="cursor-pointer hover:fill-gold/20 transition-colors"
                      role="button"
                      tabIndex={0}
                      aria-label={`Show ${target.name}`}
                      onClick={() => onSelect(target)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelect(target);
                        }
                      }}
                    />
                  )}
                </g>
              );
            })}
          </g>

          {/* Outline on top */}
          <path
            d={FLORIDA}
            fill="none"
            stroke="hsl(var(--gold))"
            strokeWidth={1.5}
            strokeLinejoin="round"
            opacity={0.5}
            filter="url(#fl-glow)"
            pointerEvents="none"
          />

          {/* Inactive candidate pins — clickable */}
          {candidates.map((c) => {
            if (c.name === active.name) return null;
            const [px, py] = project(c.center);
            return (
              <g
                key={c.name}
                transform={`translate(${px},${py})`}
                className={onSelect ? "cursor-pointer" : undefined}
                role={onSelect ? "button" : undefined}
                tabIndex={onSelect ? 0 : undefined}
                aria-label={`Show ${c.name}`}
                onClick={onSelect ? () => onSelect(c) : undefined}
                onKeyDown={(e) => {
                  if (onSelect && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onSelect(c);
                  }
                }}
              >
                <circle r={11} fill="transparent" />
                <circle
                  r={4}
                  fill="hsl(var(--muted-foreground))"
                  stroke="hsl(var(--background))"
                  strokeWidth={1.5}
                  className="hover:fill-gold transition-colors"
                />
              </g>
            );
          })}

          <motion.g
            initial={false}
            animate={{ x: mx, y: my }}
            transition={{ type: "spring", stiffness: 70, damping: 16 }}
            pointerEvents="none"
          >
            <motion.circle
              fill="hsl(var(--crimson))"
              initial={{ r: 10, opacity: 0.4 }}
              animate={reduce ? { r: 10, opacity: 0.4 } : { r: [10, 22, 10], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            <circle r={5.5} fill="hsl(var(--crimson))" stroke="hsl(var(--foreground))" strokeWidth={2} />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
};

export default FloridaMap;
