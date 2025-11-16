// Platform Branding & Constants for Aasim AI

export const PLATFORM = {
  name: 'Aasim AI',
  tagline: 'AI Precision. Human Control.',
  description: 'Enterprise-Ready Multimodal Agentic AI Platform',
  version: '2.0.0',
};

export const ENGINES = [
  {
    id: 'vision',
    name: 'Precision Vision Engine',
    shortName: 'Vision Engine',
    icon: '👁️',
    iconName: 'image',
    description: 'Advanced image and video analysis with custom rubrics',
    color: 'bg-blue-100',
    colorAccent: 'text-blue-600',
    category: 'Vision',
  },
  {
    id: 'audio',
    name: 'Precision Audio Engine',
    shortName: 'Audio Engine',
    icon: '🎵',
    iconName: 'mic',
    description: 'Audio quality, transcription, and compliance evaluation',
    color: 'bg-purple-100',
    colorAccent: 'text-purple-600',
    category: 'Audio',
  },
  {
    id: 'text',
    name: 'Precision Text Engine',
    shortName: 'Text Engine',
    icon: '📝',
    iconName: 'text_fields',
    description: 'NLP-powered text analysis with custom criteria',
    color: 'bg-green-100',
    colorAccent: 'text-green-600',
    category: 'Text',
  },
  {
    id: 'code',
    name: 'Precision Code Engine',
    shortName: 'Code Engine',
    icon: '💻',
    iconName: 'code',
    description: 'Automated code review and quality assessment',
    color: 'bg-yellow-100',
    colorAccent: 'text-yellow-600',
    category: 'Code',
  },
  {
    id: 'document',
    name: 'Precision Document Engine',
    shortName: 'Document Engine',
    icon: '📄',
    iconName: 'description',
    description: 'PDF, DOCX analysis and compliance checking',
    color: 'bg-red-100',
    colorAccent: 'text-red-600',
    category: 'Document',
  },
  {
    id: 'data',
    name: 'Precision Data Engine',
    shortName: 'Data Engine',
    icon: '📊',
    iconName: 'analytics',
    description: 'Structured data validation and quality checks',
    color: 'bg-indigo-100',
    colorAccent: 'text-indigo-600',
    category: 'Data',
  },
  {
    id: 'web',
    name: 'Precision Web Engine',
    shortName: 'Web Engine',
    icon: '🌐',
    iconName: 'language',
    description: 'Web scraping validation and content evaluation',
    color: 'bg-pink-100',
    colorAccent: 'text-pink-600',
    category: 'Web',
  },
];

export const HITL_MODES = [
  {
    id: 'full-auto',
    name: 'Full Auto',
    fullName: 'Fully AI-Driven',
    description: 'Complete automation with no human oversight',
    icon: '⚡',
    color: 'bg-green-500',
    badge: 'Fastest',
    riskLevel: 'low',
  },
  {
    id: 'spot-check',
    name: 'Spot Check',
    fullName: 'Spot Check Sampling',
    description: 'Random sampling for quality assurance',
    icon: '🎯',
    color: 'bg-blue-500',
    badge: 'Balanced',
    riskLevel: 'low-medium',
  },
  {
    id: 'threshold',
    name: 'Threshold',
    fullName: 'Confidence Threshold',
    description: 'Review when confidence falls below threshold',
    icon: '📊',
    color: 'bg-yellow-500',
    badge: 'Smart',
    riskLevel: 'medium',
  },
  {
    id: 'pre-approval',
    name: 'Pre-Approval',
    fullName: 'Pre-Approval Required',
    description: 'Approve all actions before execution',
    icon: '✋',
    color: 'bg-orange-500',
    badge: 'Safe',
    riskLevel: 'low',
  },
  {
    id: 'co-pilot',
    name: 'Co-Pilot',
    fullName: 'Human-AI Co-Pilot',
    description: 'Real-time collaboration with AI',
    icon: '🤝',
    color: 'bg-purple-500',
    badge: 'Interactive',
    riskLevel: 'very-low',
  },
];

