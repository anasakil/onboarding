// Lead Types
export const LEAD_TYPES = [
  {
    value: 'new_client',
    label: 'New Client',
    description: 'First-time client looking for our services',
    icon: 'UserPlus',
  },
  {
    value: 'existing_client',
    label: 'Existing Client',
    description: 'Returning client with a new project',
    icon: 'Users',
  },
  {
    value: 'referral',
    label: 'Referral',
    description: 'Referred by an existing client or partner',
    icon: 'Share2',
  },
] as const

// Company Types
export const COMPANY_TYPES = [
  'Startup',
  'Small Business',
  'Agency',
  'E-commerce',
  'SaaS',
  'Enterprise',
  'Non-profit',
  'Freelancer',
  'Other',
] as const

// Industries
export const INDUSTRIES = [
  'Technology',
  'E-commerce',
  'Healthcare',
  'Finance',
  'Education',
  'Real Estate',
  'Marketing',
  'Manufacturing',
  'Hospitality',
  'Retail',
  'Media & Entertainment',
  'Professional Services',
  'Other',
] as const

// Company Sizes
export const COMPANY_SIZES = [
  { value: 'solo', label: 'Solo (1 person)' },
  { value: 'small', label: 'Small (2-10 employees)' },
  { value: 'medium', label: 'Medium (11-50 employees)' },
  { value: 'large', label: 'Large (51-200 employees)' },
  { value: 'enterprise', label: 'Enterprise (200+ employees)' },
] as const

// Services
export const SERVICES = [
  { value: 'website_development', label: 'Website Development', category: 'Development' },
  { value: 'ecommerce', label: 'E-commerce Store', category: 'Development' },
  { value: 'mobile_app', label: 'Mobile App', category: 'Development' },
  { value: 'seo', label: 'SEO Optimization', category: 'Marketing' },
  { value: 'social_media', label: 'Social Media Marketing', category: 'Marketing' },
  { value: 'content_marketing', label: 'Content Marketing', category: 'Marketing' },
  { value: 'branding', label: 'Brand Identity', category: 'Branding' },
  { value: 'ui_ux', label: 'UI/UX Design', category: 'Design' },
  { value: 'ai_automation', label: 'AI/Automation', category: 'Technology' },
  { value: 'saas', label: 'SaaS Development', category: 'Technology' },
] as const

// Goals
export const GOALS = [
  { value: 'growth', label: 'Grow Revenue', icon: 'TrendingUp' },
  { value: 'automation', label: 'Automate Processes', icon: 'Zap' },
  { value: 'rebrand', label: 'Rebrand/Refresh', icon: 'Palette' },
  { value: 'launch', label: 'Launch New Product', icon: 'Rocket' },
  { value: 'scale', label: 'Scale Operations', icon: 'Expand' },
  { value: 'leads', label: 'Generate More Leads', icon: 'Target' },
  { value: 'presence', label: 'Improve Online Presence', icon: 'Globe' },
  { value: 'efficiency', label: 'Increase Efficiency', icon: 'Clock' },
] as const

// Budget Ranges
export const BUDGET_RANGES = [
  { value: 'under_1500', label: 'Under €1,500' },
  { value: '1500_5000', label: '€1,500 - €5,000' },
  { value: '5000_10000', label: '€5,000 - €10,000' },
  { value: '10000_25000', label: '€10,000 - €25,000' },
  { value: '25000_50000', label: '€25,000 - €50,000' },
  { value: 'over_50000', label: 'Over €50,000' },
] as const

// Urgency Levels
export const URGENCY_LEVELS = [
  { value: 'low', label: 'Low', description: 'No rush, planning ahead' },
  { value: 'medium', label: 'Medium', description: 'Within 2-3 months' },
  { value: 'high', label: 'High', description: 'Within 1 month' },
  { value: 'urgent', label: 'Urgent', description: 'ASAP / Within 2 weeks' },
] as const

// Decision Power
export const DECISION_POWER = [
  { value: 'decision_maker', label: 'Decision Maker', description: 'Can approve the project' },
  { value: 'influencer', label: 'Influencer', description: 'Can recommend but needs approval' },
  { value: 'researcher', label: 'Researcher', description: 'Gathering information' },
] as const

// Lead Sources
export const LEAD_SOURCES = [
  { value: 'search_engine', label: 'Search engines (Google, Bing, etc.)' },
  { value: 'social_media', label: 'Social media (LinkedIn, Instagram, etc.)' },
  { value: 'referral', label: 'Referral from existing client' },
  { value: 'word_of_mouth', label: 'Word of mouth' },
  { value: 'event', label: 'Event or conference' },
  { value: 'advertising', label: 'Online advertising' },
  { value: 'content', label: 'Blog post or article' },
  { value: 'other', label: 'Other' },
] as const

// Lead Statuses
export const LEAD_STATUSES = [
  { value: 'draft', label: 'Draft', color: 'secondary' },
  { value: 'new', label: 'New', color: 'info' },
  { value: 'qualified', label: 'Qualified', color: 'primary' },
  { value: 'assigned', label: 'Assigned', color: 'warning' },
  { value: 'proposal', label: 'Proposal', color: 'secondary' },
  { value: 'won', label: 'Won', color: 'success' },
  { value: 'lost', label: 'Lost', color: 'destructive' },
] as const
