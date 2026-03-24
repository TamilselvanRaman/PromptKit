import React from 'react';
import { 
  Sprout, Rocket, Zap, Target, Landmark, 
  Code2, ClipboardList, TrendingUp, Settings2, Database,
  Palette, PenTool, Mic, Handshake, Users,
  CircleDollarSign, Shield, Search, Scale, Cog,
  Heart, Edit3, LineChart, FlaskConical, Stethoscope,
  GraduationCap, Globe, BookOpen,
  MessageSquare, Brain, Sparkles, Layout, Terminal, Github, Image as ImageIcon
} from 'lucide-react';

export type ExperienceLevel = 'novice' | 'junior' | 'mid' | 'senior' | 'lead';
export type Domain = 
  | 'software-dev' | 'product-pm' | 'business' | 'devops' | 'data' 
  | 'creative' | 'design' | 'marketing' | 'sales' 
  | 'hr' | 'finance' | 'security' | 'qa' | 'legal' 
  | 'operations' | 'customer-success' | 'content' | 'seo' | 'research' 
  | 'healthcare' | 'education' | 'general';

export type OutputMode = 'structured' | 'concise' | 'detailed' | 'json' | 'master';
export type TargetTool = 'chatgpt' | 'claude' | 'gemini' | 'antigravity' | 'lovable' | 'v0' | 'bolt' | 'cursor' | 'copilot' | 'midjourney';

export const EXPERIENCE_LEVELS: { id: ExperienceLevel; label: string; range: string; icon: React.ReactNode }[] = [
  { id: 'novice', label: 'Novice/Student', range: '0–1 yrs',  icon: <Sprout size={18} /> },
  { id: 'junior', label: 'Junior',         range: '1–3 yrs',  icon: <Rocket size={18} /> },
  { id: 'mid',    label: 'Mid-Level',      range: '3–5 yrs',  icon: <Zap size={18} /> },
  { id: 'senior', label: 'Senior',         range: '5–8 yrs',  icon: <Target size={18} /> },
  { id: 'lead',   label: 'Lead/Principal', range: '8+ yrs',   icon: <Landmark size={18} /> },
];

export const DOMAINS: { id: Domain; label: string; icon: React.ReactNode }[] = [
  { id: 'software-dev',     label: 'Software Developer',      icon: <Code2 size={16} /> },
  { id: 'product-pm',       label: 'Product Manager / PM',    icon: <ClipboardList size={16} /> },
  { id: 'business',         label: 'Business / Strategy',     icon: <TrendingUp size={16} /> },
  { id: 'devops',           label: 'DevOps / Infra',          icon: <Settings2 size={16} /> },
  { id: 'data',             label: 'Data Science / ML',       icon: <Database size={16} /> },
  { id: 'creative',         label: 'Creative / Art',          icon: <Palette size={16} /> },
  { id: 'design',           label: 'UX/UI Design',            icon: <PenTool size={16} /> },
  { id: 'marketing',        label: 'Marketing / Growth',      icon: <Mic size={16} /> },
  { id: 'sales',            label: 'Sales / Account Mgt',     icon: <Handshake size={16} /> },
  { id: 'hr',               label: 'Human Resources',         icon: <Users size={16} /> },
  { id: 'finance',          label: 'Finance / Accounting',    icon: <CircleDollarSign size={16} /> },
  { id: 'security',         label: 'Cybersecurity',           icon: <Shield size={16} /> },
  { id: 'qa',               label: 'QA / Testing',            icon: <Search size={16} /> },
  { id: 'legal',            label: 'Legal / Compliance',      icon: <Scale size={16} /> },
  { id: 'operations',       label: 'Operations / Supply',     icon: <Cog size={16} /> },
  { id: 'customer-success', label: 'Customer Success',        icon: <Heart size={16} /> },
  { id: 'content',          label: 'Content Writing',         icon: <Edit3 size={16} /> },
  { id: 'seo',              label: 'SEO / Organic Growth',    icon: <LineChart size={16} /> },
  { id: 'research',         label: 'Academic / R&D',          icon: <FlaskConical size={16} /> },
  { id: 'healthcare',       label: 'Healthcare / Medical',    icon: <Stethoscope size={16} /> },
  { id: 'education',        label: 'Education / Teaching',    icon: <GraduationCap size={16} /> },
  { id: 'general',          label: 'General / Other',         icon: <Globe size={16} /> },
];

export const TARGET_TOOLS_LABELS: Record<TargetTool, string> = {
  chatgpt: 'ChatGPT', claude: 'Claude 3', gemini: 'Gemini', 
  antigravity: 'Antigravity', lovable: 'Lovable', v0: 'v0 (Vercel)', 
  bolt: 'Bolt.new', cursor: 'Cursor', copilot: 'GitHub Copilot', midjourney: 'Midjourney'
};

export const TARGET_TOOLS = [
  { id: 'chatgpt', label: 'ChatGPT', icon: <MessageSquare size={16} /> },
  { id: 'claude', label: 'Claude 3', icon: <Brain size={16} /> },
  { id: 'gemini', label: 'Gemini', icon: <Sparkles size={16} /> },
  { id: 'antigravity', label: 'Antigravity', icon: <Rocket size={16} /> },
  { id: 'lovable', label: 'Lovable', icon: <Heart size={16} /> },
  { id: 'v0', label: 'v0 (Vercel)', icon: <Layout size={16} /> },
  { id: 'bolt', label: 'Bolt.new', icon: <Zap size={16} /> },
  { id: 'cursor', label: 'Cursor', icon: <Terminal size={16} /> },
  { id: 'copilot', label: 'GitHub Copilot', icon: <Github size={16} /> },
  { id: 'midjourney', label: 'Midjourney', icon: <ImageIcon size={16} /> },
] as const;

