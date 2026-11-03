"use client";

import { useEffect, useState } from "react";
import { AudioLines, Bot, Clapperboard, LayoutTemplate, TrendingUp, Workflow, type LucideIcon } from "lucide-react";
import type { SkillGroup, SkillGroupId } from "@/data/skills";
import { sceneState } from "@/lib/sceneBus";
import { SkillGlyph } from "./SkillGlyph";

const icons: Record<SkillGroupId, LucideIcon> = {
  ai: Bot,
  automation: Workflow,
  voice: AudioLines,
  product: LayoutTemplate,
  creative: Clapperboard,
  growth: TrendingUp,
};

/**
 * Skill groups side by side on desktop (one open, the rest compressed to vertical labels),
 * a vertical accordion on phones. The open group lights its cluster in the 3D skills network.
 */
export function SkillBank({ groups }: { groups: readonly SkillGroup[] }) {
  const [openId, setOpenId] = useState<SkillGroupId>(groups[0].id);

  useEffect(() => {
    sceneState.activeSkill = groups.findIndex((g) => g.id === openId);
  }, [groups, openId]);

  return (
    <div className="bank">
      {groups.map((group) => {
        const open = group.id === openId;
        const Icon = icons[group.id];
        return (
          <div key={group.id} className="bank-module" data-open={open}>
            <h3 className="bank-heading">
              <button
                type="button"
                id={`skill-${group.id}-trigger`}
                aria-expanded={open}
                aria-controls={`skill-${group.id}`}
                onClick={() => setOpenId(group.id)}
                className="bank-trigger"
              >
                <Icon aria-hidden="true" className="bank-icon" strokeWidth={1.5} />
                <span className="bank-title text-h3 font-semibold">{group.title}</span>
              </button>
            </h3>

            <div id={`skill-${group.id}`} role="region" aria-labelledby={`skill-${group.id}-trigger`} hidden={!open} className="bank-panel">
              <p className="max-w-[44ch] text-lead">{group.summary}</p>
              <ul className="mt-6 grid max-w-[560px] gap-x-8 gap-y-2.5 text-steel sm:grid-cols-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-signal" />
                    {skill}
                  </li>
                ))}
              </ul>
              <div className="mt-10 lg:mt-auto lg:self-end">
                <SkillGlyph id={group.id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
