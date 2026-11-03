import { capabilities } from "@/data/capabilities";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CapabilityBank } from "./CapabilityBank";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="section">
      <div className="shell">
        <SectionHeading id="capabilities-title" intro="Five areas I work in. Open one to see what it covers.">
          What I do
        </SectionHeading>
        <div className="mt-14">
          <CapabilityBank items={capabilities} />
        </div>
      </div>
    </section>
  );
}
