"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { REDUCED_MOTION } from "@/lib/gsap";
import type { SceneTier } from "./MissionControlScene";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

const MissionControlScene = dynamic(() => import("./MissionControlScene"), { ssr: false });

type NavigatorHints = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

/**
 * full: desktop-class device with a fine pointer. lite: other WebGL devices (fewer points, lower resolution).
 * null: reduced motion, data saver, low memory or no WebGL, so the static SVG drawings stay.
 */
function detectTier(): SceneTier | null {
  if (window.matchMedia(REDUCED_MOTION).matches) return null;
  const nav = navigator as NavigatorHints;
  if (nav.connection?.saveData) return null;
  if ((nav.deviceMemory ?? 8) <= 2) return null;

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return null;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    return null;
  }

  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine && window.innerWidth >= 1024 && (navigator.hardwareConcurrency ?? 4) >= 4) return "full";
  return "lite";
}

/**
 * Loads the 3D scene after the boot moment, once the browser is idle. Until its first frame renders
 * (and forever, if it can't), the static SVG drawings in the page are what visitors see.
 */
export function SceneLoader() {
  const [tier, setTier] = useState<SceneTier | null>(null);

  const fallBack = useCallback(() => {
    setTier(null);
    delete document.documentElement.dataset.scene;
  }, []);

  useEffect(() => {
    const detected = detectTier();
    if (!detected) return;

    // First visits wait for the boot sequence (~1.7s); repeat visits start almost immediately.
    const delay = document.documentElement.dataset.boot ? 300 : 1800;
    const hasIdle = "requestIdleCallback" in window;
    const start = () => setTier(detected);
    let idle = 0;
    const timer = window.setTimeout(() => {
      if (hasIdle) idle = window.requestIdleCallback(start, { timeout: 1500 });
      else start();
    }, delay);

    const motionQuery = window.matchMedia(REDUCED_MOTION);
    const onMotionChange = () => motionQuery.matches && fallBack();
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      window.clearTimeout(timer);
      if (hasIdle && idle) window.cancelIdleCallback(idle);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [fallBack]);

  if (!tier) return null;

  return (
    <div className="scene-canvas" aria-hidden="true">
      <SceneErrorBoundary onError={fallBack}>
        <MissionControlScene
          tier={tier}
          onReady={() => {
            document.documentElement.dataset.scene = "3d";
          }}
          onLost={fallBack}
        />
      </SceneErrorBoundary>
    </div>
  );
}
