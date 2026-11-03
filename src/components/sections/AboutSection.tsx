import { RevealTitle } from "@/components/motion/RevealTitle";

const keywords =["Build", "Automate", "Experiment", "Teach"];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <RevealTitle id="about-title" className="display max-w-[16ch] text-h2">
            Not just experimenting with AI. Building with it.
          </RevealTitle>
          <p className="mt-8 max-w-[60ch] text-lead text-steel">
            I&apos;m Salman, an AI engineer and automation builder focused on turning emerging AI capabilities into
            practical systems. My work spans business process automation, AI agents, voice experiences, WhatsApp
            workflows, content systems and education. I enjoy taking an idea from a rough problem statement to a
            working solution.
          </p>
        </div>

        {/* Abstract frame in place of a portrait until a real photo is supplied (brief §3.3). */}
        <div aria-hidden="true" className="lg:col-span-4 lg:col-start-9">
          <div className="relative flex aspect-[4/5] max-h-[520px] w-full max-w-[420px] flex-col justify-end border border-hairline p-6 sm:p-8">
            <FrameCorners />
            <ul className="flex flex-col gap-1">
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
        </div>
      </div>
    </section>
  );
}

function FrameCorners() {
  const corner = "absolute size-3 border-signal";
  return (
    <>
      <span className={`${corner} -top-px -left-px border-t-2 border-l-2`} />
      <span className={`${corner} -top-px -right-px border-t-2 border-r-2`} />
      <span className={`${corner} -bottom-px -left-px border-b-2 border-l-2`} />
      <span className={`${corner} -right-px -bottom-px border-r-2 border-b-2`} />
    </>
  );
}
