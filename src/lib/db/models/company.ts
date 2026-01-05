import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICompany extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  industry: string
  size: 'solo' | 'small' | 'medium' | 'large' | 'enterprise'
  revenueRange?: string
  website?: string
  address?: string
  createdAt: Date
  updatedAt: Date
}

const CompanySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    industry: {
      type: String,
      required: [true, 'Industry is required'],
    },
    size: {
      type: String,
      enum: ['solo', 'small', 'medium', 'large', 'enterprise'],
      default: 'small',
    },
    revenueRange: {
      type: String,
    },
    website: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes
CompanySchema.index({ name: 'text' })
CompanySchema.index({ industry: 1 })

export const Company: Model<ICompany> =
  mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema)
