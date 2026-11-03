export type SkillGroup = { id: string; title: string; skills: readonly string[] };

// Only tools Salman can discuss confidently. No proficiency percentages (brief §5).
export const skillGroups: readonly SkillGroup[] = [
  {
    id: "automation",
    title: "Automation",
    skills: ["n8n", "Make.com", "Workflow design", "API integrations", "Webhooks", "Business process automation"],
  },
  {
    id: "ai",
    title: "AI engineering",
    skills: ["Python", "LLM APIs", "Agentic workflows", "AI assistants", "Prompt engineering", "Google AI Studio"],
  },
  {
    id: "voice",
    title: "Voice and conversational AI",
    skills: ["Voice agents", "Text-to-speech workflows", "Conversational AI", "WhatsApp automation", "Regional-language AI workflows"],
  },
  {
    id: "product",
    title: "Product and creative technology",
    skills: ["UI/UX thinking", "Vibe coding", "AI-assisted development", "Automation architecture", "Rapid prototyping"],
  },
  {
    id: "growth",
    title: "Growth and content",
    skills: ["Meta Ads", "Social media marketing", "AI content workflows", "Video production", "Educational content"],
  },
];
