// Platform Information
export const PLATFORM = {
  name: 'Aasim AI',
  tagline: 'AI Precision. Human Control.',
  description: 'Build, Deploy, and Monetize Precision AI Agents',
  version: '2.0.0',
};

// Precision AI Engines
export const ENGINES = [
  {
    id: 'vision',
    name: 'Precision Vision Engine',
    shortName: 'Vision',
    icon: 'eye',
    description: 'Image & video analysis, object detection, OCR, face recognition',
    color: '#3b82f6',
    category: 'Visual',
    inputTypes: [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'video/avi'
    ],
    capabilities: [
      'Object Detection',
      'OCR (Optical Character Recognition)',
      'Image Classification',
      'Face Detection & Recognition',
      'Emotion Analysis',
      'Color Extraction',
      'Video Analysis',
      'Logo & Brand Detection'
    ],
  },
  {
    id: 'audio',
    name: 'Precision Audio Engine',
    shortName: 'Audio',
    icon: 'mic',
    description: 'Speech-to-text, audio analysis, transcription',
    color: '#8b5cf6',
    category: 'Audio',
    inputTypes: ['audio/mp3', 'audio/wav', 'audio/ogg'],
    capabilities: ['transcription', 'speaker-identification', 'sentiment-analysis'],
  },
  {
    id: 'text',
    name: 'Precision Text Engine',
    shortName: 'Text',
    icon: 'type',
    description: 'NLP, sentiment analysis, entity extraction',
    color: '#06b6d4',
    category: 'Language',
    inputTypes: ['text/plain'],
    capabilities: ['sentiment', 'entities', 'summarization', 'translation'],
  },
  {
    id: 'code',
    name: 'Precision Code Engine',
    shortName: 'Code',
    icon: 'code',
    description: 'Code analysis, bug detection, optimization',
    color: '#14b8a6',
    category: 'Development',
    inputTypes: ['text/plain'],
    capabilities: ['syntax-check', 'bug-detection', 'optimization', 'documentation'],
  },
  {
    id: 'document',
    name: 'Precision Document Engine',
    shortName: 'Documents',
    icon: 'file-text',
    description: 'PDF/DOCX processing, metadata extraction',
    color: '#f59e0b',
    category: 'Documents',
    inputTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    capabilities: ['text-extraction', 'metadata', 'table-detection', 'form-filling'],
  },
  {
    id: 'data',
    name: 'Precision Data Engine',
    shortName: 'Data',
    icon: 'database',
    description: 'CSV/Excel analysis, data validation',
    color: '#10b981',
    category: 'Data',
    inputTypes: ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    capabilities: ['schema-detection', 'validation', 'transformation', 'insights'],
  },
  {
    id: 'web',
    name: 'Precision Web Engine',
    shortName: 'Web',
    icon: 'globe',
    description: 'Web scraping, content extraction, monitoring',
    color: '#ec4899',
    category: 'Web',
    inputTypes: ['text/html', 'url'],
    capabilities: ['scraping', 'monitoring', 'seo-analysis', 'screenshot'],
  },
];

// HITL Oversight Modes
export const HITL_MODES = [
  {
    id: 'fully-ai',
    name: 'Fully AI-Driven',
    description: 'Agent operates autonomously without human intervention',
    icon: 'zap',
    color: 'blue',
    useCase: 'High-volume, low-risk tasks',
  },
  {
    id: 'hitl',
    name: 'Human-in-the-Loop (HITL)',
    description: 'Human approval required before execution',
    icon: 'user-check',
    color: 'green',
    useCase: 'Critical decisions, compliance requirements',
  },
  {
    id: 'standby',
    name: 'Human-on-Standby',
    description: 'AI executes, human monitors and can intervene',
    icon: 'eye',
    color: 'yellow',
    useCase: 'Moderate risk, periodic oversight',
  },
  {
    id: 'in-charge',
    name: 'Human-in-Charge',
    description: 'Human initiates and controls each step',
    icon: 'shield',
    color: 'red',
    useCase: 'High-stakes, regulated environments',
  },
  {
    id: 'hybrid',
    name: 'Hybrid Oversight',
    description: 'Mix of automated and manual steps',
    icon: 'layers',
    color: 'purple',
    useCase: 'Complex workflows with varying risk levels',
  },
];

