import { provenance, type Provenance } from "./provenance";

export type Project = {
  id: string;
  title: string;
  /** One-line showcase copy, used in the index. */
  summary: string;
  provenance: Provenance;
  context: string;
  focus: readonly string[];
  /** Short telemetry facts. Only verified facts belong here. */
  facts: readonly { label: string; value: string }[];
  /** A simplified process diagram. Always captioned as a concept visual. */
  flow?: { steps: readonly string[]; caption: string };
  note?: string;
};

export const projects: readonly Project[] = [
  {
    id: "ziya-voice",
    title: "Ziya Voice",
    summary:
      "Built a voice-AI product from the ground up, working across product thinking, implementation and experience design.",
    provenance: provenance.aspirentech,
    context:
      "Built at Aspirentech Business Solutions over approximately six months, taking the product from scratch with limited senior developer support.",
    focus: ["Product thinking", "Implementation", "Experience design", "Voice AI"],
    facts: [
      { label: "Build time", value: "≈ 6 months" },
      { label: "Started from", value: "Scratch" },
    ],
    note: "Ziya Voice was built as employment work. Product screenshots will be added once they're approved for public use.",
  },
  {
    id: "whatsapp-sales",
    title: "WhatsApp sales automation",
    summary:
      "Designed an internal WhatsApp automation workflow to support sales operations and reduce repetitive manual work.",
    provenance: provenance.currentRole,
    context: "An internal, AI-powered WhatsApp automation system built for the sales team.",
    focus: ["WhatsApp automation", "Sales operations", "Workflow design", "Integrations"],
    facts: [{ label: "Used by", value: "Internal sales team" }],
    flow: {
      steps: ["Lead message", "Automated reply", "Sales hand-off", "Follow-up"],
      caption: "Concept visual: a simplified lead-to-follow-up journey, not the internal system.",
    },
    note: "Internal system. Customer data, credentials, endpoints and dashboards are deliberately not shown.",
  },
  {
    id: "founder-avatar",
    title: "Founder AI-avatar videos",
    summary:
      "Exploring AI avatar and regional-language content workflows to make founder-led communication easier to produce.",
    provenance: provenance.currentRole,
    context:
      "Ongoing work on founder AI-avatar video content, including Tamil and regional-language workflows.",
    focus: ["AI avatars", "Tamil and regional languages", "Voice", "Video workflow"],
    facts: [{ label: "Status", value: "In progress" }],
    flow: {
      steps: ["Script", "Voice", "Avatar", "Edit", "Publish"],
      caption: "Concept visual: the production pipeline, step by step.",
    },
    note: "Sample videos will be added once approved for public display.",
  },
  {
    id: "n8n-module",
    title: "n8n learning module",
    summary: "Designed a hands-on automation learning module built around ten practical n8n projects.",
    provenance: provenance.currentRoleLearning,
    context: "Created an n8n course module made up of ten practical projects.",
    focus: ["n8n", "Curriculum design", "Hands-on projects", "Automation teaching"],
    facts: [{ label: "Projects", value: "10" }],
    flow: {
      steps: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      caption: "The ten projects in the module. Project details will be added with screenshots.",
    },
  },
  {
    id: "whatsapp-platforms",
    title: "WhatsApp platform setup: BOTZUP and CLWise",
    summary:
      "Worked on WhatsApp automation platform setup and configuration to support business communication workflows.",
    provenance: provenance.aspirentech,
    context: "Worked on WhatsApp automation setup and related implementation at Aspirentech.",
    focus: ["Platform setup", "Configuration", "Business messaging"],
    facts: [{ label: "Platforms", value: "BOTZUP, CLWise" }],
    note: "Setup visuals will be added only where they're cleared for sharing.",
  },
  {
    id: "freelance",
    title: "Business automation builds",
    summary:
      "Helping businesses identify repetitive processes and turn them into practical AI-powered workflows.",
    provenance: provenance.independent,
    context: "Freelance AI engineering work focused on business automation and agents.",
    focus: ["Business process automation", "AI agents", "Integrations"],
    facts: [],
    flow: {
      steps: ["Find the repetitive work", "Map the manual process", "Design the automation", "Connect the tools", "Check what changed"],
      caption: "How an engagement runs, from problem to working workflow.",
    },
    note: "Client names and results are shared only with permission, and only when they've been measured.",
  },
  {
    id: "marketing-ops",
    title: "AI and marketing operations",
    summary: "Working across the intersection of AI, digital marketing and product experience.",
    provenance: provenance.aspirentech,
    context:
      "Contributed to brand building, social media content, video production, Meta ads, UI/UX and AI automation knowledge-sharing.",
    focus: ["Brand building", "Social content", "Video production", "Meta ads", "UI/UX", "Knowledge-sharing"],
    facts: [],
  },
];
