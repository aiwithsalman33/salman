"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Vector3, type Group, type LineBasicMaterial, type LineSegments, type PointsMaterial } from "three";
import { sceneState } from "@/lib/sceneBus";
import { anchors, palette, seededRandom, smoothstep } from "../trajectory";

// Five clusters, one per skill group, pushed to the edges of the frame (partly off-screen) to stay clear of the text.
const clusterOffsets = [
  [-9, 3.8],
  [9, 4],
  [-9.2, -3.6],
  [9.3, -3.8],
  [10.5, 0],
] as const;
const POINTS_PER_CLUSTER = 11;

/** Skill clusters whose links draw themselves in as the Skills section arrives. */
export function SkillNetwork({ dim }: { dim: number }) {
  const group = useRef<Group>(null);
  const links = useRef<LineSegments>(null);
  const pointMaterial = useRef<PointsMaterial>(null);
  const lineMaterial = useRef<LineBasicMaterial>(null);

  const { pointGeometry, lineGeometry, lineVertexCount } = useMemo(() => {
    const rand = seededRandom(23);
    const points: Vector3[] = [];
    const lines: Vector3[] = [];

    for (const [cx, cy] of clusterOffsets) {
      const cluster = Array.from(
        { length: POINTS_PER_CLUSTER },
        () =>
          new Vector3(
            anchors.network.x + cx + (rand() - 0.5) * 3.4,
            anchors.network.y + cy + (rand() - 0.5) * 2.6,
            anchors.network.z + (rand() - 0.5) * 2,
          ),
      );
      points.push(...cluster);
      // Link each point to its two nearest neighbours in the same cluster.
      cluster.forEach((p, i) => {
        cluster
          .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
          .filter(({ j }) => j > i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2)
          .forEach(({ j }) => lines.push(p, cluster[j]));
      });
    }

    return {
      pointGeometry: new BufferGeometry().setFromPoints(points),
      lineGeometry: new BufferGeometry().setFromPoints(lines),
      lineVertexCount: lines.length,
    };
  }, []);

  useEffect(
    () => () => {
      pointGeometry.dispose();
      lineGeometry.dispose();
    },
    [pointGeometry, lineGeometry],
  );

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = sceneState.t;
    const fade = smoothstep(4.4, 5, t) * (1 - smoothstep(5.9, 6.5, t));
    g.visible = fade > 0.001;
    if (!g.visible) return;

    if (pointMaterial.current) pointMaterial.current.opacity = 0.5 * fade * dim;
    if (lineMaterial.current) lineMaterial.current.opacity = 0.16 * fade * dim;
    // Links draw in, a vertex pair at a time, as the section arrives.
    const drawn = Math.floor((smoothstep(4.55, 5.1, t) * lineVertexCount) / 2) * 2;
    links.current?.geometry.setDrawRange(0, drawn);
    g.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
  });

  return (
    <group ref={group}>
      <points geometry={pointGeometry}>
        <pointsMaterial ref={pointMaterial} color={palette.signal} size={0.12} sizeAttenuation transparent depthWrite={false} />
      </points>
      <lineSegments ref={links} geometry={lineGeometry}>
        <lineBasicMaterial ref={lineMaterial} color={palette.steel} transparent />
      </lineSegments>
    </group>
  );
}
