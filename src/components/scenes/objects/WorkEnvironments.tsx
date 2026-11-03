"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  Color,
  EdgesGeometry,
  IcosahedronGeometry,
  MathUtils,
  Object3D,
  Vector3,
  type Group,
  type InstancedMesh,
  type LineBasicMaterial,
  type Mesh,
  type MeshBasicMaterial,
} from "three";
import { sceneState } from "@/lib/sceneBus";
import { anchors, at, automationLayout, palette, presence, solutionsLayout } from "../trajectory";

const steel = new Color(palette.steel);

/** The four work environments, each framed while its category section is on screen. */
export function WorkEnvironments({ dim }: { dim: number }) {
  return (
    <>
      <AutomationLab dim={dim} />
      <ProductUniverse dim={dim} />
      <SolutionsHub dim={dim} />
      <CreatorStudio dim={dim} />
    </>
  );
}

function useLines(points: readonly Vector3[]) {
  const geometry = useMemo(() => new BufferGeometry().setFromPoints([...points]), [points]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

function material(mesh: Mesh | null | undefined) {
  return mesh?.material as MeshBasicMaterial | undefined;
}

/** Lerp a node's colour and size toward lit (1) or idle (0). */
function setLit(mesh: Mesh | null | undefined, lit: number, accent: Color, opacity: number, grow: number) {
  const m = material(mesh);
  if (!mesh || !m) return;
  m.color.lerpColors(steel, accent, lit);
  m.opacity = opacity * (0.55 + 0.45 * lit);
  mesh.scale.setScalar(1 + lit * grow);
}

// ---------- 01 Automation Lab: an n8n-style workflow with data pulses ----------

const automationLinks = automationLayout.nodes.flatMap((n) => [automationLayout.trigger, n, n, automationLayout.output]);
const signal = new Color(palette.signal);

function AutomationLab({ dim }: { dim: number }) {
  const group = useRef<Group>(null);
  const nodes = useRef<(Mesh | null)[]>([]);
  const pulses = useRef<(Mesh | null)[]>([]);
  const ends = useRef<(Mesh | null)[]>([]);
  const lineMaterial = useRef<LineBasicMaterial>(null);
  const lit = useRef(automationLayout.nodes.map(() => 0));
  const links = useLines(automationLinks);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const fade = presence(sceneState.t, at.automation) * dim;
    g.visible = fade > 0.001;
    if (!g.visible) return;

    const active = sceneState.highlight.automation;
    const time = state.clock.elapsedTime;
    const { trigger, output } = automationLayout;

    automationLayout.nodes.forEach((node, i) => {
      lit.current[i] = MathUtils.damp(lit.current[i], i === active ? 1 : 0, 6, delta);
      // Idle nodes stay faint so the selected one reads clearly.
      setLit(nodes.current[i], lit.current[i], signal, fade * (0.55 + 0.45 * lit.current[i]), 0.25);

      // Each pulse runs trigger → its node → output.
      const pulse = pulses.current[i];
      if (pulse) {
        const p = (time * 0.35 + i * 0.2) % 1;
        if (p < 0.5) pulse.position.lerpVectors(trigger, node, p * 2);
        else pulse.position.lerpVectors(node, output, (p - 0.5) * 2);
        const m = material(pulse);
        if (m) m.opacity = fade * (i === active ? 1 : 0.4);
      }
    });
    ends.current.forEach((end) => {
      const m = material(end);
      if (m) m.opacity = fade;
    });
    if (lineMaterial.current) lineMaterial.current.opacity = 0.3 * fade;
  });

  return (
    <group ref={group} position={anchors.environments.automation}>
      <lineSegments geometry={links}>
        <lineBasicMaterial ref={lineMaterial} color={palette.steel} transparent />
      </lineSegments>
      {[automationLayout.trigger, automationLayout.output].map((p, i) => (
        <mesh
          key={i}
          position={p}
          ref={(el) => {
            ends.current[i] = el;
          }}
        >
          <sphereGeometry args={[i === 0 ? 0.18 : 0.2, 16, 16]} />
          <meshBasicMaterial color={i === 0 ? palette.signal : palette.go} transparent />
        </mesh>
      ))}
      {automationLayout.nodes.map((p, i) => (
        <mesh
          key={i}
          position={p}
          ref={(el) => {
            nodes.current[i] = el;
          }}
        >
          <boxGeometry args={[0.72, 0.36, 0.06]} />
          <meshBasicMaterial color={palette.steel} transparent />
        </mesh>
      ))}
      {automationLayout.nodes.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            pulses.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={palette.signal} transparent />
        </mesh>
      ))}
    </group>
  );
}

