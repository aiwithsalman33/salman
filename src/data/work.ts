/**
 * Work, organised in four categories. Each category is its own page section and 3D environment.
 * Accuracy rules: no invented metrics, clients or features. Workflow diagrams marked `illustrative`
 * are simplified examples, not screenshots of the real system. `tech` lists only confirmed tools.
 */

export type CategoryId = "automation" | "products" | "solutions" | "studio";
export type Accent = "signal" | "depth" | "fg" | "go";

export type Project = {
  id: string;
  title: string;
  /** Industry, or the kind of work when no industry applies. */
  industry: string;
  summary: string;
  problem: string;
  solution: string;
  workflow: { steps: readonly string[]; illustrative: boolean };
  capabilities: readonly string[];
  tech?: readonly string[];
  link?: { label: string; href: string };
  note?: string;
};

export type WorkCategory = {
  id: CategoryId;
  number: string;
  title: string;
  environment: string;
  /** Optional display heading that replaces the title in the section header. */
  heading?: string;
  intro: string;
  accent: Accent;
  projects: readonly Project[];
};

export const workCategories: readonly WorkCategory[] = [
  {
    id: "automation",
    number: "01",
    title: "n8n Automation & AI Agents",
    environment: "Automation Lab",
    intro:
      "AI agents and end-to-end workflows built on n8n, from invoicing and research to complete sales journeys.",
    accent: "signal",
    projects: [
      {
        id: "invoice-agent",
        title: "AI Invoice Generation Agent",
        industry: "IT services",
        summary:
          "An AI-powered invoice generation workflow designed for IT service businesses. Automates invoice-related processes, organizes required information and helps streamline invoice creation.",
        problem:
          "Invoices for IT service work draw details from several places, and preparing them by hand is slow and easy to get wrong.",
        solution:
          "An n8n workflow with an AI agent that gathers and organises the information an invoice needs and helps produce it consistently.",
        workflow: { steps: ["Billing details in", "AI organises the data", "Invoice drafted", "Review", "Invoice ready"], illustrative: true },
        capabilities: ["Invoice-process automation", "Organising required information", "Streamlined invoice creation"],
        tech: ["n8n"],
      },
      {
        id: "whatsapp-ecommerce-agent",
        title: "WhatsApp E-commerce Sales Agent",
        industry: "E-commerce",
        summary:
          "An AI-powered WhatsApp sales agent designed for e-commerce businesses. Handles customer conversations, product enquiries, sales assistance and the customer purchasing journey through WhatsApp.",
        problem:
          "Shoppers ask questions on WhatsApp at all hours, and answering every enquiry by hand slows sales down.",
        solution:
          "An end-to-end AI sales agent on WhatsApp that handles conversations, answers product enquiries and guides customers through buying.",
        workflow: { steps: ["Customer message", "Enquiry understood", "Product answers", "Sales assistance", "Purchase journey"], illustrative: true },
        capabilities: ["Customer conversations", "Product enquiries", "Sales assistance", "Purchase-journey support"],
        tech: ["n8n", "WhatsApp"],
      },
      {
        id: "lead-to-sales-agent",
        title: "End-to-End AI Lead-to-Sales Agent",
        industry: "Sales",
        summary:
          "A complete AI-driven sales automation system that manages the customer journey from initial lead capture to sales closure.",
        problem:
          "Leads go cold between capture and close when qualification, follow-ups and objections all depend on manual effort.",
        solution: "One AI-driven system that carries each lead through every stage of the journey, from first contact to closing.",
        workflow: {
          steps: ["Lead capture", "Lead qualification", "AI conversation", "Follow-ups", "Objection handling", "Sales conversion", "Closing"],
          illustrative: false,
        },
        capabilities: ["Lead capture", "Lead qualification", "AI conversations", "Follow-ups", "Objection handling", "Sales conversion"],
        tech: ["n8n"],
      },
      {
        id: "research-agent",
        title: "Personal AI Research Analyst Agent",
        industry: "Research",
        summary:
          "An AI research assistant designed to collect information, analyze relevant data, organize findings and generate structured research insights.",
        problem: "Research means collecting sources, reading through them and organising notes before any insight appears.",
        solution: "An AI research assistant that does the collecting, analysing and organising, and returns structured insights.",
        workflow: { steps: ["Research question", "Information collected", "Data analysed", "Findings organised", "Structured insights"], illustrative: true },
        capabilities: ["Information collection", "Data analysis", "Organised findings", "Structured research insights"],
        tech: ["n8n"],
      },
      {
        id: "social-media-agent",
        title: "AI Social Media Manager Agent",
        industry: "Social media",
        summary:
          "An AI-powered social media management workflow that supports the content lifecycle, from publishing posts to managing collaboration outreach and business deal follow-ups.",
        problem:
          "Running social channels means publishing, outreach and partnership follow-ups across many conversations at once.",
        solution:
          "A workflow that supports each stage of the content lifecycle, from publishing to collaboration outreach and deal follow-ups.",
        workflow: {
          steps: ["Content publishing", "Workflow management", "Collaboration DM outreach", "Response handling", "Partnership follow-ups", "Deal progression"],
          illustrative: false,
        },
        capabilities: [
          "Content publishing",
          "Social media workflow management",
          "Collaboration DM outreach",
          "Response handling",
          "Partnership follow-ups",
          "Deal progression and closure support",
        ],
        tech: ["n8n"],
        note: "The agent supports each stage of the process; it doesn't run partnerships on its own.",
      },
    ],
  },
  {
    id: "products",
    number: "02",
    title: "SaaS Products & Internal Systems",
    environment: "Product Universe",
    intro: "Products and systems built for internal use or as owned product initiatives.",
    accent: "depth",
    projects: [
      {
        id: "internal-whatsapp-app",
        title: "Internal WhatsApp Automation Application",
        industry: "Internal system",
        summary:
          "A WhatsApp automation application designed to support internal business operations through end-to-end automated workflows.",
        problem: "Internal operations that run over WhatsApp involve repetitive messages and manual hand-offs between people.",
        solution: "An application that connects WhatsApp to automated workflows, so routine operational tasks are handled end to end.",
        workflow: { steps: ["WhatsApp message", "Workflow triggered", "Task handled", "Systems updated", "Team notified"], illustrative: true },
        capabilities: ["WhatsApp communication", "Workflow automation", "Internal operational processes", "Automated task handling", "Integration architecture"],
        tech: ["WhatsApp"],
        note: "Internal application: its screens and data aren't shown.",
      },
      {
        id: "checkgeo",
        title: "CheckGEO.ai: GEO Report Analyzer",
        industry: "Public AI tool",
        summary:
          "An AI-powered GEO report analysis tool that helps users analyze and understand Generative Engine Optimization reports.",
        problem:
          "Businesses can't easily tell how visible they are inside AI-generated answers, or what to fix to show up more.",
        solution: "A publicly accessible AI tool that analyses Generative Engine Optimization and explains the results.",
        workflow: { steps: ["Business in", "AI visibility audit", "GEO score", "Prioritised fixes"], illustrative: true },
        // From the live product's own description.
        capabilities: [
          "Audits visibility inside ChatGPT, Claude, Perplexity and Gemini answers",
          "0–100 GEO score across seven pillars",
          "Prioritised fixes",
        ],
        link: { label: "Explore CheckGEO.ai", href: "https://zgeoai.zenautomations.in/" },
      },
    ],
  },
  {
    id: "solutions",
    number: "03",
    title: "AI Solutions Delivered as a Service",
    environment: "Business Solutions Hub",
    intro: "AI solutions implemented for businesses in technology, healthcare and digital marketing.",
    accent: "fg",
    projects: [
      {
        id: "whatsapp-sales-team",
        title: "WhatsApp Sales Team Automation",
        industry: "Technology / IT company",
        summary:
          "An end-to-end WhatsApp automation solution designed to streamline sales-team operations, improve lead communication and automate repetitive sales activities.",
        problem: "Sales teams lose hours to repetitive WhatsApp follow-ups and lead communication.",
        solution: "End-to-end WhatsApp automation that takes repetitive sales activity off the team and keeps lead communication moving.",
        workflow: { steps: ["New lead", "Automated first response", "Lead routed to sales", "Scheduled follow-ups", "Sales update"], illustrative: true },
        capabilities: ["Sales-team operations", "Lead communication", "Automated repetitive sales activities"],
        tech: ["WhatsApp"],
      },
      {
        id: "healthcare-crm",
        title: "AI-Powered CRM Integration",
        industry: "Healthcare",
        summary: "AI integration within a CRM system to support and improve the healthcare industry's sales process.",
        problem: "Healthcare sales teams juggle leads, follow-ups and communication in a CRM that does little of the work for them.",
        solution: "AI built into the CRM's sales workflows to help manage leads, automate steps and support communication.",
        workflow: { steps: ["Lead enters CRM", "AI-assisted qualification", "Assisted follow-up", "Pipeline updated"], illustrative: true },
        capabilities: ["AI-assisted CRM workflows", "Lead management", "Sales process automation", "Intelligent communication", "Operational efficiency"],
        note: "Supports the sales process only. It does not provide medical diagnosis or clinical decision-making.",
      },
      {
        id: "agency-task-management",
        title: "AI-Enabled Task Management System",
        industry: "Digital marketing agency",
        summary:
          "An AI-enabled task management solution designed to streamline internal task handling, team coordination and operational workflows within a digital marketing agency.",
        problem: "Agency teams coordinate many tasks across clients, and tracking them by hand creates delays.",
        solution: "Task management with AI built in, to organise internal work and keep the team coordinated.",
        workflow: { steps: ["Task request", "AI organises the task", "Team coordination", "Progress tracking", "Delivery"], illustrative: true },
        capabilities: ["Internal task handling", "Team coordination", "Operational workflows"],
      },
      {
        id: "voice-agent-platform",
        title: "AI Voice Agentic Platform",
        industry: "Voice AI",
        summary:
          "An AI-powered voice agent platform designed to enable conversational voice experiences and automate voice-based interactions.",
        problem: "Voice interactions are repetitive and hard to scale with people alone.",
        solution: "A platform for AI voice agents that hold conversations and connect voice interactions to automated workflows.",
        workflow: { steps: ["Caller speaks", "Speech understood", "AI response", "Voice reply", "Automation triggered"], illustrative: true },
        capabilities: ["Voice AI", "Conversational interactions", "AI-powered voice workflows", "Automation integrations"],
      },
    ],
  },
  {
    id: "studio",
    number: "04",
    title: "AI Content Marketing & Founder Marketing",
    environment: "Creator Studio",
    heading: "Scaling Founder Presence With AI.",
    intro:
      "AI avatar, voice and content workflows that help founders show up consistently without endless recording and production.",
    accent: "go",
    projects: [
      {
        id: "founder-avatar-video",
        title: "AI Avatar Generation & Founder Video Creation",
        industry: "Founder marketing",
        summary:
          "AI-powered founder avatar generation and video production workflows that help founders create consistent video content without spending excessive time on repeated recording and production.",
        problem: "Founders need a steady stream of video, but recording and producing each one takes time they don't have.",
        solution: "An AI avatar and voice workflow that turns a script into founder video, with regional-language versions possible.",
        workflow: { steps: ["Script", "AI voice", "AI avatar", "Edit", "Publish"], illustrative: true },
        capabilities: [
          "AI avatar generation",
          "Founder video production",
          "AI voice generation",
          "Video content workflows",
          "Regional-language content possibilities",
          "Content production automation",
        ],
      },
      {
        id: "content-marketing-systems",
        title: "AI Content Marketing Systems",
        industry: "Content marketing",
        summary:
          "AI-powered content workflows designed to support content planning, creation, production and publishing for businesses and founders.",
        problem: "Consistent content needs planning, writing, production and publishing, which is hard to sustain by hand.",
        solution: "One AI-assisted pipeline from strategy to publishing.",
        workflow: {
          steps: ["Strategy", "Content ideas", "Script generation", "AI production", "Editing", "Publishing"],
          illustrative: false,
        },
        capabilities: ["Content planning", "Content creation", "Production", "Publishing"],
      },
    ],
  },
];

/** The marketing proposition for the Creator Studio category. Not a verified or guaranteed result. */
export const studioProposition = {
  claim: "Helping founders save up to 10x time and production costs through AI-powered content workflows.",
  footnote: "“Up to 10x” describes what these workflows can make possible; actual savings depend on the project.",
};
