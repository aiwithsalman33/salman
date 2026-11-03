"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";
import { ScrollTrigger } from "@/lib/gsap";
import { sceneState } from "@/lib/sceneBus";
import { sectionIds } from "@/data/site";
import { anchors, at, automationLayout, buildCurves, lastSectionIndex, smoothstep, solutionsLayout } from "./trajectory";
import { Core } from "./objects/Core";
import { Starfield } from "./objects/Starfield";
import { WorkEnvironments } from "./objects/WorkEnvironments";
import { JourneyStations } from "./objects/JourneyStations";
import { SkillNetwork } from "./objects/SkillNetwork";
import { Convergence } from "./objects/Convergence";

export type SceneTier = "full" | "lite";

/** Environments with fixed, per-project nodes the camera can lean toward. */
const aimTargets = [
  ["automation", automationLayout.nodes],
  ["solutions", solutionsLayout],
] as const;

type MissionControlSceneProps = {
  tier: SceneTier;
  onReady: () => void;
  onLost: () => void;
};

/** The single 3D canvas behind the page. Loaded lazily by SceneLoader, never server-rendered. */
export default function MissionControlScene({ tier, onReady, onLost }: MissionControlSceneProps) {
  const [dpr, setDpr] = useState<number | [number, number]>(tier === "full" ? [1, 1.75] : [1, 1.25]);

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: tier === "full", alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 45, near: 0.1, far: 240, position: [-3.2, 0, 9] }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.domElement.addEventListener(
          "webglcontextlost",
          (event) => {
            event.preventDefault();
            onLost();
          },
          { once: true },
        );
      }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <FirstFrame onReady={onReady} />
      <CameraRig />
      <SceneContents tier={tier} />
    </Canvas>
  );
}

function SceneContents({ tier }: { tier: SceneTier }) {
  // Portrait screens put text over the scene, so everything renders dimmer there.
  const portrait = useThree((s) => s.size.width < s.size.height);
  const dim = portrait ? 0.5 : 1;

  return (
    <>
      <Starfield count={tier === "full" ? 2400 : 800} />
      <Core dim={dim} />
      <WorkEnvironments dim={portrait ? 0.45 : 1} />
      <JourneyStations dim={dim} />
      <SkillNetwork dim={dim} />
      <Convergence dim={dim} />
    </>
  );
}

function FirstFrame({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    onReady();
  });
  return null;
}

/**
 * Maps native scroll to a position along the flight path. Each section holds the camera on its
 * keyframe for the first 55% of its scroll, then travels to the next one; scrolling up reverses it.
 */
function CameraRig() {
  const aspect = useThree((s) => s.size.width / s.size.height);
  const curves = useMemo(() => buildCurves(aspect < 1 ? 0.35 : 1), [aspect]);
  const triggers = useRef<ScrollTrigger[]>([]);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const smoothedT = useRef<number | null>(null);
  // Scratch vectors, reused every frame.
  const vectors = useRef({ look: new Vector3(), offset: new Vector3(), target: new Vector3() });

  useEffect(() => {
    triggers.current = sectionIds.map((id) =>
      ScrollTrigger.create({ trigger: `#${id}`, start: "top center", end: "bottom center" }),
    );

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onMove = (event: PointerEvent) => {
      pointerTarget.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      triggers.current.forEach((trigger) => trigger.kill());
      triggers.current = [];
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useFrame((state, delta) => {
    const { camera } = state;
    const { look, offset, target: aimShift } = vectors.current;
    // Scroll → section units: the last section whose range has started, plus eased progress through it.
    // Contact (the last section) has no next keyframe, so its raw progress carries t past the end for the finale.
    let target = 0;
    for (let i = triggers.current.length - 1; i >= 0; i--) {
      const progress = triggers.current[i].progress;
      if (progress > 0 || i === 0) {
        target = i === lastSectionIndex ? i + progress : i + smoothstep(0.55, 1, progress);
        break;
      }
    }
    smoothedT.current = smoothedT.current === null ? target : MathUtils.damp(smoothedT.current, target, 3.2, delta);
    const t = smoothedT.current;
    sceneState.t = t;

    const pointer = sceneState.pointer;
    pointer.x = MathUtils.damp(pointer.x, pointerTarget.current.x, 2.5, delta);
    pointer.y = MathUtils.damp(pointer.y, pointerTarget.current.y, 2.5, delta);

    const u = Math.min(t, lastSectionIndex) / lastSectionIndex;
    curves.pos.getPoint(u, camera.position);
    curves.look.getPoint(u, look);

    // In the Automation Lab and Solutions Hub, ease the aim slightly toward the selected project's node.
    aimShift.set(0, 0, 0);
    for (const [id, nodes] of aimTargets) {
      const weight = smoothstep(at[id] - 0.5, at[id], t) * (1 - smoothstep(at[id] + 0.4, at[id] + 0.8, t));
      if (weight <= 0) continue;
      const node = nodes[sceneState.highlight[id]];
      if (node) aimShift.copy(node).add(anchors.environments[id]).sub(look).multiplyScalar(0.2 * weight);
    }
    offset.lerp(aimShift, 1 - Math.exp(-3 * delta));
    look.add(offset);

    camera.position.x += pointer.x * 0.35;
    camera.position.y += pointer.y * 0.2;
    camera.lookAt(look);
  });

  return null;
}