// ---------- 02 Product Universe: a product world with products in orbit ----------

const depth = new Color(palette.depth);
const ORBIT_RADIUS = 2.6;

function ProductUniverse({ dim }: { dim: number }) {
  const group = useRef<Group>(null);
  const planet = useRef<Group>(null);
  const satellites = useRef<(Mesh | null)[]>([]);
  const planetMaterial = useRef<LineBasicMaterial>(null);
  const ringMaterial = useRef<LineBasicMaterial>(null);
  const lit = useRef([0, 0]);

  const planetGeometry = useMemo(() => new EdgesGeometry(new IcosahedronGeometry(1.1, 1)), []);
  const ringPoints = useMemo(
    () => Array.from({ length: 96 }, (_, i) => new Vector3(Math.cos((i / 96) * Math.PI * 2) * ORBIT_RADIUS, Math.sin((i / 96) * Math.PI * 2) * ORBIT_RADIUS, 0)),
    [],
  );
  const ring = useLines(ringPoints);
  useEffect(() => () => planetGeometry.dispose(), [planetGeometry]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const fade = presence(sceneState.t, at.products) * dim;
    g.visible = fade > 0.001;
    if (!g.visible) return;

    const active = sceneState.highlight.products;
    const time = state.clock.elapsedTime;
    if (planet.current) planet.current.rotation.y += delta * 0.12;
    if (planetMaterial.current) planetMaterial.current.opacity = 0.6 * fade;
    if (ringMaterial.current) ringMaterial.current.opacity = 0.25 * fade;

    satellites.current.forEach((sat, i) => {
      if (!sat) return;
      const a = time * 0.3 + i * Math.PI;
      sat.position.set(Math.cos(a) * ORBIT_RADIUS, Math.sin(a) * ORBIT_RADIUS, 0);
      lit.current[i] = MathUtils.damp(lit.current[i], i === active ? 1 : 0, 6, delta);
      setLit(sat, lit.current[i], depth, fade, 0.9);
    });
  });

  return (
    <group ref={group} position={anchors.environments.products}>
      <group ref={planet}>
        <lineSegments geometry={planetGeometry}>
          <lineBasicMaterial ref={planetMaterial} color={palette.depth} transparent />
        </lineSegments>
      </group>
      <group rotation={[1.2, 0.2, 0]}>
        <lineLoop geometry={ring}>
          <lineBasicMaterial ref={ringMaterial} color={palette.steel} transparent />
        </lineLoop>
        {[0, 1].map((i) => (
          <mesh
            key={i}
            ref={(el) => {
              satellites.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshBasicMaterial color={palette.steel} transparent />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ---------- 03 Business Solutions Hub: one hub serving each delivered solution ----------

const fg = new Color(palette.fg);
const hub = new Vector3(0, 0, 0);
const spokes = solutionsLayout.flatMap((n) => [hub, n]);

function SolutionsHub({ dim }: { dim: number }) {
  const group = useRef<Group>(null);
  const nodes = useRef<(Mesh | null)[]>([]);
  const pulses = useRef<(Mesh | null)[]>([]);
  const hubMesh = useRef<Mesh>(null);
  const lineMaterial = useRef<LineBasicMaterial>(null);
  const lit = useRef(solutionsLayout.map(() => 0));
  const links = useLines(spokes);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const fade = presence(sceneState.t, at.solutions) * dim;
    g.visible = fade > 0.001;
    if (!g.visible) return;

    const active = sceneState.highlight.solutions;
    const time = state.clock.elapsedTime;
    g.rotation.y = Math.sin(time * 0.2) * 0.25;
    const hubMaterial = material(hubMesh.current);
    if (hubMaterial) hubMaterial.opacity = fade;
    if (lineMaterial.current) lineMaterial.current.opacity = 0.3 * fade;

    solutionsLayout.forEach((node, i) => {
      lit.current[i] = MathUtils.damp(lit.current[i], i === active ? 1 : 0, 6, delta);
      setLit(nodes.current[i], lit.current[i], fg, fade, 0.5);
      const pulse = pulses.current[i];
      if (pulse) {
        pulse.position.lerpVectors(hub, node, (time * 0.4 + i * 0.25) % 1);
        const m = material(pulse);
        if (m) m.opacity = fade * (i === active ? 1 : 0.35);
      }
    });
  });

  return (
    <group ref={group} position={anchors.environments.solutions}>
      <lineSegments geometry={links}>
        <lineBasicMaterial ref={lineMaterial} color={palette.steel} transparent />
      </lineSegments>
      <mesh ref={hubMesh}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshBasicMaterial color={palette.fg} transparent />
      </mesh>
      {solutionsLayout.map((p, i) => (
        <mesh
          key={i}
          position={p}
          ref={(el) => {
            nodes.current[i] = el;
          }}
        >
          <octahedronGeometry args={[0.24]} />
          <meshBasicMaterial color={palette.steel} transparent />
        </mesh>
      ))}
      {solutionsLayout.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            pulses.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshBasicMaterial color={palette.fg} transparent />
        </mesh>
      ))}
    </group>
  );
}

// ---------- 04 Creator Studio: a radial level meter around a play mark ----------

const BARS = 32;
const BAR_RADIUS = 1.9;

function CreatorStudio({ dim }: { dim: number }) {
  const group = useRef<Group>(null);
  const bars = useRef<InstancedMesh>(null);
  const barMaterial = useRef<MeshBasicMaterial>(null);
  const play = useRef<Mesh>(null);
  const emphasis = useRef({ video: 1, content: 0 });
  const dummy = useMemo(() => new Object3D(), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const fade = presence(sceneState.t, at.studio) * dim;
    g.visible = fade > 0.001;
    if (!g.visible) return;

    // Project 0 (founder video) brightens the play mark; project 1 (content systems) drives the meter harder.
    const active = sceneState.highlight.studio;
    const e = emphasis.current;
    e.video = MathUtils.damp(e.video, active === 0 ? 1 : 0, 5, delta);
    e.content = MathUtils.damp(e.content, active === 1 ? 1 : 0, 5, delta);
    const time = state.clock.elapsedTime;

    const mesh = bars.current;
    if (mesh) {
      for (let i = 0; i < BARS; i++) {
        const a = (i / BARS) * Math.PI * 2;
        const level = 0.35 + 0.65 * Math.abs(Math.sin(time * (1.6 + e.content) + i * 0.55));
        dummy.position.set(Math.cos(a) * BAR_RADIUS, Math.sin(a) * BAR_RADIUS, 0);
        dummy.rotation.set(0, 0, a - Math.PI / 2);
        dummy.scale.set(1, level * (0.7 + 0.5 * e.content), 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
    if (barMaterial.current) barMaterial.current.opacity = fade * 0.85;
    const playMaterial = material(play.current);
    if (playMaterial) playMaterial.opacity = fade * (0.45 + 0.55 * e.video);
    play.current?.scale.setScalar(1 + 0.15 * e.video);
  });

  return (
    <group ref={group} position={anchors.environments.studio}>
      <instancedMesh ref={bars} args={[undefined, undefined, BARS]}>
        <boxGeometry args={[0.09, 0.9, 0.09]} />
        <meshBasicMaterial ref={barMaterial} color={palette.go} transparent />
      </instancedMesh>
      <mesh ref={play}>
        {/* A three-segment circle is a triangle pointing along +x: a play mark. */}
        <circleGeometry args={[0.55, 3]} />
        <meshBasicMaterial color={palette.go} transparent />
      </mesh>
    </group>
  );
}
