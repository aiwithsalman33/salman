export type SkillGroupId = "ai" | "automation" | "voice" | "product" | "creative" | "growth";

export type SkillGroup = { id: SkillGroupId; title: string; summary: string; skills: readonly string[] };

// Grouped by capability. No proficiency percentages.
export const skillGroups: readonly SkillGroup[] = [
  {
    id: "ai",
    title: "AI Engineering & Agentic AI",
    summary: "Building AI applications and agents on top of LLM APIs.",
    skills: ["Python", "LLM API Integration", "AI Agent Development", "Agentic Workflows", "Prompt Engineering", "Google AI Studio", "AI Application Development"],
  },
  {
    id: "automation",
    title: "Workflow Automation",
    summary: "Connecting systems so business processes run end to end.",
    skills: ["n8n", "Make.com", "API Integration", "Webhooks", "Workflow Architecture", "Business Process Automation", "System Integration"],
  },
  {
    id: "voice",
    title: "Conversational & Voice AI",
    summary: "Conversations on WhatsApp and by voice, automated.",
    skills: ["WhatsApp Automation", "WhatsApp Business API", "AI Voice Agents", "Text-to-Speech", "Conversational AI", "Voice Workflow Automation"],
  },
  {
    id: "product",
    title: "SaaS & Product Development",
    summary: "From prototype to product and internal system.",
    skills: ["SaaS Product Architecture", "AI-Powered Applications", "CRM Integration", "Internal Business Systems", "Vibe Coding", "Rapid Prototyping"],
  },
  {
    id: "creative",
    title: "AI Content & Creative Technology",
    summary: "AI avatars, video and content systems for founders and brands.",
    skills: ["AI Avatar Generation", "AI Video Production", "AI Content Workflows", "Founder Marketing", "Social Media Automation", "Content Strategy"],
  },
  {
    id: "growth",
    title: "Business & Growth",
    summary: "Understanding the business process before automating it.",
    skills: ["Business Process Analysis", "Sales Automation", "Lead Management", "Marketing Automation", "Meta Ads", "Digital Marketing Operations"],
  },
];
