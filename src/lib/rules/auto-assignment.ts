import mongoose from 'mongoose'

interface AssignmentInput {
  budgetRange: string
  services: string[]
  priorityScore: number
}

interface AssignmentResult {
  assignedTo: mongoose.Types.ObjectId | null
  ruleApplied: string
  teamName: string
}

// Team assignments based on budget tiers
// In a real app, these would be fetched from the database
const TEAM_ASSIGNMENTS: Record<string, { rule: string; team: string }> = {
  'under_1500': {
    rule: 'budget_tier_1',
    team: 'Marketing Squad',
  },
  '1500_5000': {
    rule: 'budget_tier_2',
    team: 'Growth Squad',
  },
  '5000_10000': {
    rule: 'budget_tier_3',
    team: 'SEO Squad',
  },
  '10000_25000': {
    rule: 'budget_tier_4',
    team: 'Development Squad',
  },
  '25000_50000': {
    rule: 'budget_tier_5',
    team: 'SaaS Squad',
  },
  'over_50000': {
    rule: 'budget_tier_6',
    team: 'AI/Enterprise Squad',
  },
}

// Service-based routing (takes precedence if specific services are selected)
const SERVICE_ROUTING: Record<string, { rule: string; team: string }> = {
  'SaaS Development': {
    rule: 'service_saas',
    team: 'SaaS Squad',
  },
  'AI/Automation': {
    rule: 'service_ai',
    team: 'AI/Enterprise Squad',
  },
  'Mobile App': {
    rule: 'service_mobile',
    team: 'Development Squad',
  },
  'SEO Optimization': {
    rule: 'service_seo',
    team: 'SEO Squad',
  },
}

// High priority leads go to senior team
const HIGH_PRIORITY_THRESHOLD = 70

export function determineAssignment(input: AssignmentInput): AssignmentResult {
  // First, check if any high-value services are selected
  for (const service of input.services) {
    if (SERVICE_ROUTING[service]) {
      return {
        assignedTo: null, // Will be filled by the actual team member lookup
        ruleApplied: SERVICE_ROUTING[service].rule,
        teamName: SERVICE_ROUTING[service].team,
      }
    }
  }

  // High priority leads get special handling
  if (input.priorityScore >= HIGH_PRIORITY_THRESHOLD) {
    return {
      assignedTo: null,
      ruleApplied: 'high_priority_lead',
      teamName: 'Senior Team',
    }
  }

  // Default to budget-based assignment
  const budgetAssignment = TEAM_ASSIGNMENTS[input.budgetRange] || TEAM_ASSIGNMENTS['1500_5000']

  return {
    assignedTo: null,
    ruleApplied: budgetAssignment.rule,
    teamName: budgetAssignment.team,
  }
}

// Get suggested team members based on the assignment rule
export async function getSuggestedTeamMembers(
  teamName: string,
  Admin: mongoose.Model<any>
): Promise<any[]> {
  // In a real app, you would have a team membership model
  // For now, return all available team members
  const members = await Admin.find({
    role: { $in: ['manager', 'sales'] },
  }).select('_id name email role')

  return members
}

// Get all available assignment rules
export function getAssignmentRules(): { value: string; label: string; description: string }[] {
  return [
    { value: 'budget_tier_1', label: 'Budget < €1,500', description: 'Routes to Marketing Squad' },
    { value: 'budget_tier_2', label: 'Budget €1,500 - €5,000', description: 'Routes to Growth Squad' },
    { value: 'budget_tier_3', label: 'Budget €5,000 - €10,000', description: 'Routes to SEO Squad' },
    { value: 'budget_tier_4', label: 'Budget €10,000 - €25,000', description: 'Routes to Development Squad' },
    { value: 'budget_tier_5', label: 'Budget €25,000 - €50,000', description: 'Routes to SaaS Squad' },
    { value: 'budget_tier_6', label: 'Budget > €50,000', description: 'Routes to AI/Enterprise Squad' },
    { value: 'service_saas', label: 'SaaS Development', description: 'Routes to SaaS Squad' },
    { value: 'service_ai', label: 'AI/Automation', description: 'Routes to AI/Enterprise Squad' },
    { value: 'service_mobile', label: 'Mobile App', description: 'Routes to Development Squad' },
    { value: 'service_seo', label: 'SEO Optimization', description: 'Routes to SEO Squad' },
    { value: 'high_priority_lead', label: 'High Priority (Score 70+)', description: 'Routes to Senior Team' },
    { value: 'manual', label: 'Manual Assignment', description: 'Manually assigned by admin' },
  ]
}
