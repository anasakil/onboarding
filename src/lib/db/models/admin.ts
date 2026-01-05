import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IAdmin extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  password: string
  role: 'admin' | 'manager' | 'sales'
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'sales'],
      default: 'sales',
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Note: email index is already created by unique: true

export const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema)
