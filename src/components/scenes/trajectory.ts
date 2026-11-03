import { CatmullRomCurve3, Vector3 } from "three";
import { sections, type SectionId } from "@/data/site";

/** Scene palette: mirrors the tokens in src/styles/tokens.css. */
export const palette = {
  signal: "#5ce1e6",
  go: "#c7f36b",
  steel: "#9aa5b1",
  fg: "#f3f5f7",
  depth: "#9a82ff",
} as const;

/** World anchors along the flight path (the camera travels toward −z). */
export const anchors = {
  core: new Vector3(0, 0, 0),
  // Framed in the empty right-hand column beside the project list.
  galaxy: new Vector3(6.4, 0, -40),
  // A short vertical column at the right edge, mirroring the timeline (oldest at the top).
  journey: [new Vector3(9.4, 2.2, -64), new Vector3(9.4, 0.2, -66), new Vector3(9.4, -1.8, -68)],
  network: new Vector3(0, 0, -92),
  beacon: new Vector3(0, 0.6, -118),
} as const;

/** Project nodes: the 2D constellation layout (600×520) mapped into world space around the galaxy anchor. */
const galaxyLayout = [
  [150, 120],
  [330, 80],
  [470, 190],
  [400, 330],
  [210, 300],
  [90, 430],
  [510, 440],
] as const;

export const galaxyNodes = galaxyLayout.map(
  ([x, y], i) => new Vector3((x - 300) / 90, -(y - 260) / 90, ((i % 3) - 1) * 0.6).add(anchors.galaxy),
);

export const galaxyLinks: readonly [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0],
  [4, 5],
  [3, 6],
  [1, 3],
];

type Vec = readonly [number, number, number];

/** One camera keyframe per section, in `sections` order. `look` is the point the camera aims at. */
const keyframes: Record<SectionId, { pos: Vec; look: Vec }> = {
  top: { pos: [-3.2, 0, 9], look: [-3.2, 0, 0] }, // core sits right of the headline
  about: { pos: [1.4, 0.3, -1.5], look: [1.6, 0.2, -12] }, // flown through the orbit rings
  capabilities: { pos: [0.4, 0, -14], look: [0.6, 0, -26] },
  work: { pos: [0, 0, -28], look: [2.4, 0, -40] }, // galaxy framed in the right half
  journey: { pos: [1.2, 0.4, -50], look: [1.2, 0.2, -66] },
  skills: { pos: [0, 0, -80], look: [0, 0, -92] },
  creator: { pos: [-1, 0.4, -96], look: [-2, 0, -108] },
  milestones: { pos: [0, -0.3, -100], look: [0, -0.4, -118] },
  // The core returns at the beacon, sitting above centre behind the closing line.
  contact: { pos: [0, -0.7, -110], look: [0, -0.7, -118] },
};

/**
 * Camera position and aim curves. `lateral` scales sideways offsets: portrait screens use a
 * smaller value so objects framed beside the text on desktop sit closer to centre on a phone.
 */
export function buildCurves(lateral: number) {
  const pos = sections.map(({ id }) => {
    const [x, y, z] = keyframes[id].pos;
    return new Vector3(x * lateral, y, z);
  });
  const look = sections.map(({ id }) => {
    const [x, y, z] = keyframes[id].look;
    return new Vector3(x * lateral, y, z);
  });
  // getPoint(i / (n − 1)) lands exactly on keyframe i, so scroll position maps to sections directly.
  return {
    pos: new CatmullRomCurve3(pos, false, "centripetal"),
    look: new CatmullRomCurve3(look, false, "centripetal"),
  };
}

export const lastSectionIndex = sections.length - 1;

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** Deterministic random numbers so the scene looks the same on every load. */
export function seededRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
