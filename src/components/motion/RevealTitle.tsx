"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

type RevealTitleProps = { id: string; className?: string; children: ReactNode };

/**
 * Section headline with a single line-mask reveal the first time it scrolls into view.
 * Server-rendered as a plain <h2>; without JS or with reduced motion it simply stays put.
 */
export function RevealTitle({ id, className, children }: RevealTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const heading = ref.current;
      if (!heading) return;

      gsap.matchMedia().add(MOTION_OK, () => {
        const split = SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.08,
              scrollTrigger: { trigger: heading, start: "top 85%", once: true },
            }),
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <h2 ref={ref} id={id} className={className}>
      {children}
    </h2>
  );
}
