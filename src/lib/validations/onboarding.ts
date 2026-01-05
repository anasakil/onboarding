import { z } from 'zod'

// Step 1: Lead Type
export const leadTypeSchema = z.object({
  leadType: z.enum(['new_client', 'existing_client', 'referral'], {
    required_error: 'Please select a lead type',
  }),
})

// Step 2: Company Information
export const companyInfoSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  companyType: z.string().min(1, 'Please select a company type'),
  industry: z.string().min(1, 'Please select an industry'),
  companySize: z.string().min(1, 'Please select company size'),
})

// Step 3: Services
export const servicesSchema = z.object({
  services: z.array(z.string()).min(1, 'Please select at least one service'),
})

// Step 4: Goals & Challenges
export const goalsSchema = z.object({
  goals: z.array(z.string()).min(1, 'Please select at least one goal'),
  challenges: z.string().optional(),
})

// Step 5: Budget & Timeline
export const budgetSchema = z.object({
  budgetRange: z.string().min(1, 'Please select a budget range'),
  urgency: z.enum(['low', 'medium', 'high', 'urgent']),
  timeline: z.string().optional(),
  decisionPower: z.enum(['decision_maker', 'influencer', 'researcher']).optional(),
})

// Step 6: Source & Contact
export const sourceSchema = z.object({
  source: z.array(z.string()).optional(),
  contactName: z.string().min(2, 'Contact name is required'),
  contactEmail: z.string().email('Please enter a valid email'),
  contactPhone: z.string().optional(),
  assignedTo: z.string().optional(),
})

// Full onboarding form schema
export const fullOnboardingSchema = leadTypeSchema
  .merge(companyInfoSchema)
  .merge(servicesSchema)
  .merge(goalsSchema)
  .merge(budgetSchema)
  .merge(sourceSchema)

export type LeadTypeFormData = z.infer<typeof leadTypeSchema>
export type CompanyInfoFormData = z.infer<typeof companyInfoSchema>
export type ServicesFormData = z.infer<typeof servicesSchema>
export type GoalsFormData = z.infer<typeof goalsSchema>
export type BudgetFormData = z.infer<typeof budgetSchema>
export type SourceFormData = z.infer<typeof sourceSchema>
export type FullOnboardingFormData = z.infer<typeof fullOnboardingSchema>
