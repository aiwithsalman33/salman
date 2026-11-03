import { ButtonLink, TextLink } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SceneFallback } from "@/components/scenes/SceneFallback";

const roles = ["AI engineer", "Automation builder", "Independent creator", "Based in India"];

// Fixed line breaks: the boot animation widens the type, and fixed lines keep the layout from reflowing.
const headline = ["I build", "intelligent", "systems", "that do the", "heavy lifting."];

export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-svh items-center overflow-hidden pt-(--header-h)">
      <SceneFallback className="hero-core pointer-events-none absolute top-1/2 -right-[45%] -z-10 w-[120vw] max-w-none -translate-y-1/2 opacity-35 sm:-right-[22%] sm:w-[85vw] sm:opacity-50 lg:-right-[2%] lg:w-[min(56vw,860px)] lg:opacity-100" />

      <div className="shell py-16 sm:py-24">
        <h1 id="hero-title" className="hero-title display text-h1 uppercase">
          {headline.map((line, i) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
              {i < headline.length - 1 && " "}
            </span>
          ))}
        </h1>

        <p className="hero-follow mt-8 max-w-[44ch] text-lead text-steel">
          AI Engineer building automations, agents and digital experiences that make businesses work smarter.
        </p>

        <div className="hero-follow mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <MagneticButton>
            <ButtonLink href="#contact">Let&apos;s build something</ButtonLink>
          </MagneticButton>
          <TextLink href="#work">Explore my work</TextLink>
        </div>

        <ul className="hero-follow telemetry mt-16 flex flex-wrap gap-x-3 gap-y-2 text-steel uppercase sm:mt-24">
          {roles.map((role, i) => (
            <li key={role} className="flex gap-3">
              {role}
              {i < roles.length - 1 && <span aria-hidden="true">/</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
