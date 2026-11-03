"use client";

import { useEffect, useMemo } from "react";
import { BufferAttribute, BufferGeometry, Color } from "three";
import { palette, seededRandom } from "../trajectory";
import { getGlowTexture } from "./glowTexture";

/** Static points along the whole flight path; the camera's travel gives the parallax. */
export function Starfield({ count }: { count: number }) {
  const geometry = useMemo(() => {
    const rand = seededRandom(7);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const steel = new Color(palette.steel);
    const depth = new Color(palette.depth);
    const c = new Color();

    for (let i = 0; i < count; i++) {
      let x = (rand() - 0.5) * 50;
      const y = (rand() - 0.5) * 30;
      const z = 15 - rand() * 205;
      // Keep a clear corridor around the camera path so no point passes right in front of the lens.
      if (Math.abs(x) < 5.5 && Math.abs(y) < 3.5) x += x < 0 ? -5.5 : 5.5;
      positions.set([x, y, z], i * 3);
      c.copy(rand() < 0.25 ? depth : steel).multiplyScalar(0.4 + rand() * 0.6);
      colors.set([c.r, c.g, c.b], i * 3);
    }

    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(positions, 3));
    g.setAttribute("color", new BufferAttribute(colors, 3));
    return g;
  }, [count]);
  const sprite = useMemo(() => getGlowTexture(), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points geometry={geometry}>
      {/* The glow texture turns square points into soft round ones. */}
      <pointsMaterial map={sprite} size={0.17} sizeAttenuation vertexColors transparent opacity={0.9} depthWrite={false} />
    </points>
  );
}
