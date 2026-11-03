"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  MathUtils,
  type Group,
  type LineBasicMaterial,
  type Mesh,
  type MeshBasicMaterial,
  type Sprite,
} from "three";
import { sceneState } from "@/lib/sceneBus";
import { galaxyLinks, galaxyNodes, palette, smoothstep } from "../trajectory";
import { getGlowTexture } from "./glowTexture";

const steel = new Color(palette.steel);
const signal = new Color(palette.signal);

/** Project constellation, framed during the Work section. The hovered or focused project's node lights up. */
export function Galaxy({ dim }: { dim: number }) {
  const group = useRef<Group>(null);
  const meshes = useRef<(Mesh | null)[]>([]);
  const lineMaterial = useRef<LineBasicMaterial>(null);
  const glow = useRef<Sprite>(null);
  const lit = useRef(galaxyNodes.map(() => 0));

  const lineGeometry = useMemo(
    () => new BufferGeometry().setFromPoints(galaxyLinks.flatMap(([a, b]) => [galaxyNodes[a], galaxyNodes[b]])),
    [],
  );
  const glowTexture = useMemo(() => getGlowTexture(), []);

  useEffect(() => () => lineGeometry.dispose(), [lineGeometry]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const t = sceneState.t;
    const fade = smoothstep(1.8, 2.8, t) * (1 - smoothstep(4, 4.8, t));
    g.visible = fade > 0.001;
    if (!g.visible) return;

    const active = sceneState.highlightedProject;
    galaxyNodes.forEach((_, i) => {
      lit.current[i] = MathUtils.damp(lit.current[i], i === active ? 1 : 0, 6, delta);
      const mesh = meshes.current[i];
      if (!mesh) return;
      const material = mesh.material as MeshBasicMaterial;
      material.color.lerpColors(steel, signal, lit.current[i]);
      material.opacity = fade * dim * (0.6 + 0.4 * lit.current[i]);
      mesh.scale.setScalar(1 + lit.current[i] * 1.2);
    });
    if (lineMaterial.current) lineMaterial.current.opacity = 0.28 * fade * dim;

    if (glow.current) {
      const target = active >= 0 ? galaxyNodes[active] : null;
      if (target) glow.current.position.copy(target);
      const mat = glow.current.material;
      mat.opacity = MathUtils.damp(mat.opacity, target ? 0.55 * fade * dim : 0, 6, delta);
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial ref={lineMaterial} color={palette.steel} transparent />
      </lineSegments>
      {galaxyNodes.map((p, i) => (
        <mesh
          key={i}
          position={p}
          ref={(el) => {
            meshes.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color={palette.steel} transparent />
        </mesh>
      ))}
      <sprite ref={glow} scale={[1.6, 1.6, 1]}>
        <spriteMaterial map={glowTexture} color={palette.signal} transparent opacity={0} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
    </group>
  );
}
