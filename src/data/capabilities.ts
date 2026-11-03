export type CapabilityId = "automation" | "agents" | "voice" | "whatsapp" | "content";

export type Capability = {
  id: CapabilityId;
  title: string;
  summary: string;
  points: readonly string[];
};

export const capabilities: readonly Capability[] = [
  {
    id: "automation",
    title: "AI Automation",
    summary: "Connecting the tools a business already uses so routine work runs on its own.",
    points: [
      "Workflow automation with n8n and Make.com.",
      "Connecting apps, APIs, databases and business processes.",
      "Reducing manual operations and repetitive tasks.",
    ],
  },
  {
    id: "agents",
    title: "AI Agents & LLM Apps",
    summary: "Assistants that work through a task and use real tools to finish it.",
    points: [
      "LLM API integrations.",
      "Agentic workflows and tool-connected assistants.",
      "Python-based AI application development.",
    ],
  },
  {
    id: "voice",
    title: "Voice AI",
    summary: "Voice agents and speech experiences, including regional languages.",
    points: [
      "Voice agent workflows.",
      "Text-to-speech experimentation.",
      "Regional-language and conversational experiences.",
    ],
  },
  {
    id: "whatsapp",
    title: "WhatsApp Automation",
    summary: "Lead handling and customer conversations on the channel people already use.",
    points: [
      "WhatsApp business workflows.",
      "Lead handling, sales support and customer communication.",
      "Cloud API and automation integrations.",
    ],
  },
  {
    id: "content",
    title: "AI Content & Education",
    summary: "Content systems, avatar video workflows and hands-on learning.",
    points: [
      "AI-assisted content systems.",
      "Founder and avatar video workflows.",
      "Tutorials, learning modules and practical projects.",
    ],
  },
];
