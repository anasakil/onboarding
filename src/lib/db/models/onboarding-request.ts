import mongoose, { Schema, Document, Model } from 'mongoose'

export type LeadStatus =
  | 'draft'
  | 'new'
  | 'qualified'
  | 'assigned'
  | 'proposal'
  | 'won'
  | 'lost'

export type PriorityLevel = 'low' | 'medium' | 'high'

export type LeadType = 'new_client' | 'existing_client' | 'referral'

export interface INote {
  content: string
  authorId: mongoose.Types.ObjectId
  createdAt: Date
}

export interface IOnboardingRequest extends Document {
  _id: mongoose.Types.ObjectId
  // Lead Type
  leadType: LeadType
  // Company & Contact
  companyId?: mongoose.Types.ObjectId
  contactId?: mongoose.Types.ObjectId
  // Temporary fields for wizard (before company/contact creation)
  companyName?: string
  companyType?: string
  industry?: string
  companySize?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  // Services
  services: string[]
  // Goals & Challenges
  goals: string[]
  challenges?: string
  // Budget & Timeline
  budgetRange: string
  urgency: 'low' | 'medium' | 'high' | 'urgent'
  timeline?: string
  decisionPower?: 'decision_maker' | 'influencer' | 'researcher'
  // Status & Priority
  status: LeadStatus
  priorityScore: number
  priorityLevel: PriorityLevel
  // Assignment
  assignedTo?: mongoose.Types.ObjectId
  createdBy: mongoose.Types.ObjectId
  // Source
  source?: string[]
  // Notes
  notes: INote[]
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

const NoteSchema = new Schema<INote>(
  {
    content: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
)

const OnboardingRequestSchema = new Schema<IOnboardingRequest>(
  {
    leadType: {
      type: String,
      enum: ['new_client', 'existing_client', 'referral'],
      required: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
    contactId: {
      type: Schema.Types.ObjectId,
      ref: 'Contact',
    },
    companyName: String,
    companyType: String,
    industry: String,
    companySize: String,
    contactName: String,
    contactEmail: String,
    contactPhone: String,
    services: [{
      type: String,
      required: true,
    }],
    goals: [{
      type: String,
    }],
    challenges: String,
    budgetRange: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    timeline: String,
    decisionPower: {
      type: String,
      enum: ['decision_maker', 'influencer', 'researcher'],
    },
    status: {
      type: String,
      enum: ['draft', 'new', 'qualified', 'assigned', 'proposal', 'won', 'lost'],
      default: 'new',
    },
    priorityScore: {
      type: Number,
      default: 0,
    },
    priorityLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    source: [{
      type: String,
    }],
    notes: [NoteSchema],
  },
  {
    timestamps: true,
  }
)

// Create indexes
OnboardingRequestSchema.index({ status: 1 })
OnboardingRequestSchema.index({ priorityScore: -1 })
OnboardingRequestSchema.index({ assignedTo: 1 })
OnboardingRequestSchema.index({ createdAt: -1 })
OnboardingRequestSchema.index({ companyId: 1 })

export const OnboardingRequest: Model<IOnboardingRequest> =
  mongoose.models.OnboardingRequest ||
  mongoose.model<IOnboardingRequest>('OnboardingRequest', OnboardingRequestSchema)
