import mongoose from 'mongoose'
import { config } from 'dotenv'

config({ path: '.env' })

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/onboarding'

// Service schema inline for seeding
const FormFieldSchema = new mongoose.Schema({
  name: String,
  label: String,
  type: String,
  placeholder: String,
  required: Boolean,
  options: [String],
  step: Number,
  order: Number,
})

const StepSchema = new mongoose.Schema({
  title: String,
  description: String,
  order: Number,
  layout: { type: String, enum: ['with-image', 'two-column'], default: 'with-image' },
})

const ServiceSchema = new mongoose.Schema({
  name: String,
  slug: String,
  category: String,
  description: String,
  icon: String,
  color: String,
  isActive: Boolean,
  steps: [StepSchema],
  fields: [FormFieldSchema],
}, { timestamps: true })

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema)

// ============================================
// BLOGGING SERVICE - Complete with all details
// ============================================
const bloggingService = {
  name: 'Professional Blogging Service',
  slug: 'blogging',
  category: 'Content & Marketing',
  description: 'Professional blog content creation, strategy, and management to grow your online presence and engage your audience.',
  icon: 'PenTool',
  color: '#8B5CF6',
  isActive: true,
  steps: [
    { title: 'Company Info', description: 'Tell us about your business', order: 1, layout: 'with-image' },
    { title: 'Contact Details', description: 'Your contact information', order: 2, layout: 'with-image' },
    { title: 'Blog Goals', description: 'What do you want to achieve?', order: 3, layout: 'two-column' },
    { title: 'Content Style', description: 'Your preferences', order: 4, layout: 'two-column' },
    { title: 'Budget & Timeline', description: 'Investment and schedule', order: 5, layout: 'two-column' },
  ],
  fields: [
    // ============================================
    // STEP 1: Company Information
    // ============================================
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      placeholder: 'Enter your company name',
      required: true,
      step: 1,
      order: 1,
    },
    {
      name: 'industry',
      label: 'Industry / Sector',
      type: 'select',
      placeholder: 'Select your industry',
      required: true,
      step: 1,
      order: 2,
      options: [
        'Technology & Software',
        'E-commerce & Retail',
        'Healthcare & Medical',
        'Finance & Banking',
        'Education & Training',
        'Real Estate',
        'Travel & Hospitality',
        'Food & Restaurant',
        'Fashion & Beauty',
        'Fitness & Wellness',
        'Legal Services',
        'Marketing & Advertising',
        'Manufacturing',
        'Non-profit',
        'Entertainment & Media',
        'Other',
      ],
    },
    {
      name: 'companySize',
      label: 'Company Size',
      type: 'select',
      placeholder: 'Select company size',
      required: true,
      step: 1,
      order: 3,
      options: [
        'Solo / Freelancer',
        '2-10 employees',
        '11-50 employees',
        '51-200 employees',
        '201-500 employees',
        '500+ employees',
      ],
    },
    {
      name: 'website',
      label: 'Current Website',
      type: 'url',
      placeholder: 'https://yourwebsite.com',
      required: false,
      step: 1,
      order: 4,
    },
    {
      name: 'existingBlog',
      label: 'Do you have an existing blog?',
      type: 'select',
      placeholder: 'Select an option',
      required: true,
      step: 1,
      order: 5,
      options: [
        'Yes, actively publishing',
        'Yes, but not active',
        'No, starting fresh',
        'Planning to migrate',
      ],
    },

    // ============================================
    // STEP 2: Primary Contact
    // ============================================
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      required: true,
      step: 2,
      order: 1,
    },
    {
      name: 'jobTitle',
      label: 'Job Title / Position',
      type: 'text',
      placeholder: 'e.g. Marketing Manager',
      required: true,
      step: 2,
      order: 2,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'your@email.com',
      required: true,
      step: 2,
      order: 3,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'phone',
      placeholder: '+1 (555) 000-0000',
      required: true,
      step: 2,
      order: 4,
    },
    {
      name: 'preferredContact',
      label: 'Preferred Contact Method',
      type: 'select',
      placeholder: 'How should we reach you?',
      required: true,
      step: 2,
      order: 5,
      options: [
        'Email',
        'Phone Call',
        'Video Call (Zoom/Meet)',
        'WhatsApp',
        'Slack',
      ],
    },

    // ============================================
    // STEP 3: Blog Goals & Topics
    // ============================================
    {
      name: 'blogGoals',
      label: 'What are your main blogging goals?',
      type: 'multiselect',
      placeholder: 'Select all that apply',
      required: true,
      step: 3,
      order: 1,
      options: [
        'Increase website traffic',
        'Generate leads',
        'Build brand awareness',
        'Establish thought leadership',
        'Improve SEO rankings',
        'Educate customers',
        'Support sales process',
        'Build community',
      ],
    },
    {
      name: 'targetAudience',
      label: 'Who is your target audience?',
      type: 'textarea',
      placeholder: 'Describe your ideal readers (age, profession, interests, pain points)',
      required: true,
      step: 3,
      order: 2,
    },
    {
      name: 'mainTopics',
      label: 'Main topics you want to cover',
      type: 'textarea',
      placeholder: 'List the main topics or themes for your blog content',
      required: true,
      step: 3,
      order: 3,
    },
    {
      name: 'contentTypes',
      label: 'Types of content you need',
      type: 'multiselect',
      placeholder: 'Select content types',
      required: true,
      step: 3,
      order: 4,
      options: [
        'How-to guides & tutorials',
        'Industry news & trends',
        'Case studies',
        'Product reviews',
        'Interviews & Q&As',
        'Listicles (Top 10, Best of)',
        'Opinion pieces',
        'Research & data posts',
        'Customer success stories',
      ],
    },
    {
      name: 'competitors',
      label: 'Competitor blogs you admire (optional)',
      type: 'textarea',
      placeholder: 'Share URLs or names of blogs you like',
      required: false,
      step: 3,
      order: 5,
    },

    // ============================================
    // STEP 4: Content Preferences
    // ============================================
    {
      name: 'toneOfVoice',
      label: 'Preferred tone of voice',
      type: 'select',
      placeholder: 'Select your brand voice',
      required: true,
      step: 4,
      order: 1,
      options: [
        'Professional & Formal',
        'Friendly & Conversational',
        'Authoritative & Expert',
        'Casual & Fun',
        'Inspirational & Motivational',
        'Educational & Informative',
      ],
    },
    {
      name: 'articleLength',
      label: 'Preferred article length',
      type: 'select',
      placeholder: 'Select typical word count',
      required: true,
      step: 4,
      order: 2,
      options: [
        'Short (500-800 words)',
        'Medium (800-1,200 words)',
        'Long-form (1,200-2,000 words)',
        'In-depth (2,000+ words)',
        'Mix of lengths',
      ],
    },
    {
      name: 'publishingFrequency',
      label: 'How often do you want to publish?',
      type: 'select',
      placeholder: 'Select frequency',
      required: true,
      step: 4,
      order: 3,
      options: [
        '1 post per week',
        '2 posts per week',
        '3-4 posts per week',
        'Daily',
        '2-3 posts per month',
        '1 post per month',
      ],
    },
    {
      name: 'visualContent',
      label: 'Do you need visual content?',
      type: 'multiselect',
      placeholder: 'Select visual needs',
      required: true,
      step: 4,
      order: 4,
      options: [
        'Featured images',
        'Custom graphics',
        'Infographics',
        'Stock photos',
        'Screenshots & tutorials',
        'Video content',
        'No visuals needed',
      ],
    },
    {
      name: 'seoRequirements',
      label: 'SEO services needed',
      type: 'multiselect',
      placeholder: 'Select SEO services',
      required: true,
      step: 4,
      order: 5,
      options: [
        'Keyword research',
        'On-page SEO optimization',
        'Meta descriptions & titles',
        'Internal linking strategy',
        'Content audit',
        'Competitor analysis',
        'Not sure, need guidance',
      ],
    },

    // ============================================
    // STEP 5: Budget & Timeline
    // ============================================
    {
      name: 'monthlyBudget',
      label: 'Monthly content budget',
      type: 'select',
      placeholder: 'Select your budget range',
      required: true,
      step: 5,
      order: 1,
      options: [
        'Under $500/month',
        '$500 - $1,000/month',
        '$1,000 - $2,500/month',
        '$2,500 - $5,000/month',
        '$5,000 - $10,000/month',
        '$10,000+/month',
        'Need custom quote',
      ],
    },
    {
      name: 'startDate',
      label: 'When do you want to start?',
      type: 'select',
      placeholder: 'Select start timeframe',
      required: true,
      step: 5,
      order: 2,
      options: [
        'Immediately',
        'Within 1-2 weeks',
        'Within 1 month',
        'Within 2-3 months',
        'Just exploring options',
      ],
    },
    {
      name: 'contractLength',
      label: 'Preferred engagement length',
      type: 'select',
      placeholder: 'Select contract preference',
      required: true,
      step: 5,
      order: 3,
      options: [
        'Month-to-month',
        '3-month commitment',
        '6-month commitment',
        '12-month commitment',
        'Project-based',
      ],
    },
    {
      name: 'decisionMaker',
      label: 'Are you the decision maker?',
      type: 'select',
      placeholder: 'Select your role',
      required: true,
      step: 5,
      order: 4,
      options: [
        'Yes, I make the final decision',
        'Yes, with team approval',
        'No, researching for someone else',
        'Part of a committee decision',
      ],
    },
    {
      name: 'additionalNotes',
      label: 'Anything else we should know?',
      type: 'textarea',
      placeholder: 'Share any additional requirements or questions...',
      required: false,
      step: 5,
      order: 5,
    },
  ],
}

async function seedServices() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Delete all existing services
    await Service.deleteMany({})
    console.log('Cleared all existing services')

    // Create blogging service
    const service = await Service.create(bloggingService)
    console.log(`\nCreated: ${service.name}`)
    console.log(`  - Steps: ${service.steps.length}`)
    console.log(`  - Fields: ${service.fields.length}`)

    console.log('\n✅ Blogging service seeded successfully!')
    console.log(`\n🔗 Access at: /onboarding/blogging`)

  } catch (error) {
    console.error('Error seeding services:', error)
  } finally {
    await mongoose.disconnect()
    console.log('\nDisconnected from MongoDB')
  }
}

seedServices()
