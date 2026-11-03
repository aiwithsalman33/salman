import { instagram, learnerCount, topmate, youtube } from "@/data/social-links";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Content formats from brief §6. Shown as a plain log until real reel thumbnails are supplied.
const formats = [
  { name: "Reels", about: "Short looks at new AI tools" },
  { name: "Tutorials", about: "Step-by-step builds you can follow" },
  { name: "Experiments", about: "Trying emerging workflows in public" },
  { name: "Walkthroughs", about: "Automations and agents, end to end" },
];

export function CreatorSection() {
  return (
    <section id="creator" aria-labelledby="creator-title" className="section">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <SectionHeading
            id="creator-title"
            intro="Alongside building AI systems, I create practical content around AI tools, automation, agents and emerging workflows. I enjoy helping students and builders move from watching AI demos to actually building useful things."
          >
            Building in public. Sharing what I learn.
          </SectionHeading>

          {learnerCount && <p className="telemetry mt-6 text-meta text-go">{learnerCount} learners</p>}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink href={topmate.href} variant="outline" external>
              Learn with me
            </ButtonLink>
            <TextLink href={instagram.href} external>
              Watch my experiments
            </TextLink>
            {youtube && (
              <TextLink href={youtube.href} external>
                {youtube.label}
              </TextLink>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <h3 className="text-meta font-semibold text-steel">What I post</h3>
          <ul className="mt-4 border-t border-hairline">
            {formats.map((format) => (
              <li key={format.name} className="flex flex-col gap-1 border-b border-hairline py-5 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="display w-40 shrink-0 text-lead">{format.name}</span>
                <span className="text-steel">{format.about}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
