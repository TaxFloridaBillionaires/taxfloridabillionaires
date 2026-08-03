import { motion, useReducedMotion } from "framer-motion";
import type { Candidate } from "@/data/candidates";

type Region = Candidate["region"];

/** Rough lng/lat → SVG projection (viewBox 0 0 320 470). */
export const project = ([lng, lat]: [number, number]): [number, number] => [
  ((lng + 87.7) / 7.7) * 300 + 10,
  ((31.1 - lat) / 6.1) * 400 + 35,
];

/** Simplified real-world Florida coastline, clockwise from the NW corner. */
const OUTLINE: [number, number][] = [
  [-87.6, 31.0],
  [-85.0, 31.0],
  [-84.9, 30.71],
  [-82.2, 30.57],
  [-82.05, 30.36],
  [-81.5, 30.72],
  [-81.44, 30.2],
  [-81.25, 29.6],
  [-80.9, 29.05],
  [-80.53, 28.46],
  [-80.6, 28.1],
  [-80.15, 27.2],
  [-80.03, 26.7],
  [-80.12, 25.79],
  [-80.35, 25.31],
  [-80.9, 25.14],
  [-81.15, 25.22],
  [-81.35, 25.85],
  [-81.72, 26.4],
  [-82.05, 26.9],
  [-82.28, 27.1],
  [-82.45, 27.42],
  [-82.7, 27.72],
  [-82.55, 27.86],
  [-82.65, 28.15],
  [-82.7, 28.6],
  [-82.75, 28.95],
  [-83.02, 29.15],
  [-83.4, 29.44],
  [-84.0, 30.02],
  [-84.36, 29.9],
  [-85.02, 29.72],
  [-85.42, 29.68],
  [-85.7, 30.1],
  [-86.4, 30.4],
  [-87.2, 30.32],
  [-87.5, 30.28],
];

const toPath = (pts: [number, number][]) =>
  pts.map((p, i) => `${i === 0 ? "M" : "L"}${project(p).map((n) => n.toFixed(1)).join(",")}`).join(" ") +
  " Z";

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
}

export const FloridaMap = ({ active }: Props) => {
  const reduce = useReducedMotion();
  const [mx, my] = project(active.center);
  const idx = ORDER.indexOf(active.region);

  const tilt = reduce ? 0 : 15 - idx * 4;
  const spin = reduce ? 0 : (idx - 2) * 6;

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ perspective: 1100 }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,hsl(var(--gold)/0.12),transparent_65%)]" />
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
              return (
                <motion.rect
                  key={r}
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
                />
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
          />

          <motion.g
            initial={false}
            animate={{ x: mx, y: my }}
            transition={{ type: "spring", stiffness: 70, damping: 16 }}
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