// Industries Served
export const INDUSTRIES = [
  { id: 'healthcare', name: 'Healthcare', icon: 'heart' },
  { id: 'education', name: 'Education', icon: 'graduation-cap' },
  { id: 'hr', name: 'HR & Recruitment', icon: 'users' },
  { id: 'legal', name: 'Legal', icon: 'scale' },
  { id: 'real-estate', name: 'Real Estate', icon: 'home' },
  { id: 'technology', name: 'Technology', icon: 'cpu' },
  { id: 'finance', name: 'Finance & Banking', icon: 'dollar-sign' },
  { id: 'insurance', name: 'Insurance', icon: 'shield' },
  { id: 'customer-service', name: 'Customer Service', icon: 'headphones' },
  { id: 'logistics', name: 'Logistics', icon: 'truck' },
  { id: 'public-sector', name: 'Public Sector', icon: 'building' },
  { id: 'manufacturing', name: 'Manufacturing', icon: 'factory' },
  { id: 'retail', name: 'Retail & E-commerce', icon: 'shopping-cart' },
  { id: 'construction', name: 'Construction', icon: 'hard-hat' },
  { id: 'energy', name: 'Energy', icon: 'zap' },
  { id: 'marketing', name: 'Marketing & Advertising', icon: 'megaphone' },
];

// Subscription Plans
export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    interval: 'month',
    features: [
      '5 Precision AI Agents',
      'Access to all 7 Engines',
      'Basic rubrics',
      '1,000 agent runs/month',
      'Community support',
      'Webhook integration',
    ],
    limits: {
      maxAgents: 5,
      maxRuns: 1000,
      maxWorkflows: 3,
      maxSchedules: 10,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 199,
    interval: 'month',
    popular: true,
    features: [
      'Unlimited Precision AI Agents',
      'Custom rubrics',
      '10,000 agent runs/month',
      'Priority support',
      'API + SDK access',
      'Multi-agent orchestration',
      'Publish to marketplace',
      '70% revenue share',
    ],
    limits: {
      maxAgents: -1, // unlimited
      maxRuns: 10000,
      maxWorkflows: 20,
      maxSchedules: 100,
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Everything in Pro',
      'Unlimited agent runs',
      'Dedicated support',
      'SLA guarantees',
      'Custom integrations',
      'Multi-tenant management',
      'Advanced HITL workflows',
      'White-label options',
    ],
    limits: {
      maxAgents: -1,
      maxRuns: -1,
      maxWorkflows: -1,
      maxSchedules: -1,
    },
  },
];

// Agent Execution Modes
export const EXECUTION_MODES = [
  {
    id: 'once',
    name: 'Run Once',
    description: 'Execute agent immediately with manual trigger',
    icon: 'play',
  },
  {
    id: 'schedule',
    name: 'Schedule',
    description: 'Run agent on a recurring schedule (cron)',
    icon: 'calendar',
  },
  {
    id: 'orchestrate',
    name: 'Orchestrate',
    description: 'Chain multiple agents in a workflow',
    icon: 'git-branch',
  },
];

// Integration Types
export const INTEGRATION_TYPES = [
  {
    id: 'webhook',
    name: 'Webhooks',
    description: 'HTTP callbacks for real-time events',
    icon: 'webhook',
    docsUrl: '/docs/integrations/webhooks',
  },
  {
    id: 'rest-api',
    name: 'REST API',
    description: 'RESTful API for agent execution',
    icon: 'api',
    docsUrl: '/docs/integrations/rest-api',
  },
  {
    id: 'sdk-js',
    name: 'JavaScript SDK',
    description: 'NPM package for Node.js/Browser',
    icon: 'package',
    docsUrl: '/docs/integrations/javascript-sdk',
  },
  {
    id: 'sdk-python',
    name: 'Python SDK',
    description: 'PyPI package for Python apps',
    icon: 'package',
    docsUrl: '/docs/integrations/python-sdk',
  },
  {
    id: 'n8n',
    name: 'n8n Integration',
    description: 'Custom nodes for n8n workflows',
    icon: 'workflow',
    docsUrl: '/docs/integrations/n8n',
  },
];

// Revenue Share
export const REVENUE_SHARE = {
  seller: 70,
  platform: 30,
};

// Agent Status
export const AGENT_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
};

// Marketplace Categories
export const MARKETPLACE_CATEGORIES = [
  { id: 'all', name: 'All Agents' },
  { id: 'featured', name: 'Featured' },
  { id: 'popular', name: 'Most Popular' },
  { id: 'new', name: 'New Arrivals' },
  { id: 'free', name: 'Free Agents' },
  ...INDUSTRIES,
];

// Rubric Types
export const RUBRIC_TYPES = {
  DEFAULT: 'default',
  CUSTOM: 'custom',
};

// Workflow Node Types
export const WORKFLOW_NODE_TYPES = {
  AGENT: 'agent',
  CONDITION: 'condition',
  DELAY: 'delay',
  WEBHOOK: 'webhook',
  TRANSFORM: 'transform',
};
