import { ButtonLink, TextLink } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SceneFallback } from "@/components/scenes/SceneFallback";

const roles = ["AI Engineer at Axxeler", "AI Automation Specialist", "AI Agent Builder"];

export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-svh items-center overflow-hidden pt-(--header-h)">
      <SceneFallback className="hero-core pointer-events-none absolute top-1/2 -right-[45%] -z-10 w-[120vw] max-w-none -translate-y-1/2 opacity-35 sm:-right-[22%] sm:w-[85vw] sm:opacity-50 lg:-right-[2%] lg:w-[min(56vw,860px)] lg:opacity-100" />

      <div className="shell py-16 sm:py-24">
        {/* A long headline, so a smaller ceiling than text-h1 keeps it clear of the core on desktop. */}
        <h1 id="hero-title" className="hero-title display max-w-[17ch] text-[clamp(2.125rem,0.9rem+4.2vw,4.5rem)] leading-[1] font-extrabold">
          I Build AI Systems That Turn Business Processes Into Intelligent Workflows.
        </h1>

        <p className="hero-follow mt-8 max-w-[52ch] text-lead text-steel">
          I am an AI Engineer focused on building intelligent automation systems, AI agents, SaaS solutions and
          AI-powered business applications.
        </p>

        <div className="hero-follow mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <MagneticButton>
            <ButtonLink href="#contact">Let&apos;s build something</ButtonLink>
          </MagneticButton>
          <TextLink href="#work">Explore my work</TextLink>
        </div>

        <ul className="hero-follow telemetry mt-16 flex flex-wrap gap-x-3 gap-y-2 text-steel uppercase sm:mt-20">
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
