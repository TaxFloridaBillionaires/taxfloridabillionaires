import { motion, useReducedMotion } from "framer-motion";
import type { Candidate } from "@/data/candidates";

type Region = Candidate["region"];

/** Stylized (non-survey-accurate) Florida regions. */
const REGION_PATHS: Record<Region, string> = {
  north: "M10,95 L60,72 L140,70 L170,80 L170,150 L140,156 L60,142 L20,130 Z",
  northeast: "M170,80 L250,70 L285,95 L300,150 L292,190 L200,186 L170,150 Z",
  central: "M170,150 L200,186 L292,190 L300,250 L286,300 L215,300 L175,250 Z",
  southwest: "M175,250 L215,300 L225,380 L241,430 L214,441 L190,380 L168,318 Z",
  southeast: "M215,300 L286,300 L296,360 L270,420 L241,430 L225,380 Z",
};

const ORDER: Region[] = ["north", "northeast", "central", "southwest", "southeast"];

/** Rough lng/lat → SVG projection for the stylized outline. */
export const project = ([lng, lat]: [number, number]) => ({
  x: ((lng + 87.6) / 7.6) * 285 + 15,
  y: ((31 - lat) / 6) * 360 + 70,
});

interface Props {
  active: Candidate;
}

export const FloridaMap = ({ active }: Props) => {
  const reduce = useReducedMotion();
  const marker = project(active.center);
  const idx = ORDER.indexOf(active.region);

  const tilt = reduce ? 0 : 16 - idx * 4;
  const spin = reduce ? 0 : (idx - 2) * 7;
  const scale = reduce ? 1 : 1.18;

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
          scale,
          x: reduce ? 0 : (155 - marker.x) * 0.45,
          y: reduce ? 0 : (250 - marker.y) * 0.45,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.9 }}
      >
        <svg
          viewBox="0 0 320 470"
          className="w-full h-full drop-shadow-[0_25px_45px_hsl(var(--gold)/0.15)]"
        >
          <defs>
            <filter id="fl-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {ORDER.map((r) => {
            const isActive = r === active.region;
            return (
              <motion.path
                key={r}
                d={REGION_PATHS[r]}
                initial={false}
                animate={{
                  fill: isActive ? "hsl(var(--gold))" : "hsl(var(--muted))",
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{ duration: 0.5 }}
                stroke="hsl(var(--background))"
                strokeWidth={2}
                filter={isActive ? "url(#fl-glow)" : undefined}
              />
            );
          })}

          <motion.g
            initial={false}
            animate={{ x: marker.x, y: marker.y }}
            transition={{ type: "spring", stiffness: 70, damping: 16 }}
          >
            <motion.circle
              fill="hsl(var(--crimson))"
              initial={{ r: 12, opacity: 0.4 }}
              animate={reduce ? { r: 12, opacity: 0.4 } : { r: [12, 24, 12], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />

            <circle r={6} fill="hsl(var(--crimson))" stroke="hsl(var(--foreground))" strokeWidth={2} />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
};

export default FloridaMap;