export const INDUSTRIES = [
  'Healthcare',
  'Education',
  'HR & Recruitment',
  'Legal',
  'Real Estate',
  'Technology',
  'Finance & Banking',
  'Insurance',
  'Customer Service',
  'Logistics',
  'Public Sector',
  'Manufacturing',
  'Retail & E-commerce',
  'Construction',
  'Energy',
  'Marketing & Advertising',
];

export const AGENT_CATEGORIES = [
  'Support',
  'Analysis',
  'Analytics',
  'Automation',
  'Communication',
  'Data Processing',
  'Document Management',
  'Finance',
  'HR',
  'Legal',
  'Marketing',
  'Moderation',
  'Sales',
  'Security',
];

export const PRICING_TIERS = [
  { value: 'free', label: 'Free', min: 0, max: 0 },
  { value: 'under-100', label: 'Under $100', min: 1, max: 99 },
  { value: '100-300', label: '$100 - $300', min: 100, max: 300 },
  { value: 'over-300', label: 'Over $300', min: 301, max: Infinity },
];

export const USER_ROLES = [
  { value: 'viewer', label: 'Viewer', permissions: ['read'] },
  { value: 'member', label: 'Member', permissions: ['read', 'write'] },
  { value: 'admin', label: 'Admin', permissions: ['read', 'write', 'delete', 'manage'] },
  { value: 'owner', label: 'Owner', permissions: ['read', 'write', 'delete', 'manage', 'billing'] },
];

export const SUBSCRIPTION_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    features: ['5 Users', '10 GB Storage', 'Basic Support', '1 Agent Deployment'],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 49,
    features: ['25 Users', '100 GB Storage', 'Priority Support', '10 Agent Deployments', 'Custom Rubrics'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    features: ['Unlimited Users', '1 TB Storage', '24/7 Support', 'Unlimited Agents', 'Custom Rubrics', 'SSO', 'Advanced Analytics'],
  },
];

export const STATUS_VARIANTS = {
  active: 'success',
  inactive: 'default',
  maintenance: 'warning',
  error: 'danger',
  pending: 'info',
};

export const PRIORITY_VARIANTS = {
  low: 'default',
  medium: 'warning',
  high: 'danger',
  critical: 'danger',
};

export const FILE_SIZE_LIMITS = {
  image: 10 * 1024 * 1024, // 10MB
  video: 500 * 1024 * 1024, // 500MB
  audio: 50 * 1024 * 1024, // 50MB
  document: 25 * 1024 * 1024, // 25MB
  data: 100 * 1024 * 1024, // 100MB
};

export const SUPPORTED_FILE_TYPES = {
  image: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  video: ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
  audio: ['.mp3', '.wav', '.ogg', '.m4a', '.flac'],
  document: ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
  data: ['.csv', '.json', '.xml', '.xlsx', '.xls'],
  code: ['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.go', '.rs'],
};

export const NOTIFICATION_TYPES = {
  success: { icon: '✓', color: 'green' },
  error: { icon: '✗', color: 'red' },
  warning: { icon: '⚠', color: 'yellow' },
  info: { icon: 'ℹ', color: 'blue' },
};

export const REGIONS = [
  { value: 'us-east-1', label: 'US East (N. Virginia)', flag: '🇺🇸' },
  { value: 'us-west-2', label: 'US West (Oregon)', flag: '🇺🇸' },
  { value: 'eu-west-1', label: 'EU (Ireland)', flag: '🇪🇺' },
  { value: 'eu-central-1', label: 'EU (Frankfurt)', flag: '🇪🇺' },
  { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)', flag: '🌏' },
  { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)', flag: '🇯🇵' },
];

export const ENVIRONMENTS = [
  { value: 'development', label: 'Development', color: 'blue' },
  { value: 'staging', label: 'Staging', color: 'yellow' },
  { value: 'production', label: 'Production', color: 'green' },
];