export const LEVEL_LABELS: Record<ExperienceLevel, string> = {
  novice: 'Novice', junior: 'Junior', mid: 'Mid-Level', senior: 'Senior', lead: 'Lead / Principal',
};

export const DOMAIN_LABELS: Record<Domain, string> = {
  'software-dev': 'Software Developer',
  'product-pm':   'Product Manager',
  'business':     'Business Strategist',
  'devops':       'DevOps Engineer',
  'data':         'Data Scientist / ML Engineer',
  'creative':     'Creative Professional',
  'design':       'UX/UI Designer',
  'marketing':    'Marketing Manager',
  'sales':        'Sales Executive',
  'hr':           'HR Professional',
  'finance':      'Financial Analyst',
  'security':     'Security Engineer',
  'qa':           'QA Engineer',
  'legal':        'Legal Counsel',
  'operations':   'Operations Manager',
  'customer-success': 'Customer Success Manager',
  'content':      'Content Writer',
  'seo':          'SEO Specialist',
  'research':     'Researcher',
  'healthcare':   'Healthcare Professional',
  'education':    'Educator',
  'general':      'Professional',
};

export const PERSONA_DESCRIPTIONS: Partial<Record<string, string>> = {
  'junior:software-dev': 'Step-by-step explanations, educational context, beginner-friendly language, practical code examples.',
  'mid:software-dev':    'Balanced depth, patterns and best practices, pragmatic trade-offs, intermediate code examples.',
  'senior:software-dev': 'Terse and opinionated. Architecture-focused with trade-offs, scalability, performance, security implications.',
  'lead:software-dev':   'System-level thinking. Architecture decisions, team concerns, cross-cutting NFRs, tech debt awareness.',
  'junior:product-pm':   'Feature-focused with clear user stories. What + Why, basic acceptance criteria, simple KPIs.',
  'senior:product-pm':   'Strategic roadmap thinking, OKR alignment, trade-off analysis, executive-level framing.',
};

export function getPersonaDescription(level: ExperienceLevel, domain: Domain): string {
  return PERSONA_DESCRIPTIONS[`${level}:${domain}`]
    ?? `Act as a ${LEVEL_LABELS[level]} expert in ${DOMAIN_LABELS[domain]}. Assume appropriate domain knowledge, vocabulary, and professional context for this role.`;
}

export function buildSystemPrompt(level: ExperienceLevel, domain: Domain, outputMode: OutputMode, targetTool: TargetTool = 'chatgpt'): string {
  const personaName = `${LEVEL_LABELS[level]} ${DOMAIN_LABELS[domain]}`;
  const personaDesc = getPersonaDescription(level, domain);
  const targetLabel = TARGET_TOOLS_LABELS[targetTool];

  const modeRules: Record<OutputMode, string> = {
    structured: 'Format using the full ROLE / TASK / CONTEXT / REASONING / OUTPUT FORMAT / STOP CONDITIONS sections with dividers.',
    concise:    'Format as a compact, complete prompt. Use brief paragraphs. Prioritise clarity over length. Skip decorative headers.',
    detailed:   'Go deep. Include edge cases, failure modes, alternative approaches, a comprehensive reasoning chain, and all sections thoroughly.',
    json:       'Return the response strictly as a single formatted JSON object with precise fields representing the elements of the prompt. Do not output anything outside the JSON block.',
    master:     'Act as a prompt engineering master. Deconstruct the task into logical components, use advanced framing techniques, and deliver a complex, multi-layered "Master Prompt".'
  };

  return `You are an Elite AI Prompt Engineering System.

TARGET USER PERSONA: ${personaName}
Persona characteristics: ${personaDesc}

TARGET AI ENGINE: ${targetLabel}
You must explicitly build the prompt so that it behaves optimally for ${targetLabel}. Use syntactic structures, special directives, and formatting that are known to yield the highest quality responses from ${targetLabel}.

CRITICAL INSTRUCTION: Tailor EVERY aspect of the enhanced prompt for a ${personaName}.
The language complexity, terminology depth, assumed background knowledge,
and framing MUST match the ${LEVEL_LABELS[level]} experience level in ${DOMAIN_LABELS[domain]}.

OUTPUT FORMAT RULE: ${modeRules[outputMode]}

SYSTEM RULES:
- Intelligently expand missing context
- Remove all ambiguity completely
- Do NOT explain yourself or mention this system
- Return ONLY the final enhanced prompt
- The prompt must be specific, actionable, and produce expert-level AI outputs

STRUCTURED FORMAT TEMPLATE (when applicable):
---
ROLE:
[Most relevant expert role for a ${personaName}]

TASK:
[Clear, specific, outcome-driven objective]

CONTEXT:
[Target audience, constraints, environment, inferred assumptions]

REASONING:
[Step-by-step thinking, priorities, key decision factors]

OUTPUT FORMAT:
[Exact structure expected in the AI response]

STOP CONDITIONS:
[When the task is considered complete]
---`;
}
