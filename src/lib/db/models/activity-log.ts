import mongoose, { Schema, Document, Model } from 'mongoose'

export type EntityType =
  | 'onboarding_request'
  | 'company'
  | 'contact'
  | 'service'
  | 'admin'

export type ActionType =
  | 'created'
  | 'updated'
  | 'deleted'
  | 'status_changed'
  | 'assigned'
  | 'note_added'
  | 'login'
  | 'logout'

export interface IActivityLog extends Document {
  _id: mongoose.Types.ObjectId
  entityType: EntityType
  entityId: mongoose.Types.ObjectId
  action: ActionType
  actorId: mongoose.Types.ObjectId
  message: string
  metadata?: Record<string, unknown>
  createdAt: Date
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    entityType: {
      type: String,
      enum: ['onboarding_request', 'company', 'contact', 'service', 'admin'],
      required: true,
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    action: {
      type: String,
      enum: [
        'created',
        'updated',
        'deleted',
        'status_changed',
        'assigned',
        'note_added',
        'login',
        'logout',
      ],
      required: true,
    },
    actorId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
)

// Create indexes
ActivityLogSchema.index({ entityType: 1, entityId: 1 })
ActivityLogSchema.index({ actorId: 1 })
ActivityLogSchema.index({ createdAt: -1 })

export const ActivityLog: Model<IActivityLog> =
  mongoose.models.ActivityLog ||
  mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema)
