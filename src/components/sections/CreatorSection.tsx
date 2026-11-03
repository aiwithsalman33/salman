import { instagram, learnerCount, topmate, youtube } from "@/data/social-links";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Topics from the creator description.
const topics = ["AI tools", "Automation", "Agentic workflows", "Emerging technologies"];

export function CreatorSection() {
  return (
    <section id="creator" aria-labelledby="creator-title" className="section">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <SectionHeading
            id="creator-title"
            intro="Alongside engineering AI-powered systems, I create educational content around AI tools, automation, agentic workflows and emerging technologies."
          >
            Building With AI. Sharing What I Discover.
          </SectionHeading>

          {learnerCount && <p className="telemetry mt-6 text-meta text-go">{learnerCount} learners</p>}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink href={topmate.href} variant="outline" external>
              Learn with me on Topmate
            </ButtonLink>
            <TextLink href={instagram.href} external>
              Follow on Instagram
            </TextLink>
            {youtube && (
              <TextLink href={youtube.href} external>
                {youtube.label}
              </TextLink>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <h3 className="text-meta font-semibold text-steel">What I share</h3>
          <ul className="mt-4 border-t border-hairline">
            {topics.map((topic) => (
              <li key={topic} className="border-b border-hairline py-5 text-h3 font-semibold">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
