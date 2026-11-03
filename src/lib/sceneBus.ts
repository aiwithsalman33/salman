import type { CategoryId } from "@/data/work";

/**
 * Mutable state shared between DOM components and the 3D scene. Read inside useFrame,
 * so updates never cause React re-renders.
 */
export const sceneState = {
  /**
   * Smoothed scroll position in section units: 0 = intro, sections.length − 1 = start of contact.
   * Runs on to sections.length through the contact section itself, so the finale can fade out.
   */
  t: 0,
  /** Selected project index in each work category's showcase. */
  highlight: { automation: 0, products: 0, solutions: 0, studio: 0 } as Record<CategoryId, number>,
  /** Index of the open skill group. */
  activeSkill: 0,
  /** Smoothed pointer position, −1…1 on each axis (0,0 = centre or no pointer). */
  pointer: { x: 0, y: 0 },
};
