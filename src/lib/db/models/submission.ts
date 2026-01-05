import mongoose, { Schema, Document, Model } from 'mongoose'

export type SubmissionStatus = 'pending' | 'reviewed' | 'contacted' | 'converted' | 'rejected'

export interface ISubmission extends Document {
  _id: mongoose.Types.ObjectId
  serviceId: mongoose.Types.ObjectId
  serviceName: string
  data: Record<string, any> // Dynamic form data
  status: SubmissionStatus
  notes?: string
  assignedTo?: mongoose.Types.ObjectId
  clientEmail?: string
  clientName?: string
  clientPhone?: string
  createdAt: Date
  updatedAt: Date
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'contacted', 'converted', 'rejected'],
      default: 'pending',
    },
    notes: String,
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    clientEmail: String,
    clientName: String,
    clientPhone: String,
  },
  {
    timestamps: true,
  }
)

// Create indexes
SubmissionSchema.index({ serviceId: 1 })
SubmissionSchema.index({ status: 1 })
SubmissionSchema.index({ createdAt: -1 })
SubmissionSchema.index({ clientEmail: 1 })

export const Submission: Model<ISubmission> =
  mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema)
