import Image from "next/image";
import { RevealTitle } from "@/components/motion/RevealTitle";
import portrait from "@/assets/salman-portrait.jpg";

const keywords = ["Build", "Automate", "Experiment", "Teach"];

const identities = [
  "AI Engineer",
  "AI Automation Specialist",
  "AI Agent Builder",
  "SaaS & Product Builder",
  "AI Content Marketing Specialist",
  "Freelance AI Engineer",
];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <RevealTitle id="about-title" className="display max-w-[16ch] text-h2">
            Not just experimenting with AI. Building with it.
          </RevealTitle>
          <p className="mt-8 max-w-[60ch] text-lead text-steel">
            I&apos;m Salman, an AI Engineer at Axxeler. From automating complete sales journeys to developing
            conversational AI systems and founder-led content workflows, I turn complex business processes into
            scalable AI-powered solutions.
          </p>
          <p className="mt-5 max-w-[60ch] text-steel">
            My work combines AI engineering, workflow automation, business process optimization, SaaS development and
            creative AI.
          </p>

          <h3 className="mt-10 text-meta font-semibold text-steel">What I work as</h3>
          <ul className="mt-4 flex max-w-[60ch] flex-wrap gap-2">
            {identities.map((identity) => (
              <li key={identity} className="rounded-full border border-hairline-strong px-3.5 py-1.5 text-meta font-medium">
                {identity}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative w-full max-w-[360px] lg:col-span-4 lg:col-start-9 lg:max-w-[420px]">
          <FrameCorners />
          <div className="relative aspect-[4/5] overflow-hidden border border-hairline">
            <Image
              src={portrait}
              alt="Portrait of Salman"
              placeholder="blur"
              sizes="(min-width: 1024px) 420px, 360px"
              className="h-full w-full object-cover object-top"
            />
            {/* The photo's lower half is a dark suit: fade it into the page so the keywords sit on dark. */}
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-void via-void/80 to-transparent" />
            <ul aria-hidden="true" className="absolute bottom-6 left-6 flex flex-col gap-0.5 sm:bottom-8 sm:left-8">
              {keywords.map((word, i) => (
                <li
                  key={word}
                  className="display text-h3 uppercase"
                  style={i === 0 ? undefined : { color: "transparent", WebkitTextStroke: "1px var(--color-steel)" }}
                >
                  {word}
                </li>
              ))}
            </ul>
          </div>
        </figure>
      </div>
    </section>
  );
}

function FrameCorners() {
  const corner = "pointer-events-none absolute z-10 size-3 border-signal";
  return (
    <>
      <span aria-hidden="true" className={`${corner} -top-px -left-px border-t-2 border-l-2`} />
      <span aria-hidden="true" className={`${corner} -top-px -right-px border-t-2 border-r-2`} />
      <span aria-hidden="true" className={`${corner} -bottom-px -left-px border-b-2 border-l-2`} />
      <span aria-hidden="true" className={`${corner} -right-px -bottom-px border-r-2 border-b-2`} />
    </>
  );
}
