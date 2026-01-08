// Lead Types
export const LEAD_TYPES = [
  {
    value: 'new_client',
    label: { en: 'New Client', it: 'Nuovo Cliente' },
    description: { en: 'First-time client looking for our services', it: 'Primo contatto, cerca i nostri servizi' },
    icon: 'UserPlus',
  },
  {
    value: 'existing_client',
    label: { en: 'Existing Client', it: 'Cliente Esistente' },
    description: { en: 'Returning client with a new project', it: 'Cliente ricorrente con un nuovo progetto' },
    icon: 'Users',
  },
  {
    value: 'referral',
    label: { en: 'Referral', it: 'Referral' },
    description: { en: 'Referred by an existing client or partner', it: 'Segnalato da un cliente o partner' },
    icon: 'Share2',
  },
] as const

// Company Types
export const COMPANY_TYPES = [
  { value: 'Startup', label: { en: 'Startup', it: 'Startup' } },
  { value: 'Small Business', label: { en: 'Small Business', it: 'Piccola Impresa' } },
  { value: 'Agency', label: { en: 'Agency', it: 'Agenzia' } },
  { value: 'E-commerce', label: { en: 'E-commerce', it: 'E-commerce' } },
  { value: 'SaaS', label: { en: 'SaaS', it: 'SaaS' } },
  { value: 'Enterprise', label: { en: 'Enterprise', it: 'Grande Impresa' } },
  { value: 'Non-profit', label: { en: 'Non-profit', it: 'Non-profit' } },
  { value: 'Freelancer', label: { en: 'Freelancer', it: 'Freelancer' } },
  { value: 'Other', label: { en: 'Other', it: 'Altro' } },
] as const

// Industries
export const INDUSTRIES = [
  { value: 'Technology', label: { en: 'Technology', it: 'Tecnologia' } },
  { value: 'E-commerce', label: { en: 'E-commerce', it: 'E-commerce' } },
  { value: 'Healthcare', label: { en: 'Healthcare', it: 'Sanità' } },
  { value: 'Finance', label: { en: 'Finance', it: 'Finanza' } },
  { value: 'Education', label: { en: 'Education', it: 'Istruzione' } },
  { value: 'Real Estate', label: { en: 'Real Estate', it: 'Immobiliare' } },
  { value: 'Marketing', label: { en: 'Marketing', it: 'Marketing' } },
  { value: 'Manufacturing', label: { en: 'Manufacturing', it: 'Manifatturiero' } },
  { value: 'Hospitality', label: { en: 'Hospitality', it: 'Ospitalità' } },
  { value: 'Retail', label: { en: 'Retail', it: 'Vendita al dettaglio' } },
  { value: 'Media & Entertainment', label: { en: 'Media & Entertainment', it: 'Media & Intrattenimento' } },
  { value: 'Professional Services', label: { en: 'Professional Services', it: 'Servizi Professionali' } },
  { value: 'Other', label: { en: 'Other', it: 'Altro' } },
] as const

// Company Sizes
export const COMPANY_SIZES = [
  { value: 'solo', label: { en: 'Solo (1 person)', it: 'Solo (1 persona)' } },
  { value: 'small', label: { en: 'Small (2-10 employees)', it: 'Piccola (2-10 dipendenti)' } },
  { value: 'medium', label: { en: 'Medium (11-50 employees)', it: 'Media (11-50 dipendenti)' } },
  { value: 'large', label: { en: 'Large (51-200 employees)', it: 'Grande (51-200 dipendenti)' } },
  { value: 'enterprise', label: { en: 'Enterprise (200+ employees)', it: 'Enterprise (200+ dipendenti)' } },
] as const

// Services
export const SERVICES = [
  { value: 'website_development', label: { en: 'Website Development', it: 'Sviluppo Siti Web' }, category: 'Development' },
  { value: 'ecommerce', label: { en: 'E-commerce Store', it: 'E-commerce' }, category: 'Development' },
  { value: 'mobile_app', label: { en: 'Mobile App', it: 'App Mobile' }, category: 'Development' },
  { value: 'seo', label: { en: 'SEO Optimization', it: 'Ottimizzazione SEO' }, category: 'Marketing' },
  { value: 'social_media', label: { en: 'Social Media Marketing', it: 'Social Media Marketing' }, category: 'Marketing' },
  { value: 'content_marketing', label: { en: 'Content Marketing', it: 'Content Marketing' }, category: 'Marketing' },
  { value: 'branding', label: { en: 'Brand Identity', it: 'Brand Identity' }, category: 'Branding' },
  { value: 'ui_ux', label: { en: 'UI/UX Design', it: 'Design UI/UX' }, category: 'Design' },
  { value: 'ai_automation', label: { en: 'AI/Automation', it: 'AI/Automazione' }, category: 'Technology' },
  { value: 'saas', label: { en: 'SaaS Development', it: 'Sviluppo SaaS' }, category: 'Technology' },
] as const

