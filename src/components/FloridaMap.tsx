import { motion, useReducedMotion } from "framer-motion";
import type { Candidate } from "@/data/candidates";

type Region = Candidate["region"];

/**
 * Equirectangular projection with a cos(lat) correction so the state keeps its
 * true proportions (viewBox 0 0 400 400) instead of being stretched vertically.
 */
const K = 55; // px per degree of latitude
const COS_LAT = Math.cos((27.8 * Math.PI) / 180);

export const project = ([lng, lat]: [number, number]): [number, number] => [
  (lng + 87.75) * COS_LAT * K + 12,
  (31.15 - lat) * K + 14,
];


/**
 * Higher-resolution Florida coastline, clockwise from the NW corner
 * (Alabama line) around the Atlantic, the Keys, the Gulf and Big Bend.
 */
const OUTLINE: [number, number][] = [
  // Alabama line, then the Georgia line east along 31°N
  [-87.598, 30.997],
  [-87.16, 30.999],
  [-86.5, 30.997],
  [-85.9, 30.994],
  [-85.49, 31.001],
  [-85.18, 31.0],
  [-85.1, 30.9],
  [-85.03, 30.8],
  [-84.98, 30.71],
  [-84.86, 30.71],
  [-84.28, 30.69],
  [-83.74, 30.65],
  [-83.31, 30.634],
  [-82.94, 30.607],
  [-82.6, 30.585],
  [-82.22, 30.568],
  // Okefenokee jog down the Georgia border, then the St. Marys River east
  [-82.21, 30.42],
  [-82.17, 30.36],
  [-82.05, 30.36],
  [-82.02, 30.5],
  [-82.03, 30.6],
  [-81.93, 30.68],
  [-81.83, 30.75],
  [-81.66, 30.75],
  [-81.51, 30.72],
  // Atlantic coast, north → south
  [-81.44, 30.5],
  [-81.4, 30.25],
  [-81.38, 30.05],
  [-81.31, 29.86],
  [-81.24, 29.66],
  [-81.14, 29.42],
  [-81.03, 29.21],
  [-80.93, 29.05],
  [-80.83, 28.9],
  [-80.72, 28.72],
  [-80.6, 28.6],
  [-80.55, 28.48],
  [-80.53, 28.4],
  [-80.57, 28.29],
  [-80.6, 28.16],
  [-80.53, 28.02],
  [-80.44, 27.85],
  [-80.32, 27.6],
  [-80.22, 27.35],
  [-80.14, 27.15],
  [-80.08, 26.95],
  [-80.04, 26.7],
  [-80.04, 26.45],
  [-80.07, 26.2],
  [-80.11, 25.98],
  [-80.14, 25.78],
  [-80.18, 25.6],
  [-80.24, 25.44],
  [-80.34, 25.33],
  // Keys arc out to Key West, and back along their bay side
  [-80.5, 25.22],
  [-80.86, 24.9],
  [-81.2, 24.7],
  [-81.55, 24.6],
  [-81.8, 24.55],
  [-81.75, 24.68],
  [-81.4, 24.78],
  [-81.05, 24.98],
  [-80.75, 25.2],
  // Florida Bay and the Everglades / Ten Thousand Islands
  [-80.9, 25.16],
  [-81.08, 25.14],
  [-81.16, 25.28],
  [-81.21, 25.5],
  [-81.34, 25.72],
  [-81.5, 25.9],
  [-81.65, 26.1],
  [-81.79, 26.3],
  [-81.87, 26.45],
  [-81.95, 26.6],
  [-82.02, 26.72],
  [-82.06, 26.86],
  [-82.14, 26.95],
  [-82.2, 27.03],
  [-82.28, 27.15],
  [-82.42, 27.32],
  [-82.5, 27.45],
  [-82.57, 27.56],
  [-82.63, 27.67],
  // Tampa Bay mouth → Pinellas peninsula
  [-82.7, 27.74],
  [-82.6, 27.8],
  [-82.6, 27.9],
  [-82.72, 27.94],
  [-82.75, 28.05],
  [-82.7, 28.15],
  [-82.68, 28.3],
  [-82.66, 28.5],
  [-82.68, 28.72],
  [-82.72, 28.87],
  [-82.79, 29.0],
  // Big Bend / Nature Coast
  [-82.94, 29.08],
  [-83.07, 29.18],
  [-83.18, 29.28],
  [-83.32, 29.4],
  [-83.42, 29.5],
  [-83.62, 29.68],
  [-83.85, 29.9],
  [-84.02, 30.03],
  [-84.2, 30.05],
  [-84.34, 29.92],
  [-84.42, 29.87],
  [-84.65, 29.8],
  [-84.88, 29.74],
  [-85.02, 29.72],
  [-85.22, 29.68],
  [-85.35, 29.72],
  [-85.4, 29.83],
  [-85.36, 29.95],
  [-85.52, 30.03],
  [-85.66, 30.1],
  [-85.85, 30.2],
  [-86.09, 30.32],
  [-86.4, 30.39],
  [-86.65, 30.4],
  [-86.9, 30.38],
  [-87.13, 30.33],
  [-87.28, 30.32],
  [-87.42, 30.3],
  [-87.52, 30.28],
  [-87.42, 30.44],
  [-87.4, 30.62],
  [-87.52, 30.75],
  [-87.6, 30.86],
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
  north: { x: 0, y: 0, w: X84, h: 400 },
  northeast: { x: X84, y: 0, w: 400 - X84, h: Y29_2 },
  central: { x: X84, y: Y29_2, w: 400 - X84, h: Y27_2 - Y29_2 },
  southwest: { x: X84, y: Y27_2, w: X81_2 - X84, h: 400 - Y27_2 },
  southeast: { x: X81_2, y: Y27_2, w: 400 - X81_2, h: 400 - Y27_2 },
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
          x: reduce ? 0 : (200 - mx) * 0.2,
          y: reduce ? 0 : (200 - my) * 0.2,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.9 }}
      >
        <svg
          viewBox="0 0 400 400"
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
