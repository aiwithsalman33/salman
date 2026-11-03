"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, MathUtils, Vector3, type Group, type LineBasicMaterial, type LineSegments, type PointsMaterial } from "three";
import { sceneState } from "@/lib/sceneBus";
import { anchors, at, palette, seededRandom, smoothstep } from "../trajectory";

// Six clusters, one per skill group, pushed to the edges of the frame (partly off-screen) to stay clear of the text.
const clusterOffsets = [
  [-9, 3.8],
  [9, 4],
  [-9.2, -3.6],
  [9.3, -3.8],
  [10.5, 0],
  [-10.5, 0],
] as const;
const POINTS_PER_CLUSTER = 11;

type Cluster = { points: BufferGeometry; lines: BufferGeometry; lineVertexCount: number };

/** Skill clusters whose links draw in as the Skills section arrives. The open skill group's cluster brightens. */
export function SkillNetwork({ dim }: { dim: number }) {
  const group = useRef<Group>(null);
  const links = useRef<(LineSegments | null)[]>([]);
  const pointMaterials = useRef<(PointsMaterial | null)[]>([]);
  const lineMaterials = useRef<(LineBasicMaterial | null)[]>([]);
  const lit = useRef(clusterOffsets.map(() => 0));

  const clusters = useMemo<Cluster[]>(() => {
    const rand = seededRandom(23);
    return clusterOffsets.map(([cx, cy]) => {
      const pts = Array.from(
        { length: POINTS_PER_CLUSTER },
        () =>
          new Vector3(
            anchors.network.x + cx + (rand() - 0.5) * 3.4,
            anchors.network.y + cy + (rand() - 0.5) * 2.6,
            anchors.network.z + (rand() - 0.5) * 2,
          ),
      );
      // Link each point to its two nearest neighbours in the same cluster.
      const lines: Vector3[] = [];
      pts.forEach((p, i) => {
        pts
          .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
          .filter(({ j }) => j > i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2)
          .forEach(({ j }) => lines.push(p, pts[j]));
      });
      return {
        points: new BufferGeometry().setFromPoints(pts),
        lines: new BufferGeometry().setFromPoints(lines),
        lineVertexCount: lines.length,
      };
    });
  }, []);

  useEffect(
    () => () =>
      clusters.forEach((c) => {
        c.points.dispose();
        c.lines.dispose();
      }),
    [clusters],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = sceneState.t;
    const fade = smoothstep(at.skills - 0.6, at.skills, t) * (1 - smoothstep(at.skills + 0.9, at.skills + 1.5, t));
    g.visible = fade > 0.001;
    if (!g.visible) return;

    // Links draw in, a vertex pair at a time, as the section arrives.
    const draw = smoothstep(at.skills - 0.45, at.skills + 0.1, t);
    clusters.forEach((cluster, i) => {
      lit.current[i] = MathUtils.damp(lit.current[i], i === sceneState.activeSkill ? 1 : 0, 5, delta);
      const pm = pointMaterials.current[i];
      const lm = lineMaterials.current[i];
      if (pm) pm.opacity = (0.4 + 0.5 * lit.current[i]) * fade * dim;
      if (lm) lm.opacity = (0.12 + 0.3 * lit.current[i]) * fade * dim;
      links.current[i]?.geometry.setDrawRange(0, Math.floor((draw * cluster.lineVertexCount) / 2) * 2);
    });
    g.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
  });

  return (
    <group ref={group}>
      {clusters.map((cluster, i) => (
        <group key={i}>
          <points geometry={cluster.points}>
            <pointsMaterial
              ref={(el) => {
                pointMaterials.current[i] = el;
              }}
              color={palette.signal}
              size={0.12}
              sizeAttenuation
              transparent
              depthWrite={false}
            />
          </points>
          <lineSegments
            geometry={cluster.lines}
            ref={(el) => {
              links.current[i] = el;
            }}
          >
            <lineBasicMaterial
              ref={(el) => {
                lineMaterials.current[i] = el;
              }}
              color={palette.signal}
              transparent
            />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}
