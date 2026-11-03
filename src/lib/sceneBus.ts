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
  /** Index into `projects` of the hovered or focused project, or −1. */
  highlightedProject: -1,
  /** Smoothed pointer position, −1…1 on each axis (0,0 = centre or no pointer). */
  pointer: { x: 0, y: 0 },
};
