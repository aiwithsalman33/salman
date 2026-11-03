"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  type Group,
  type LineBasicMaterial,
  type Mesh,
  type MeshBasicMaterial,
  type Sprite,
} from "three";
import { sceneState } from "@/lib/sceneBus";
import { anchors, palette, smoothstep } from "../trajectory";
import { getGlowTexture } from "./glowTexture";

const steel = new Color(palette.steel);
const lit = [new Color(palette.fg), new Color(palette.fg), new Color(palette.signal)]; // the current role burns cyan

/** Three career stations along a path, lighting up in order as the Journey section scrolls by. */
export function JourneyStations({ dim }: { dim: number }) {
  const group = useRef<Group>(null);
  const meshes = useRef<(Mesh | null)[]>([]);
  const glows = useRef<(Sprite | null)[]>([]);
  const lineMaterial = useRef<LineBasicMaterial>(null);

  const lineGeometry = useMemo(() => {
    const [a, b, c] = anchors.journey;
    return new BufferGeometry().setFromPoints([a, b, b, c]);
  }, []);
  const glowTexture = useMemo(() => getGlowTexture(), []);

  useEffect(() => () => lineGeometry.dispose(), [lineGeometry]);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const t = sceneState.t;
    const fade = smoothstep(3.2, 3.8, t) * (1 - smoothstep(5, 5.6, t));
    g.visible = fade > 0.001;
    if (!g.visible) return;

    if (lineMaterial.current) lineMaterial.current.opacity = 0.3 * fade * dim;
    anchors.journey.forEach((_, i) => {
      const on = smoothstep(3.55 + i * 0.35, 3.85 + i * 0.35, t);
      const mesh = meshes.current[i];
      if (mesh) {
        const material = mesh.material as MeshBasicMaterial;
        material.color.lerpColors(steel, lit[i], on);
        material.opacity = fade * dim * (0.5 + 0.5 * on);
        mesh.scale.setScalar(1 + on * 0.6);
      }
      const glow = glows.current[i];
      if (glow) glow.material.opacity = on * fade * dim * (i === 2 ? 0.6 : 0.3);
    });
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial ref={lineMaterial} color={palette.steel} transparent />
      </lineSegments>
      {anchors.journey.map((p, i) => (
        <group key={i} position={p}>
          <mesh
            ref={(el) => {
              meshes.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.11, 20, 20]} />
            <meshBasicMaterial color={palette.steel} transparent />
          </mesh>
          <sprite
            scale={[1.3, 1.3, 1]}
            ref={(el) => {
              glows.current[i] = el;
            }}
          >
            <spriteMaterial map={glowTexture} color={i === 2 ? palette.signal : palette.fg} transparent opacity={0} depthWrite={false} blending={AdditiveBlending} />
          </sprite>
        </group>
      ))}
    </group>
  );
}
