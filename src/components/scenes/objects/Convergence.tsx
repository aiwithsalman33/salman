"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Vector3, type Group, type PointsMaterial } from "three";
import { sceneState } from "@/lib/sceneBus";
import { anchors, palette, smoothstep } from "../trajectory";

const COUNT = 140;

/** The finale: a shell of points around the beacon contracts to a single point, then the core reappears there. */
export function Convergence({ dim }: { dim: number }) {
  const group = useRef<Group>(null);
  const material = useRef<PointsMaterial>(null);

  // Even spread on a unit sphere (Fibonacci lattice); the group's scale sets the radius.
  const geometry = useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points = Array.from({ length: COUNT }, (_, i) => {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      return new Vector3(Math.cos(golden * i) * r, y, Math.sin(golden * i) * r);
    });
    return new BufferGeometry().setFromPoints(points);
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const t = sceneState.t;
    const gather = smoothstep(6.6, 7.8, t);
    const opacity = smoothstep(6.3, 6.9, t) * (1 - smoothstep(7.7, 8, t));
    g.visible = opacity > 0.001;
    if (!g.visible) return;
    g.scale.setScalar(Math.max(0.05, 9 * (1 - gather)));
    g.rotation.y += delta * 0.25;
    if (material.current) material.current.opacity = opacity * dim;
  });

  return (
    <group ref={group} position={anchors.beacon}>
      <points geometry={geometry}>
        <pointsMaterial ref={material} color={palette.signal} size={0.09} sizeAttenuation transparent depthWrite={false} />
      </points>
    </group>
  );
}