// Goals
export const GOALS = [
  { value: 'growth', label: { en: 'Grow Revenue', it: 'Aumentare Entrate' }, icon: 'TrendingUp' },
  { value: 'automation', label: { en: 'Automate Processes', it: 'Automatizzare Processi' }, icon: 'Zap' },
  { value: 'rebrand', label: { en: 'Rebrand/Refresh', it: 'Rebranding' }, icon: 'Palette' },
  { value: 'launch', label: { en: 'Launch New Product', it: 'Lanciare Nuovo Prodotto' }, icon: 'Rocket' },
  { value: 'scale', label: { en: 'Scale Operations', it: 'Scalare Operazioni' }, icon: 'Expand' },
  { value: 'leads', label: { en: 'Generate More Leads', it: 'Generare Più Lead' }, icon: 'Target' },
  { value: 'presence', label: { en: 'Improve Online Presence', it: 'Migliorare Presenza Online' }, icon: 'Globe' },
  { value: 'efficiency', label: { en: 'Increase Efficiency', it: 'Aumentare Efficienza' }, icon: 'Clock' },
] as const

// Budget Ranges
export const BUDGET_RANGES = [
  { value: 'under_1500', label: { en: 'Under €1,500', it: '< €1,500' } },
  { value: '1500_5000', label: { en: '€1,500 - €5,000', it: '€1,500 - €5,000' } },
  { value: '5000_10000', label: { en: '€5,000 - €10,000', it: '€5,000 - €10,000' } },
  { value: '10000_25000', label: { en: '€10,000 - €25,000', it: '€10,000 - €25,000' } },
  { value: '25000_50000', label: { en: '€25,000 - €50,000', it: '€25,000 - €50,000' } },
  { value: 'over_50000', label: { en: 'Over €50,000', it: '> €50,000' } },
] as const

// Urgency Levels
export const URGENCY_LEVELS = [
  { value: 'low', label: { en: 'Low', it: 'Bassa' }, description: { en: 'No rush, planning ahead', it: 'Nessuna fretta, pianificazione' } },
  { value: 'medium', label: { en: 'Medium', it: 'Media' }, description: { en: 'Within 2-3 months', it: 'Entro 2-3 mesi' } },
  { value: 'high', label: { en: 'High', it: 'Alta' }, description: { en: 'Within 1 month', it: 'Entro 1 mese' } },
  { value: 'urgent', label: { en: 'Urgent', it: 'Urgente' }, description: { en: 'ASAP / Within 2 weeks', it: 'Subito / Entro 2 settimane' } },
] as const

// Decision Power
export const DECISION_POWER = [
  { value: 'decision_maker', label: { en: 'Decision Maker', it: 'Decision Maker' }, description: { en: 'Can approve the project', it: 'Può approvare il progetto' } },
  { value: 'influencer', label: { en: 'Influencer', it: 'Influencer' }, description: { en: 'Can recommend but needs approval', it: 'Può raccomandare ma serve approvazione' } },
  { value: 'researcher', label: { en: 'Researcher', it: 'Ricercatore' }, description: { en: 'Gathering information', it: 'Raccolta informazioni' } },
] as const

// Lead Sources
export const LEAD_SOURCES = [
  { value: 'search_engine', label: { en: 'Search engines (Google, Bing, etc.)', it: 'Motori di ricerca (Google, Bing, ecc.)' } },
  { value: 'social_media', label: { en: 'Social media (LinkedIn, Instagram, etc.)', it: 'Social media (LinkedIn, Instagram, ecc.)' } },
  { value: 'referral', label: { en: 'Referral from existing client', it: 'Referral da cliente esistente' } },
  { value: 'word_of_mouth', label: { en: 'Word of mouth', it: 'Passaparola' } },
  { value: 'event', label: { en: 'Event or conference', it: 'Evento o conferenza' } },
  { value: 'advertising', label: { en: 'Online advertising', it: 'Pubblicità online' } },
  { value: 'content', label: { en: 'Blog post or article', it: 'Blog post o articolo' } },
  { value: 'other', label: { en: 'Other', it: 'Altro' } },
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
