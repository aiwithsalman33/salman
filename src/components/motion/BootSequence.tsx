"use client";

import { useEffect } from "react";

const lines = ["INITIALIZING SALMAN.OS", "LOADING CREATIVE SYSTEMS", "AI ENGINEER / AUTOMATION BUILDER"];

function skip() {
  document.documentElement.dataset.boot = "skipped";
}

/**
 * The page-load moment. Timing lives in CSS, so it plays (and ends on its own) before hydration
 * and without JavaScript. Hidden entirely under prefers-reduced-motion and on repeat visits.
 */
export function BootSequence() {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey, { once: true });
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="boot" aria-hidden="true">
        <div className="shell telemetry flex flex-col gap-2 pb-20 text-meta">
          {lines.map((line) => (
            <p key={line} className="boot-line text-steel">
              {line}
            </p>
          ))}
          <p className="boot-line text-go">SYSTEM ONLINE</p>
        </div>
      </div>
      <button type="button" onClick={skip} className="boot-skip telemetry">
        Skip intro
      </button>
    </>
  );
}
