"use client";

import { useState } from "react";
import { AudioLines, Bot, Clapperboard, MessageCircle, Workflow, type LucideIcon } from "lucide-react";
import type { Capability, CapabilityId } from "@/data/capabilities";
import { CapabilityGlyph } from "./CapabilityGlyph";

const icons: Record<CapabilityId, LucideIcon> = {
  automation: Workflow,
  agents: Bot,
  voice: AudioLines,
  whatsapp: MessageCircle,
  content: Clapperboard,
};

/**
 * Five modules side by side on desktop (one open, the rest compressed to vertical labels),
 * a vertical accordion on phones. Accordion semantics: each header is a button with aria-expanded.
 */
export function CapabilityBank({ items }: { items: readonly Capability[] }) {
  const [openId, setOpenId] = useState<CapabilityId>(items[0].id);

  return (
    <div className="bank">
      {items.map((item) => {
        const open = item.id === openId;
        const Icon = icons[item.id];
        return (
          <div key={item.id} className="bank-module" data-open={open}>
            <h3 className="bank-heading">
              <button
                type="button"
                id={`cap-${item.id}-trigger`}
                aria-expanded={open}
                aria-controls={`cap-${item.id}`}
                onClick={() => setOpenId(item.id)}
                className="bank-trigger"
              >
                <Icon aria-hidden="true" className="bank-icon" strokeWidth={1.5} />
                <span className="bank-title display text-h3">{item.title}</span>
              </button>
            </h3>

            <div
              id={`cap-${item.id}`}
              role="region"
              aria-labelledby={`cap-${item.id}-trigger`}
              hidden={!open}
              className="bank-panel"
            >
              <p className="max-w-[40ch] text-lead">{item.summary}</p>
              <ul className="mt-6 flex max-w-[52ch] flex-col gap-2 text-steel">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-10 lg:mt-auto lg:self-end">
                <CapabilityGlyph id={item.id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
