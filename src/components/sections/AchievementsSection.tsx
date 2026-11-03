import { achievements } from "@/data/achievements";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AchievementsSection() {
  return (
    <section id="milestones" aria-labelledby="milestones-title" className="section">
      <div className="shell">
        <SectionHeading id="milestones-title">Milestones</SectionHeading>

        <ul className="mt-14 border-t border-hairline">
          {achievements.map((item) => (
            <li
              key={item.id}
              className="grid gap-2 border-b border-hairline py-6 sm:grid-cols-[auto_1fr] sm:gap-x-6 lg:grid-cols-[auto_1fr_minmax(220px,auto)] lg:items-baseline"
            >
              <span className="telemetry inline-flex items-center gap-2 text-go">
                <span aria-hidden="true" className="size-2 bg-go" />
                Achieved
              </span>
              <span className="text-lead">{item.title}</span>
              <span className="telemetry text-steel sm:col-start-2 lg:col-start-3 lg:text-right">{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
