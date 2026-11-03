import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Desktop: dates in a 220px column, the line in the 48px gap after it (220 + 24).
const lineX = "left-0 lg:left-[244px]";

export function JourneySection() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="section">
      <div className="shell">
        <SectionHeading id="journey-title">Career journey</SectionHeading>

        <ol className="mt-14">
          {experience.map((role) => (
            <li key={role.id} className="relative grid lg:grid-cols-[220px_1fr] lg:gap-x-12">
              <span aria-hidden="true" className={`absolute top-0 bottom-0 w-px bg-hairline-strong ${lineX}`} />
              <span
                aria-hidden="true"
                className={`absolute top-1.5 size-3 -translate-x-1/2 rounded-full border ${lineX} ${
                  role.current ? "border-signal bg-signal shadow-[0_0_0_5px_rgb(92_225_230/0.15)]" : "border-steel bg-void"
                }`}
              />

              <p className="telemetry pt-0.5 pl-6 text-steel sm:pl-10 lg:pl-0 lg:text-right">
                {role.start ? (
                  <>
                    <time dateTime={role.start.iso}>{role.start.label}</time>
                    {" – "}
                    {role.end ? <time dateTime={role.end.iso}>{role.end.label}</time> : "Present"}
                  </>
                ) : (
                  role.current && <span className="text-signal">Current role</span>
                )}
              </p>

              <div className="pb-16 pl-6 sm:pl-10 lg:pl-0">
                <h3 className="mt-2 text-h3 font-semibold lg:mt-0">{role.role}</h3>
                <p className="mt-2 text-lead text-steel">{role.org}</p>

                {role.focus && <p className="mt-5 max-w-[60ch]">Focus: {role.focus}</p>}

                {role.highlights.length > 0 && (
                  <ul className="mt-6 flex max-w-[60ch] flex-col gap-2">
                    {role.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-signal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        <p className="max-w-[60ch] text-steel lg:ml-[268px]">
          Alongside these roles: freelance AI engineering for businesses, and the AI With Salman creator channel.
        </p>
      </div>
    </section>
  );
}
