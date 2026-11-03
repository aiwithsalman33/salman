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

              <p className="telemetry pl-6 pt-0.5 text-steel sm:pl-10 lg:pl-0 lg:text-right">
                <time dateTime={role.start.iso}>{role.start.label}</time>
                {" – "}
                {role.end ? <time dateTime={role.end.iso}>{role.end.label}</time> : "Present"}
              </p>

              <div className="pb-16 pl-6 sm:pl-10 lg:pl-0">
                <h3 className="display mt-2 text-h3 lg:mt-0">{role.role}</h3>
                <p className="mt-2 text-steel">
                  {role.org ?? "Current role"}
                  {role.location && `, ${role.location}`}
                </p>

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

                {role.awards && (
                  <div className="mt-6">
                    <h4 className="text-meta font-semibold text-steel">Awards in 2025</h4>
                    <ul className="mt-3 flex flex-col gap-2">
                      {role.awards.map((award) => (
                        <li key={award} className="flex items-center gap-3">
                          <span aria-hidden="true" className="size-2 shrink-0 bg-go" />
                          {award}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

        <p className="max-w-[60ch] text-steel lg:ml-[268px]">
          Alongside these roles: independent freelance automation work, and the AI With Salman creator channel.
        </p>
      </div>
    </section>
  );
}
