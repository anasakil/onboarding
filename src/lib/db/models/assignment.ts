import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IAssignment extends Document {
  _id: mongoose.Types.ObjectId
  onboardingId: mongoose.Types.ObjectId
  ownerId: mongoose.Types.ObjectId
  ruleApplied?: string
  assignedAt: Date
}

const AssignmentSchema = new Schema<IAssignment>(
  {
    onboardingId: {
      type: Schema.Types.ObjectId,
      ref: 'OnboardingRequest',
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    ruleApplied: {
      type: String,
    },
    assignedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
)

// Create indexes
AssignmentSchema.index({ onboardingId: 1 })
AssignmentSchema.index({ ownerId: 1 })

export const Assignment: Model<IAssignment> =
  mongoose.models.Assignment ||
  mongoose.model<IAssignment>('Assignment', AssignmentSchema)
