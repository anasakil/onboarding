import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IContact extends Document {
  _id: mongoose.Types.ObjectId
  companyId: mongoose.Types.ObjectId
  name: string
  email: string
  phone?: string
  position?: string
  isPrimary: boolean
  createdAt: Date
  updatedAt: Date
}

const ContactSchema = new Schema<IContact>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes
ContactSchema.index({ companyId: 1 })
ContactSchema.index({ email: 1 })

export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema)
