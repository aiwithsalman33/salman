import { CatmullRomCurve3, Vector3 } from "three";
import { sectionIndex, sections, type SectionId } from "@/data/site";
import type { CategoryId } from "@/data/work";

/** Scene palette: mirrors the tokens in src/styles/tokens.css. */
export const palette = {
  signal: "#5ce1e6",
  go: "#c7f36b",
  steel: "#9aa5b1",
  fg: "#f3f5f7",
  depth: "#9a82ff",
} as const;

/** Section positions in scroll units (t), so scene timing follows the section order automatically. */
export const at = Object.fromEntries(sections.map(({ id }) => [id, sectionIndex(id)])) as Record<SectionId, number>;

export const lastSectionIndex = sections.length - 1;

/** World anchors along the flight path (the camera travels toward −z). */
export const anchors = {
  core: new Vector3(0, 0, 0),
  // Each work environment is framed in the right-hand part of the screen beside its section's text.
  environments: {
    // Raised so they sit beside the category header, above the project preview panel.
    automation: new Vector3(6.4, 0.9, -40),
    products: new Vector3(6.4, 0.9, -60),
    solutions: new Vector3(6.4, 0.9, -80),
    studio: new Vector3(6.4, 0.9, -100),
  } satisfies Record<CategoryId, Vector3>,
  network: new Vector3(0, 0, -122),
  // A short vertical column at the right edge, mirroring the timeline (oldest at the top).
  journey: [new Vector3(9.4, 2.2, -142), new Vector3(9.4, 0.2, -144), new Vector3(9.4, -1.8, -146)],
  beacon: new Vector3(0, 0.6, -176),
} as const;

/** Automation Lab layout (local): a trigger fans out to one node per project, which feed an output. */
export const automationLayout = {
  trigger: new Vector3(-2.4, 0, 0),
  output: new Vector3(2.4, 0, 0),
  nodes: [1.8, 0.9, 0, -0.9, -1.8].map((y) => new Vector3(0, y, 0)),
};

/** Business Solutions Hub layout (local): one hub, one node per delivered solution. */
export const solutionsLayout = [
  new Vector3(-2.3, 1.5, 0),
  new Vector3(2.3, 1.5, 0),
  new Vector3(-2.3, -1.5, 0),
  new Vector3(2.3, -1.5, 0),
];

type Vec = readonly [number, number, number];

/** One camera keyframe per section, in `sections` order. `look` is the point the camera aims at. */
const keyframes: Record<SectionId, { pos: Vec; look: Vec }> = {
  top: { pos: [-3.2, 0, 9], look: [-3.2, 0, 0] }, // core sits right of the headline
  about: { pos: [1.4, 0.3, -1.5], look: [1.6, 0.2, -12] }, // flown through the orbit rings
  work: { pos: [0.4, 0, -14], look: [0.6, 0, -26] },
  automation: { pos: [0, 0, -28], look: [2.4, 0, -40] },
  products: { pos: [0, 0.2, -48], look: [2.4, 0, -60] },
  solutions: { pos: [0, -0.2, -68], look: [2.4, 0, -80] },
  studio: { pos: [0, 0.2, -88], look: [2.4, 0, -100] },
  skills: { pos: [0, 0, -110], look: [0, 0, -122] },
  journey: { pos: [1.2, 0.4, -128], look: [1.2, 0.2, -144] },
  creator: { pos: [-1, 0.4, -150], look: [-2, 0, -162] },
  milestones: { pos: [0, -0.3, -156], look: [0, -0.4, -176] },
  // The core returns at the beacon, sitting above centre behind the closing line.
  contact: { pos: [0, -0.7, -168], look: [0, -0.7, -176] },
};

/**
 * Camera position and aim curves. `lateral` scales sideways offsets: portrait screens use a
 * smaller value so objects framed beside the text on desktop sit closer to centre on a phone.
 */
export function buildCurves(lateral: number) {
  const toVector = ([x, y, z]: Vec) => new Vector3(x * lateral, y, z);
  // getPoint(i / (n − 1)) lands exactly on keyframe i, so scroll position maps to sections directly.
  return {
    pos: new CatmullRomCurve3(sections.map(({ id }) => toVector(keyframes[id].pos)), false, "centripetal"),
    look: new CatmullRomCurve3(sections.map(({ id }) => toVector(keyframes[id].look)), false, "centripetal"),
  };
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** 0→1 as section `index` arrives, 1→0 as the camera leaves for the next one. */
export function presence(t: number, index: number) {
  return smoothstep(index - 1.1, index - 0.2, t) * (1 - smoothstep(index + 0.5, index + 0.9, t));
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
