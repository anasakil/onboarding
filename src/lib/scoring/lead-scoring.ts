import { PriorityLevel } from '@/lib/db/models'

interface LeadScoringInput {
  budgetRange: string
  urgency: 'low' | 'medium' | 'high' | 'urgent'
  services: string[]
  companySize?: string
  decisionPower?: 'decision_maker' | 'influencer' | 'researcher'
}

interface LeadScoringResult {
  score: number
  level: PriorityLevel
  breakdown: {
    budgetScore: number
    urgencyScore: number
    servicesScore: number
    companySizeScore: number
    decisionPowerScore: number
  }
}

// Budget ranges and their scores
const BUDGET_SCORES: Record<string, number> = {
  'under_1500': 10,
  '1500_5000': 25,
  '5000_10000': 40,
  '10000_25000': 60,
  '25000_50000': 80,
  'over_50000': 100,
}

// Urgency scores
const URGENCY_SCORES: Record<string, number> = {
  'low': 10,
  'medium': 30,
  'high': 60,
  'urgent': 100,
}

// Company size scores
const COMPANY_SIZE_SCORES: Record<string, number> = {
  'solo': 10,
  'small': 25,
  'medium': 50,
  'large': 75,
  'enterprise': 100,
}

// Decision power scores
const DECISION_POWER_SCORES: Record<string, number> = {
  'researcher': 20,
  'influencer': 50,
  'decision_maker': 100,
}

export function calculateLeadScore(input: LeadScoringInput): LeadScoringResult {
  // Budget score (weight: 35%)
  const budgetScore = BUDGET_SCORES[input.budgetRange] || 25
  const weightedBudget = budgetScore * 0.35

  // Urgency score (weight: 25%)
  const urgencyScore = URGENCY_SCORES[input.urgency] || 30
  const weightedUrgency = urgencyScore * 0.25

  // Services score (weight: 20%) - more services = higher value
  const servicesScore = Math.min(input.services.length * 20, 100)
  const weightedServices = servicesScore * 0.20

  // Company size score (weight: 10%)
  const companySizeScore = input.companySize
    ? COMPANY_SIZE_SCORES[input.companySize] || 25
    : 25
  const weightedCompanySize = companySizeScore * 0.10

  // Decision power score (weight: 10%)
  const decisionPowerScore = input.decisionPower
    ? DECISION_POWER_SCORES[input.decisionPower] || 50
    : 50
  const weightedDecisionPower = decisionPowerScore * 0.10

  // Calculate total score
  const totalScore = Math.round(
    weightedBudget +
    weightedUrgency +
    weightedServices +
    weightedCompanySize +
    weightedDecisionPower
  )

  // Determine priority level
  let level: PriorityLevel = 'low'
  if (totalScore >= 70) {
    level = 'high'
  } else if (totalScore >= 40) {
    level = 'medium'
  }

  return {
    score: totalScore,
    level,
    breakdown: {
      budgetScore,
      urgencyScore,
      servicesScore,
      companySizeScore,
      decisionPowerScore,
    },
  }
}

// Helper function to get score label
export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Hot Lead'
  if (score >= 60) return 'Warm Lead'
  if (score >= 40) return 'Qualified'
  if (score >= 20) return 'Nurturing'
  return 'Cold'
}

// Helper function to get priority badge color
export function getPriorityColor(level: PriorityLevel): string {
  switch (level) {
    case 'high':
      return 'success'
    case 'medium':
      return 'warning'
    case 'low':
      return 'secondary'
    default:
      return 'outline'
  }
}
