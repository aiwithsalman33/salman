import type { ReactNode } from "react";
import { RevealTitle } from "@/components/motion/RevealTitle";

type SectionHeadingProps = {
  id: string;
  children: ReactNode;
  intro?: ReactNode;
  className?: string;
};

export function SectionHeading({ id, children, intro, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <RevealTitle id={id} className="display max-w-[20ch] text-h2">
        {children}
      </RevealTitle>
      {intro && <p className="mt-6 max-w-[58ch] text-lead text-steel">{intro}</p>}
    </div>
  );
}
