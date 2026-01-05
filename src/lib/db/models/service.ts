import mongoose, { Schema, Document, Model } from 'mongoose'

// Field types supported
export type FieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'number'
  | 'date'
  | 'url'
  | 'file'

export interface IFormField {
  _id?: mongoose.Types.ObjectId
  name: string
  label: string
  type: FieldType
  placeholder?: string
  required: boolean
  options?: string[] // For select, multiselect, radio, checkbox
  step: number // Which step this field belongs to
  order: number // Order within the step
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
}

export type StepLayout = 'with-image' | 'two-column'

export interface IStep {
  _id?: mongoose.Types.ObjectId
  title: string
  description?: string
  order: number
  layout?: StepLayout // 'with-image' = form + SVG, 'two-column' = full width two-column form
}

export interface IService extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  slug: string
  category: string
  description?: string
  icon?: string
  color?: string
  isActive: boolean
  steps: IStep[]
  fields: IFormField[]
  createdAt: Date
  updatedAt: Date
}

const FormFieldSchema = new Schema<IFormField>({
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: {
    type: String,
    enum: ['text', 'email', 'phone', 'textarea', 'select', 'multiselect', 'checkbox', 'radio', 'number', 'date', 'url', 'file'],
    default: 'text'
  },
  placeholder: String,
  required: { type: Boolean, default: false },
  options: [String],
  step: { type: Number, required: true, default: 1 },
  order: { type: Number, required: true, default: 0 },
  validation: {
    min: Number,
    max: Number,
    pattern: String,
    message: String,
  }
})

const StepSchema = new Schema<IStep>({
  title: { type: String, required: true },
  description: String,
  order: { type: Number, required: true },
  layout: { type: String, enum: ['with-image', 'two-column'], default: 'with-image' },
})

const ServiceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    description: String,
    icon: String,
    color: { type: String, default: '#6BBE4A' },
    isActive: {
      type: Boolean,
      default: true,
    },
    steps: [StepSchema],
    fields: [FormFieldSchema],
  },
  {
    timestamps: true,
  }
)

// Create indexes for faster queries
ServiceSchema.index({ slug: 1, isActive: 1 })  // Compound index for slug lookups
ServiceSchema.index({ isActive: 1, category: 1 })  // For filtered list queries
ServiceSchema.index({ category: 1 })

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema)
