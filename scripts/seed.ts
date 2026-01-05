import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI not found in .env file')
  process.exit(1)
}

// Define schemas inline for the seed script
const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'manager', 'sales'], default: 'sales' },
}, { timestamps: true })

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
})

const ServiceSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  category: String,
  description: String,
  icon: String,
  color: String,
  isActive: { type: Boolean, default: true },
  steps: [StepSchema],
  fields: [FormFieldSchema],
}, { timestamps: true })

async function seed() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('Connected!')

    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)
    const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema)

    // Create admin user
    console.log('Creating admin user...')
    const hashedPassword = await bcrypt.hash('admin123', 12)

    await Admin.findOneAndUpdate(
      { email: 'admin@awesome.com' },
      {
        name: 'Admin User',
        email: 'admin@awesome.com',
        password: hashedPassword,
        role: 'admin',
      },
      { upsert: true, new: true }
    )
    console.log('Admin user created: admin@awesome.com / admin123')

    // Create sample team members
    const teamMembers = [
      { name: 'Sarah Marketing', email: 'sarah@awesome.com', role: 'manager' },
      { name: 'John Sales', email: 'john@awesome.com', role: 'sales' },
      { name: 'Emma Growth', email: 'emma@awesome.com', role: 'sales' },
    ]

    for (const member of teamMembers) {
      await Admin.findOneAndUpdate(
        { email: member.email },
        { ...member, password: hashedPassword },
        { upsert: true }
      )
    }
    console.log('Team members created')

    // Create services with dynamic form fields
    console.log('Creating services with form fields...')

    const services = [
      {
        name: 'Website Development',
        slug: 'website-development',
        category: 'Development',
        description: 'Custom website design and development for your business',
        icon: 'Globe',
        color: '#6BBE4A',
        steps: [
          { title: 'Basic Information', description: 'Tell us about yourself', order: 1 },
          { title: 'Project Details', description: 'What kind of website do you need?', order: 2 },
          { title: 'Budget & Timeline', description: 'Your budget and timeline expectations', order: 3 },
        ],
        fields: [
          { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true, step: 1, order: 1 },
          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true, step: 1, order: 2 },
          { name: 'phone', label: 'Phone Number', type: 'phone', placeholder: '+1 234 567 890', required: false, step: 1, order: 3 },
          { name: 'company', label: 'Company Name', type: 'text', placeholder: 'Your Company', required: false, step: 1, order: 4 },
          { name: 'websiteType', label: 'Type of Website', type: 'select', required: true, step: 2, order: 1, options: ['Business Website', 'E-commerce', 'Portfolio', 'Blog', 'Landing Page', 'Web Application'] },
          { name: 'features', label: 'Features Needed', type: 'multiselect', required: true, step: 2, order: 2, options: ['Contact Form', 'Blog', 'Payment Integration', 'User Accounts', 'Admin Dashboard', 'SEO Optimization', 'Mobile Responsive', 'Social Media Integration'] },
          { name: 'description', label: 'Project Description', type: 'textarea', placeholder: 'Describe your project requirements...', required: true, step: 2, order: 3 },
          { name: 'hasDesign', label: 'Do you have a design?', type: 'radio', required: true, step: 2, order: 4, options: ['Yes, I have a design', 'No, I need design help', 'I have some ideas'] },
          { name: 'budget', label: 'Budget Range', type: 'select', required: true, step: 3, order: 1, options: ['Under €1,000', '€1,000 - €3,000', '€3,000 - €5,000', '€5,000 - €10,000', '€10,000+'] },
          { name: 'timeline', label: 'Expected Timeline', type: 'select', required: true, step: 3, order: 2, options: ['ASAP', '1-2 weeks', '1 month', '2-3 months', 'Flexible'] },
          { name: 'additionalInfo', label: 'Additional Information', type: 'textarea', placeholder: 'Any other details you want to share...', required: false, step: 3, order: 3 },
        ],
      },
      {
        name: 'Digital Marketing',
        slug: 'digital-marketing',
        category: 'Marketing',
        description: 'Grow your business with targeted digital marketing campaigns',
        icon: 'TrendingUp',
        color: '#9B8AFB',
        steps: [
          { title: 'Contact Information', description: 'How can we reach you?', order: 1 },
          { title: 'Business Information', description: 'Tell us about your business', order: 2 },
          { title: 'Marketing Goals', description: 'What do you want to achieve?', order: 3 },
        ],
        fields: [
          { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true, step: 1, order: 1 },
          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true, step: 1, order: 2 },
          { name: 'phone', label: 'Phone Number', type: 'phone', placeholder: '+1 234 567 890', required: true, step: 1, order: 3 },
          { name: 'businessName', label: 'Business Name', type: 'text', placeholder: 'Your Business', required: true, step: 2, order: 1 },
          { name: 'industry', label: 'Industry', type: 'select', required: true, step: 2, order: 2, options: ['E-commerce', 'Healthcare', 'Finance', 'Technology', 'Education', 'Real Estate', 'Food & Restaurant', 'Other'] },
          { name: 'website', label: 'Current Website', type: 'url', placeholder: 'https://yourwebsite.com', required: false, step: 2, order: 3 },
          { name: 'services', label: 'Services Interested In', type: 'multiselect', required: true, step: 3, order: 1, options: ['SEO', 'Social Media Marketing', 'Google Ads', 'Facebook Ads', 'Email Marketing', 'Content Marketing', 'Influencer Marketing'] },
          { name: 'goals', label: 'Marketing Goals', type: 'multiselect', required: true, step: 3, order: 2, options: ['Increase Website Traffic', 'Generate Leads', 'Boost Sales', 'Brand Awareness', 'Customer Retention', 'Launch New Product'] },
          { name: 'budget', label: 'Monthly Budget', type: 'select', required: true, step: 3, order: 3, options: ['Under €500/month', '€500 - €1,000/month', '€1,000 - €3,000/month', '€3,000 - €5,000/month', '€5,000+/month'] },
          { name: 'message', label: 'Tell us more about your goals', type: 'textarea', placeholder: 'What challenges are you facing? What do you want to achieve?', required: false, step: 3, order: 4 },
        ],
      },
      {
        name: 'Email Marketing',
        slug: 'mailing',
        category: 'Marketing',
        description: 'Engage your audience with effective email campaigns and automation',
        icon: 'Mail',
        color: '#F59E0B',
        steps: [
          { title: 'Contact Information', description: 'Tell us how to reach you', order: 1, layout: 'with-image' },
          { title: 'Business Details', description: 'About your company and products', order: 2, layout: 'with-image' },
          { title: 'Target Audience', description: 'Who are you trying to reach?', order: 3, layout: 'two-column' },
          { title: 'Current Email Setup', description: 'Your existing email infrastructure', order: 4, layout: 'two-column' },
          { title: 'Email Strategy & Goals', description: 'What do you want to achieve?', order: 5, layout: 'two-column' },
          { title: 'Campaign Requirements', description: 'Types of emails and automation', order: 6, layout: 'two-column' },
          { title: 'Segmentation & Personalization', description: 'Targeting and customization needs', order: 7, layout: 'two-column' },
          { title: 'Budget & Timeline', description: 'Investment and schedule', order: 8, layout: 'two-column' },
        ],
        fields: [
          // Step 1: Contact Information (4 fields)
          { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true, step: 1, order: 1 },
          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true, step: 1, order: 2 },
          { name: 'phone', label: 'Phone Number', type: 'phone', placeholder: '+1 234 567 890', required: false, step: 1, order: 3 },
          { name: 'jobTitle', label: 'Job Title / Role', type: 'text', placeholder: 'Marketing Manager', required: false, step: 1, order: 4 },

          // Step 2: Business Details (8 fields)
          { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Your Company', required: true, step: 2, order: 1 },
          { name: 'website', label: 'Website URL', type: 'url', placeholder: 'https://yourcompany.com', required: false, step: 2, order: 2 },
          { name: 'industry', label: 'Industry', type: 'select', required: true, step: 2, order: 3, options: ['E-commerce / Retail', 'SaaS / Technology', 'Healthcare / Medical', 'Finance / Banking / Insurance', 'Education / E-learning', 'Real Estate', 'Travel / Hospitality', 'Food & Beverage', 'Professional Services', 'Manufacturing', 'Media / Entertainment', 'Non-profit / NGO', 'Fitness / Wellness', 'Automotive', 'Legal Services', 'Other'] },
          { name: 'companySize', label: 'Company Size', type: 'select', required: true, step: 2, order: 4, options: ['Solo / Freelancer', '2-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '500-1000 employees', '1000+ employees'] },
          { name: 'businessModel', label: 'Business Model', type: 'select', required: true, step: 2, order: 5, options: ['B2B (Business to Business)', 'B2C (Business to Consumer)', 'B2B2C (Both)', 'D2C (Direct to Consumer)', 'E-commerce', 'SaaS / Subscription', 'Marketplace', 'Service-based', 'Non-profit'] },
          { name: 'productsServices', label: 'Main Products / Services', type: 'textarea', placeholder: 'Briefly describe what you sell or offer...', required: true, step: 2, order: 6 },
          { name: 'averageOrderValue', label: 'Average Order / Deal Value', type: 'select', required: false, step: 2, order: 7, options: ['Under $50', '$50 - $100', '$100 - $250', '$250 - $500', '$500 - $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000+', 'Varies significantly', 'Not applicable'] },
          { name: 'salesCycle', label: 'Typical Sales Cycle', type: 'select', required: false, step: 2, order: 8, options: ['Immediate (same day)', 'Short (1-7 days)', 'Medium (1-4 weeks)', 'Long (1-3 months)', 'Very long (3+ months)', 'Varies by product/service'] },

          // Step 3: Target Audience (10 fields)
          { name: 'targetAudienceType', label: 'Primary Audience Type', type: 'select', required: true, step: 3, order: 1, options: ['Individual Consumers', 'Small Business Owners', 'Enterprise Decision Makers', 'Startup Founders', 'Marketing Professionals', 'IT / Technical Professionals', 'HR / People Operations', 'Finance / Accounting', 'Healthcare Professionals', 'Educators / Students', 'C-Suite Executives', 'Other'] },
          { name: 'audienceAge', label: 'Audience Age Range', type: 'multiselect', required: true, step: 3, order: 2, options: ['18-24 (Gen Z)', '25-34 (Millennials)', '35-44 (Millennials/Gen X)', '45-54 (Gen X)', '55-64 (Boomers)', '65+ (Seniors)', 'All ages', 'Not applicable (B2B)'] },
          { name: 'audienceGender', label: 'Primary Gender', type: 'select', required: false, step: 3, order: 3, options: ['Predominantly Male', 'Predominantly Female', 'Balanced / Both', 'Not relevant'] },
          { name: 'audienceGeography', label: 'Geographic Focus', type: 'multiselect', required: true, step: 3, order: 4, options: ['United States', 'Canada', 'United Kingdom', 'Europe (EU)', 'Australia / New Zealand', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa', 'Global / Worldwide'] },
          { name: 'audienceIncome', label: 'Income / Budget Level (B2C)', type: 'select', required: false, step: 3, order: 5, options: ['Not applicable (B2B)', 'Budget-conscious', 'Mid-market', 'Premium / Luxury', 'Mixed / Varies'] },
          { name: 'audiencePainPoints', label: 'Audience Pain Points', type: 'textarea', placeholder: 'What problems do your subscribers face that you solve?', required: true, step: 3, order: 6 },
          { name: 'audienceMotivations', label: 'What Motivates Them to Buy?', type: 'textarea', placeholder: 'What triggers a purchase decision?', required: false, step: 3, order: 7 },
          { name: 'customerJourney', label: 'Customer Journey Stages', type: 'multiselect', required: true, step: 3, order: 8, options: ['Awareness (just discovered you)', 'Consideration (comparing options)', 'Decision (ready to buy)', 'Retention (existing customers)', 'Advocacy (loyal fans)', 'Win-back (lapsed customers)'] },
          { name: 'buyerPersonas', label: 'Do You Have Buyer Personas?', type: 'radio', required: true, step: 3, order: 9, options: ['Yes, detailed personas', 'Basic understanding only', 'No, need help creating', 'Not sure'] },
          { name: 'personaDescription', label: 'Describe Your Ideal Subscriber', type: 'textarea', placeholder: 'Who is your ideal email subscriber? Their role, goals, challenges...', required: false, step: 3, order: 10 },

          // Step 4: Current Email Setup (12 fields)
          { name: 'currentPlatform', label: 'Current Email Platform', type: 'select', required: true, step: 4, order: 1, options: ['None / Not using one', 'Mailchimp', 'Klaviyo', 'ConvertKit', 'HubSpot', 'ActiveCampaign', 'Constant Contact', 'Brevo (Sendinblue)', 'Campaign Monitor', 'Drip', 'AWeber', 'GetResponse', 'Omnisend', 'MailerLite', 'Salesforce Marketing Cloud', 'Marketo', 'Pardot', 'Iterable', 'Customer.io', 'Intercom', 'Other'] },
          { name: 'platformSatisfaction', label: 'Platform Satisfaction', type: 'select', required: false, step: 4, order: 2, options: ['Not using any', 'Very satisfied', 'Somewhat satisfied', 'Neutral', 'Somewhat dissatisfied', 'Very dissatisfied - want to switch'] },
          { name: 'listSize', label: 'Current Email List Size', type: 'select', required: true, step: 4, order: 3, options: ['No list yet', 'Under 500', '500 - 1,000', '1,000 - 2,500', '2,500 - 5,000', '5,000 - 10,000', '10,000 - 25,000', '25,000 - 50,000', '50,000 - 100,000', '100,000 - 250,000', '250,000 - 500,000', '500,000+'] },
          { name: 'listGrowthRate', label: 'Monthly List Growth', type: 'select', required: false, step: 4, order: 4, options: ['Not tracking', 'Shrinking', 'Stagnant (no growth)', 'Slow (< 2%)', 'Moderate (2-5%)', 'Good (5-10%)', 'Excellent (10%+)'] },
          { name: 'listSource', label: 'Primary List Sources', type: 'multiselect', required: true, step: 4, order: 5, options: ['Website signup forms', 'Lead magnets / Content offers', 'Checkout / Purchase', 'Social media', 'Events / Webinars', 'Paid advertising', 'Partner / Co-marketing', 'Referrals', 'Purchased lists', 'In-store / Offline', 'Other'] },
          { name: 'currentOpenRate', label: 'Average Open Rate', type: 'select', required: false, step: 4, order: 6, options: ['Not tracking / No data', 'Under 10%', '10% - 15%', '15% - 20%', '20% - 25%', '25% - 30%', '30% - 40%', '40%+'] },
          { name: 'currentClickRate', label: 'Average Click Rate', type: 'select', required: false, step: 4, order: 7, options: ['Not tracking / No data', 'Under 1%', '1% - 2%', '2% - 3%', '3% - 4%', '4% - 5%', '5%+'] },
          { name: 'unsubscribeRate', label: 'Average Unsubscribe Rate', type: 'select', required: false, step: 4, order: 8, options: ['Not tracking', 'Under 0.1%', '0.1% - 0.3%', '0.3% - 0.5%', '0.5% - 1%', '1%+ (concerning)'] },
          { name: 'emailFrequency', label: 'Current Sending Frequency', type: 'select', required: true, step: 4, order: 9, options: ['Not sending yet', 'Rarely (few times a year)', 'Monthly', '2-3 times per month', 'Weekly', '2-3 times per week', 'Daily', 'Multiple times daily'] },
          { name: 'deliverabilityIssues', label: 'Deliverability Issues?', type: 'radio', required: true, step: 4, order: 10, options: ['No issues', 'Some spam complaints', 'High bounce rates', 'Emails going to spam', 'Blacklisted sender', 'Not sure / Need audit'] },
          { name: 'existingAutomations', label: 'Existing Automations', type: 'multiselect', required: false, step: 4, order: 11, options: ['None yet', 'Welcome series', 'Abandoned cart', 'Post-purchase', 'Re-engagement', 'Birthday / Anniversary', 'Browse abandonment', 'Win-back', 'Lead nurturing', 'Transactional', 'Other'] },
          { name: 'biggestChallenge', label: 'Biggest Email Challenge', type: 'multiselect', required: true, step: 4, order: 12, options: ['Growing my list', 'Low open rates', 'Low click rates', 'High unsubscribe rate', 'Creating content', 'Design / Templates', 'Automation setup', 'Deliverability issues', 'Lack of time', 'Segmentation', 'Personalization', 'Measuring ROI', 'Not sure where to start'] },

          // Step 5: Email Strategy & Goals (10 fields)
          { name: 'primaryGoals', label: 'Primary Email Goals', type: 'multiselect', required: true, step: 5, order: 1, options: ['Increase revenue / sales', 'Generate new leads', 'Nurture leads to conversion', 'Build brand awareness', 'Improve customer retention', 'Launch new products', 'Drive website traffic', 'Reduce cart abandonment', 'Re-engage inactive subscribers', 'Build community', 'Customer education', 'Increase referrals', 'Cross-sell / upsell'] },
          { name: 'revenueGoal', label: 'Revenue Goal from Email', type: 'select', required: false, step: 5, order: 2, options: ['Not tracking revenue', 'Under €5,000/month', '€5,000 - €10,000/month', '€10,000 - €25,000/month', '€25,000 - €50,000/month', '€50,000 - €100,000/month', '€100,000+/month', 'Just starting out'] },
          { name: 'emailContribution', label: 'Current Email Revenue %', type: 'select', required: false, step: 5, order: 3, options: ['Not tracking', 'Under 5%', '5% - 10%', '10% - 20%', '20% - 30%', '30% - 40%', '40%+ (email-first business)'] },
          { name: 'desiredFrequency', label: 'Desired Sending Frequency', type: 'select', required: true, step: 5, order: 4, options: ['Occasional (as needed)', 'Monthly', '2-3 times per month', 'Weekly', '2-3 times per week', 'Daily', 'Need guidance'] },
          { name: 'brandVoice', label: 'Brand Voice / Tone', type: 'multiselect', required: true, step: 5, order: 5, options: ['Professional / Formal', 'Friendly / Conversational', 'Playful / Fun', 'Authoritative / Expert', 'Inspirational / Motivating', 'Educational / Informative', 'Bold / Provocative', 'Empathetic / Supportive', 'Luxurious / Premium', 'Casual / Relaxed', 'Urgent / Action-oriented'] },
          { name: 'competitorEmails', label: 'Competitor Email Examples', type: 'textarea', placeholder: 'Share examples of competitor emails you like or want to improve upon...', required: false, step: 5, order: 6 },
          { name: 'brandGuidelines', label: 'Brand Guidelines Available?', type: 'radio', required: true, step: 5, order: 7, options: ['Yes, complete brand guide', 'Partial (logo, colors, fonts)', 'Basic (logo only)', 'No, need help creating'] },
          { name: 'contentSupport', label: 'Content Creation Needs', type: 'radio', required: true, step: 5, order: 8, options: ['I will provide all content', 'Need help with copywriting', 'Need full content creation', 'Mix - varies by campaign'] },
          { name: 'designSupport', label: 'Design Support Needs', type: 'radio', required: true, step: 5, order: 9, options: ['I will provide designs', 'Need template design help', 'Need full design service', 'Just text-based emails'] },
          { name: 'kpiTracking', label: 'KPIs to Track', type: 'multiselect', required: true, step: 5, order: 10, options: ['Open rate', 'Click rate', 'Conversion rate', 'Revenue per email', 'List growth rate', 'Unsubscribe rate', 'Bounce rate', 'ROI', 'Customer lifetime value', 'Engagement score', 'Deliverability metrics'] },

          // Step 6: Campaign Requirements (12 fields)
          { name: 'emailTypes', label: 'Email Types Needed', type: 'multiselect', required: true, step: 6, order: 1, options: ['Welcome Series', 'Newsletter', 'Promotional / Sales', 'Product Launch', 'Abandoned Cart', 'Browse Abandonment', 'Post-Purchase', 'Re-engagement / Win-back', 'Loyalty / VIP', 'Referral Program', 'Birthday / Anniversary', 'Transactional', 'Event Invitations', 'Webinar Promotion', 'Surveys / Feedback', 'Educational / Tips', 'Case Studies', 'Company Updates', 'Seasonal Campaigns', 'Flash Sales'] },
          { name: 'servicesNeeded', label: 'Services Required', type: 'multiselect', required: true, step: 6, order: 2, options: ['Email Strategy Development', 'Template Design', 'Email Copywriting', 'Automation Setup', 'Flow / Sequence Building', 'List Segmentation', 'Personalization Setup', 'A/B Testing Strategy', 'Analytics & Reporting', 'List Cleaning / Hygiene', 'Platform Migration', 'Deliverability Optimization', 'Lead Magnet Creation', 'Landing Page Design', 'Popup / Form Design', 'SMS Integration', 'CRM Integration'] },
          { name: 'automationsNeeded', label: 'Automations to Build', type: 'multiselect', required: true, step: 6, order: 3, options: ['Welcome series', 'Abandoned cart', 'Browse abandonment', 'Post-purchase follow-up', 'Review / Feedback request', 'Cross-sell / upsell', 'Re-engagement / Win-back', 'Birthday / Anniversary', 'Loyalty rewards', 'Lead nurturing', 'Onboarding sequence', 'Renewal reminders', 'VIP / High-value customer', 'Sunset / Unsubscribe'] },
          { name: 'campaignsPerMonth', label: 'Campaigns Per Month', type: 'select', required: true, step: 6, order: 4, options: ['1-2 campaigns', '3-4 campaigns', '5-8 campaigns', '9-12 campaigns', '12+ campaigns', 'Need guidance'] },
          { name: 'templateNeeds', label: 'Template Requirements', type: 'multiselect', required: true, step: 6, order: 5, options: ['Newsletter template', 'Promotional template', 'Product announcement', 'Minimal / Text-based', 'Image-heavy / Visual', 'Mobile-first design', 'Dark mode compatible', 'Animated / Interactive', 'Multiple templates needed'] },
          { name: 'dynamicContent', label: 'Dynamic Content Needs', type: 'multiselect', required: false, step: 6, order: 6, options: ['None / Not needed', 'Product recommendations', 'Personalized offers', 'Location-based content', 'Weather-based content', 'Browse history content', 'Countdown timers', 'Live social feeds', 'Loyalty points / Status', 'Custom merge fields'] },
          { name: 'integrations', label: 'Integrations Needed', type: 'multiselect', required: true, step: 6, order: 7, options: ['E-commerce platform (Shopify, etc.)', 'CRM (Salesforce, HubSpot, etc.)', 'Website / CMS', 'SMS marketing', 'Social media', 'Reviews platform', 'Loyalty program', 'Helpdesk / Support', 'Analytics (GA4, etc.)', 'Advertising platforms', 'Zapier / Make', 'Custom API'] },
          { name: 'ecommercePlatform', label: 'E-commerce Platform', type: 'select', required: false, step: 6, order: 8, options: ['Not applicable', 'Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Salesforce Commerce', 'Custom / Headless', 'Other'] },
          { name: 'sendingVolume', label: 'Expected Monthly Sends', type: 'select', required: true, step: 6, order: 9, options: ['Under 10,000', '10,000 - 50,000', '50,000 - 100,000', '100,000 - 250,000', '250,000 - 500,000', '500,000 - 1 million', '1 million+'] },
          { name: 'multiLanguage', label: 'Multi-language Emails?', type: 'radio', required: true, step: 6, order: 10, options: ['No, single language only', 'Yes, 2-3 languages', 'Yes, 4+ languages', 'Planning for future'] },
          { name: 'complianceNeeds', label: 'Compliance Requirements', type: 'multiselect', required: true, step: 6, order: 11, options: ['GDPR (Europe)', 'CAN-SPAM (USA)', 'CASL (Canada)', 'CCPA (California)', 'HIPAA (Healthcare)', 'Financial regulations', 'Not sure - need guidance', 'Standard compliance only'] },
          { name: 'smsMarketing', label: 'SMS Marketing Interest', type: 'radio', required: false, step: 6, order: 12, options: ['Not interested', 'Interested in learning more', 'Want to add SMS', 'Already using SMS'] },

          // Step 7: Segmentation & Personalization (8 fields)
          { name: 'currentSegmentation', label: 'Current Segmentation', type: 'select', required: true, step: 7, order: 1, options: ['No segmentation', 'Basic (1-2 segments)', 'Moderate (3-5 segments)', 'Advanced (6+ segments)', 'Need help setting up'] },
          { name: 'segmentationCriteria', label: 'Segmentation Criteria', type: 'multiselect', required: true, step: 7, order: 2, options: ['Demographics (age, location, etc.)', 'Purchase history', 'Purchase frequency', 'Average order value', 'Product category interests', 'Engagement level', 'Lifecycle stage', 'Lead source', 'Email preferences', 'Behavioral (site activity)', 'VIP / Loyalty status', 'Custom attributes'] },
          { name: 'personalizationLevel', label: 'Personalization Level Desired', type: 'select', required: true, step: 7, order: 3, options: ['Basic (first name only)', 'Moderate (name + simple dynamic content)', 'Advanced (behavioral triggers, recommendations)', 'Hyper-personalized (AI-driven, 1:1 content)', 'Need guidance'] },
          { name: 'dataAvailable', label: 'Customer Data Available', type: 'multiselect', required: true, step: 7, order: 4, options: ['Basic contact info', 'Purchase history', 'Browse behavior', 'Email engagement history', 'Customer preferences', 'Demographic data', 'Survey responses', 'Support interactions', 'Social data', 'Loyalty / Points data', 'Limited data'] },
          { name: 'abTesting', label: 'A/B Testing Experience', type: 'select', required: true, step: 7, order: 5, options: ['Never done A/B testing', 'Tested occasionally', 'Regular testing program', 'Advanced multivariate testing', 'Want to start testing'] },
          { name: 'testingElements', label: 'Elements to Test', type: 'multiselect', required: false, step: 7, order: 6, options: ['Subject lines', 'Send times', 'From name / sender', 'Email content', 'CTAs / buttons', 'Images / visuals', 'Personalization tactics', 'Email length', 'Offers / discounts', 'Template layouts'] },
          { name: 'preferenceCenter', label: 'Email Preference Center', type: 'radio', required: true, step: 7, order: 7, options: ['Have preference center', 'Need one built', 'Not needed', 'Not sure'] },
          { name: 'listCleaning', label: 'List Hygiene Practices', type: 'select', required: true, step: 7, order: 8, options: ['Regular cleaning (monthly)', 'Occasional cleaning', 'Rarely / Never cleaned', 'Need help establishing', 'Not sure'] },

          // Step 8: Budget & Timeline (10 fields)
          { name: 'budget', label: 'Monthly Budget', type: 'select', required: true, step: 8, order: 1, options: ['Under €500/month', '€500 - €1,000/month', '€1,000 - €2,000/month', '€2,000 - €3,500/month', '€3,500 - €5,000/month', '€5,000 - €7,500/month', '€7,500 - €10,000/month', '€10,000 - €15,000/month', '€15,000+/month'] },
          { name: 'projectType', label: 'Project Type', type: 'radio', required: true, step: 8, order: 2, options: ['One-time setup only', 'Ongoing monthly retainer', 'Setup + ongoing management', 'Consulting / Strategy only', 'Need guidance'] },
          { name: 'contractLength', label: 'Preferred Contract Length', type: 'select', required: true, step: 8, order: 3, options: ['Month-to-month', '3 months', '6 months', '12 months', 'Project-based', 'Flexible'] },
          { name: 'timeline', label: 'Desired Start Date', type: 'select', required: true, step: 8, order: 4, options: ['Immediately / ASAP', 'Within 1 week', 'Within 2 weeks', 'Within 1 month', 'Next quarter', 'Planning ahead', 'Just exploring options'] },
          { name: 'urgentNeeds', label: 'Any Urgent Deadlines?', type: 'textarea', placeholder: 'Product launch, sale event, holiday campaign...', required: false, step: 8, order: 5 },
          { name: 'decisionMaker', label: 'Decision Making Authority', type: 'radio', required: true, step: 8, order: 6, options: ['I am the final decision maker', 'Need approval from 1 other person', 'Team / Committee decision', 'Need executive approval'] },
          { name: 'decisionTimeline', label: 'Decision Timeline', type: 'select', required: true, step: 8, order: 7, options: ['Ready to start now', 'Within this week', 'Within 2 weeks', 'Within 1 month', '1-3 months', 'Just researching'] },
          { name: 'communicationPreference', label: 'Communication Preference', type: 'select', required: true, step: 8, order: 8, options: ['Email only', 'Slack / Teams', 'Regular video calls', 'Phone calls', 'Project management tool', 'Mix of methods'] },
          { name: 'additionalInfo', label: 'Additional Requirements or Questions', type: 'textarea', placeholder: 'Any specific needs, concerns, or questions...', required: false, step: 8, order: 9 },
          { name: 'howDidYouHear', label: 'How Did You Find Us?', type: 'select', required: false, step: 8, order: 10, options: ['Google Search', 'LinkedIn', 'Twitter / X', 'Facebook', 'Referral from colleague', 'Your emails / Newsletter', 'Blog / Content', 'Podcast', 'Conference / Event', 'Clutch / Agency directory', 'Cold outreach', 'Other'] },
        ],
      },
      {
        name: 'Blogging & Content',
        slug: 'blogging',
        category: 'Content',
        description: 'Professional blog posts and content strategy for your brand',
        icon: 'FileText',
        color: '#EC4899',
        steps: [
          { title: 'Contact Information', description: 'Tell us about yourself', order: 1, layout: 'with-image' },
          { title: 'Business & Brand', description: 'About your company and identity', order: 2, layout: 'with-image' },
          { title: 'Brand Voice & Audience', description: 'Define your tone and target readers', order: 3, layout: 'two-column' },
          { title: 'Content Strategy', description: 'Your current content situation and goals', order: 4, layout: 'two-column' },
          { title: 'SEO & Keywords', description: 'Search optimization requirements', order: 5, layout: 'two-column' },
          { title: 'Content Requirements', description: 'What type of content do you need?', order: 6, layout: 'two-column' },
          { title: 'Workflow & Delivery', description: 'How we will work together', order: 7, layout: 'two-column' },
          { title: 'Budget & Timeline', description: 'Investment and schedule', order: 8, layout: 'two-column' },
        ],
        fields: [
          // Step 1: Contact Information (4 fields)
          { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true, step: 1, order: 1 },
          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true, step: 1, order: 2 },
          { name: 'phone', label: 'Phone Number', type: 'phone', placeholder: '+1 234 567 890', required: false, step: 1, order: 3 },
          { name: 'jobTitle', label: 'Job Title / Role', type: 'text', placeholder: 'Marketing Director', required: false, step: 1, order: 4 },

          // Step 2: Business & Brand (8 fields)
          { name: 'companyName', label: 'Company / Brand Name', type: 'text', placeholder: 'Your Company', required: true, step: 2, order: 1 },
          { name: 'website', label: 'Website URL', type: 'url', placeholder: 'https://yourwebsite.com', required: false, step: 2, order: 2 },
          { name: 'industry', label: 'Industry / Niche', type: 'select', required: true, step: 2, order: 3, options: ['Technology / SaaS', 'E-commerce / Retail', 'Healthcare / Wellness', 'Finance / Fintech', 'Marketing / Advertising', 'Education / E-learning', 'Real Estate', 'Travel / Hospitality', 'Food & Beverage', 'Fashion / Beauty', 'Legal Services', 'Manufacturing / Industrial', 'Consulting / Professional Services', 'Non-profit / NGO', 'Media / Entertainment', 'Automotive', 'Energy / Sustainability', 'Other'] },
          { name: 'companySize', label: 'Company Size', type: 'select', required: true, step: 2, order: 4, options: ['Solo / Freelancer', '2-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '500-1000 employees', '1000+ employees'] },
          { name: 'businessModel', label: 'Business Model', type: 'select', required: true, step: 2, order: 5, options: ['B2B (Business to Business)', 'B2C (Business to Consumer)', 'B2B2C (Both)', 'D2C (Direct to Consumer)', 'Marketplace', 'SaaS / Subscription', 'E-commerce', 'Service-based', 'Non-profit'] },
          { name: 'productsServices', label: 'Main Products / Services', type: 'textarea', placeholder: 'Briefly describe your main products or services...', required: true, step: 2, order: 6 },
          { name: 'uniqueValue', label: 'Unique Value Proposition', type: 'textarea', placeholder: 'What makes your business different from competitors?', required: true, step: 2, order: 7 },
          { name: 'brandGuidelines', label: 'Brand Guidelines Available?', type: 'radio', required: true, step: 2, order: 8, options: ['Yes, complete brand guide', 'Partial (logo, colors, fonts)', 'Basic (logo only)', 'No, need help creating'] },

          // Step 3: Brand Voice & Audience (10 fields)
          { name: 'brandVoice', label: 'Brand Voice / Tone', type: 'multiselect', required: true, step: 3, order: 1, options: ['Professional / Formal', 'Friendly / Conversational', 'Authoritative / Expert', 'Playful / Fun', 'Inspirational / Motivating', 'Educational / Informative', 'Bold / Provocative', 'Empathetic / Supportive', 'Witty / Humorous', 'Minimalist / Direct', 'Luxurious / Premium', 'Technical / Data-driven'] },
          { name: 'brandPersonality', label: 'Brand Personality Traits', type: 'multiselect', required: true, step: 3, order: 2, options: ['Innovative', 'Trustworthy', 'Approachable', 'Sophisticated', 'Adventurous', 'Caring', 'Bold', 'Reliable', 'Creative', 'Down-to-earth', 'Exclusive', 'Energetic'] },
          { name: 'wordsToUse', label: 'Words/Phrases to Use', type: 'textarea', placeholder: 'List words, phrases, or terminology your brand uses...', required: false, step: 3, order: 3 },
          { name: 'wordsToAvoid', label: 'Words/Phrases to Avoid', type: 'textarea', placeholder: 'List words or phrases that do not fit your brand...', required: false, step: 3, order: 4 },
          { name: 'targetAudienceType', label: 'Primary Target Audience', type: 'select', required: true, step: 3, order: 5, options: ['Small Business Owners', 'Enterprise Decision Makers', 'Startup Founders', 'Marketing Professionals', 'Developers / Technical Teams', 'HR / People Operations', 'Finance / Accounting', 'Healthcare Professionals', 'Educators / Students', 'Consumers (General)', 'C-Suite Executives', 'Other'] },
          { name: 'audienceAge', label: 'Audience Age Range', type: 'multiselect', required: true, step: 3, order: 6, options: ['18-24 (Gen Z)', '25-34 (Millennials)', '35-44 (Millennials/Gen X)', '45-54 (Gen X)', '55-64 (Boomers)', '65+ (Seniors)', 'All ages'] },
          { name: 'audienceGeography', label: 'Geographic Focus', type: 'multiselect', required: true, step: 3, order: 7, options: ['United States', 'Canada', 'United Kingdom', 'Europe (EU)', 'Australia / New Zealand', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa', 'Global / Worldwide'] },
          { name: 'audiencePainPoints', label: 'Audience Pain Points', type: 'textarea', placeholder: 'What problems do your readers face that you can solve?', required: true, step: 3, order: 8 },
          { name: 'audienceObjections', label: 'Common Objections', type: 'textarea', placeholder: 'What objections or concerns do potential customers have?', required: false, step: 3, order: 9 },
          { name: 'personaDescription', label: 'Ideal Reader Persona', type: 'textarea', placeholder: 'Describe your ideal blog reader in detail (role, goals, challenges)...', required: false, step: 3, order: 10 },

          // Step 4: Content Strategy (10 fields)
          { name: 'currentBlog', label: 'Current Blog Status', type: 'radio', required: true, step: 4, order: 1, options: ['Active blog with regular posts', 'Blog exists but inactive', 'No blog yet', 'Multiple blogs to consolidate'] },
          { name: 'existingPosts', label: 'Existing Blog Posts', type: 'select', required: true, step: 4, order: 2, options: ['None', '1-10 posts', '11-50 posts', '51-100 posts', '100-500 posts', '500+ posts'] },
          { name: 'currentTraffic', label: 'Current Monthly Blog Traffic', type: 'select', required: false, step: 4, order: 3, options: ['Not tracking', 'Under 1,000 visits', '1,000 - 5,000 visits', '5,000 - 10,000 visits', '10,000 - 50,000 visits', '50,000 - 100,000 visits', '100,000+ visits'] },
          { name: 'contentGoals', label: 'Primary Content Goals', type: 'multiselect', required: true, step: 4, order: 4, options: ['Increase organic search traffic', 'Generate qualified leads', 'Build thought leadership', 'Educate existing customers', 'Support sales team', 'Improve brand awareness', 'Drive social media engagement', 'Nurture email subscribers', 'Product / feature education', 'Customer success / retention', 'Recruit talent', 'Build community'] },
          { name: 'contentPillars', label: 'Content Pillars / Themes', type: 'textarea', placeholder: 'List 3-5 main topics or themes you want to cover...', required: true, step: 4, order: 5 },
          { name: 'existingContent', label: 'Existing Content to Repurpose', type: 'radio', required: true, step: 4, order: 6, options: ['Yes, lots of content (webinars, podcasts, etc.)', 'Some content available', 'Very little content', 'Starting from scratch'] },
          { name: 'contentCalendar', label: 'Content Calendar Status', type: 'radio', required: true, step: 4, order: 7, options: ['Have established calendar', 'Informal planning', 'No calendar yet', 'Need help creating one'] },
          { name: 'competitorBlogs', label: 'Competitor Blogs to Analyze', type: 'textarea', placeholder: 'List URLs of competitor blogs or content you admire...', required: false, step: 4, order: 8 },
          { name: 'inspirationBlogs', label: 'Blogs You Admire (Style)', type: 'textarea', placeholder: 'List blogs whose writing style or format you like...', required: false, step: 4, order: 9 },
          { name: 'contentChallenges', label: 'Biggest Content Challenges', type: 'multiselect', required: true, step: 4, order: 10, options: ['Finding time to create content', 'Generating topic ideas', 'Writing quality content', 'SEO optimization', 'Maintaining consistency', 'Measuring ROI', 'Getting internal approvals', 'Distributing content', 'Standing out from competitors', 'Converting readers to leads'] },

          // Step 5: SEO & Keywords (8 fields)
          { name: 'seoImportance', label: 'SEO Priority Level', type: 'radio', required: true, step: 5, order: 1, options: ['Critical - top priority', 'Important but not primary focus', 'Nice to have', 'Not a focus right now'] },
          { name: 'seoExperience', label: 'Current SEO Knowledge', type: 'select', required: true, step: 5, order: 2, options: ['No SEO experience', 'Basic understanding', 'Intermediate (some optimization)', 'Advanced (active SEO strategy)', 'Have dedicated SEO team/agency'] },
          { name: 'targetKeywords', label: 'Target Keywords / Topics', type: 'textarea', placeholder: 'List main keywords or topics you want to rank for...', required: false, step: 5, order: 3 },
          { name: 'currentRankings', label: 'Currently Ranking Keywords?', type: 'textarea', placeholder: 'List any keywords you already rank for (if known)...', required: false, step: 5, order: 4 },
          { name: 'searchIntent', label: 'Primary Search Intent to Target', type: 'multiselect', required: true, step: 5, order: 5, options: ['Informational (how-to, what is)', 'Commercial (best, reviews, comparisons)', 'Transactional (buy, pricing, demo)', 'Navigational (brand searches)', 'Educational (tutorials, guides)'] },
          { name: 'localSeo', label: 'Local SEO Needed?', type: 'radio', required: true, step: 5, order: 6, options: ['Yes, targeting specific locations', 'No, national/global focus', 'Both local and broader'] },
          { name: 'seoTools', label: 'SEO Tools Used', type: 'multiselect', required: false, step: 5, order: 7, options: ['None', 'Google Search Console', 'Google Analytics', 'SEMrush', 'Ahrefs', 'Moz', 'Surfer SEO', 'Clearscope', 'MarketMuse', 'Yoast SEO', 'Other'] },
          { name: 'contentAudit', label: 'Need Content Audit?', type: 'radio', required: true, step: 5, order: 8, options: ['Yes, audit existing content', 'No, starting fresh', 'Maybe, need assessment'] },

          // Step 6: Content Requirements (12 fields)
          { name: 'contentTypes', label: 'Content Types Needed', type: 'multiselect', required: true, step: 6, order: 1, options: ['Blog Posts', 'Long-form Articles (1500+ words)', 'Ultimate Guides (3000+ words)', 'How-to Tutorials', 'Listicles', 'Case Studies', 'White Papers', 'eBooks', 'Product Comparisons', 'Industry News Analysis', 'Thought Leadership Pieces', 'Interviews / Q&As', 'Infographic Content', 'Video Scripts', 'Podcast Show Notes', 'Email Newsletter Content', 'Social Media Posts', 'Landing Page Copy', 'Product Descriptions', 'FAQ Content'] },
          { name: 'articlesPerMonth', label: 'Articles Needed Per Month', type: 'select', required: true, step: 6, order: 2, options: ['1-2 articles', '3-4 articles', '5-8 articles', '9-12 articles', '13-20 articles', '20-30 articles', '30+ articles'] },
          { name: 'wordCount', label: 'Preferred Article Length', type: 'select', required: true, step: 6, order: 3, options: ['Short (500-800 words)', 'Medium (800-1,200 words)', 'Long (1,200-1,800 words)', 'Comprehensive (1,800-2,500 words)', 'Ultimate Guides (2,500-4,000 words)', 'Pillar Pages (4,000+ words)', 'Mix of lengths based on topic'] },
          { name: 'contentFormat', label: 'Content Format Preferences', type: 'multiselect', required: true, step: 6, order: 4, options: ['Standard blog format', 'Structured with headers/subheaders', 'Heavy use of bullet points', 'Data-driven with statistics', 'Story-driven narrative', 'Step-by-step instructions', 'Visual-heavy (images, diagrams)', 'Video embeds included', 'Interactive elements', 'Downloadable resources'] },
          { name: 'servicesNeeded', label: 'Services Required', type: 'multiselect', required: true, step: 6, order: 5, options: ['Content Strategy Development', 'Editorial Calendar Creation', 'Topic / Keyword Research', 'Content Brief Creation', 'SEO Optimization', 'Content Writing', 'Content Editing / Proofreading', 'Fact-checking / Research', 'Image Sourcing (Stock)', 'Custom Graphics / Infographics', 'Featured Image Design', 'CMS Publishing (WordPress, etc.)', 'Internal Linking Strategy', 'Meta Description Writing', 'Content Performance Reporting', 'Content Refresh / Updates', 'Competitor Content Analysis', 'Content Repurposing'] },
          { name: 'imageRequirements', label: 'Image Requirements', type: 'multiselect', required: true, step: 6, order: 6, options: ['Stock images included', 'Custom featured images', 'Custom graphics / diagrams', 'Infographics', 'Screenshots / tutorials', 'No images needed', 'I will provide images'] },
          { name: 'researchDepth', label: 'Research Depth Required', type: 'radio', required: true, step: 6, order: 7, options: ['Light research (general topics)', 'Moderate (industry-specific)', 'Deep research (technical/specialized)', 'Expert interviews required'] },
          { name: 'citations', label: 'Citation Requirements', type: 'radio', required: true, step: 6, order: 8, options: ['Link to sources inline', 'Formal citations/references', 'No citations needed', 'Industry-specific standards'] },
          { name: 'internalLinking', label: 'Internal Linking Strategy', type: 'radio', required: true, step: 6, order: 9, options: ['Need help building strategy', 'Have existing strategy to follow', 'Minimal internal linking', 'Not applicable (new blog)'] },
          { name: 'cta', label: 'Call-to-Action Preferences', type: 'multiselect', required: true, step: 6, order: 10, options: ['Newsletter signup', 'Demo request', 'Free trial', 'Download resource', 'Contact form', 'Product pages', 'Social sharing', 'Related posts', 'No CTAs needed', 'Varies by content'] },
          { name: 'legalCompliance', label: 'Legal/Compliance Requirements', type: 'multiselect', required: false, step: 6, order: 11, options: ['None / Standard content', 'GDPR compliance', 'HIPAA (healthcare)', 'Financial disclaimers', 'Legal review required', 'Industry regulations', 'Accessibility (ADA/WCAG)'] },
          { name: 'exclusivityNeeds', label: 'Content Exclusivity', type: 'radio', required: true, step: 6, order: 12, options: ['100% original content only', 'Can repurpose with credit', 'Flexible', 'Need ghostwriting (no byline)'] },

          // Step 7: Workflow & Delivery (10 fields)
          { name: 'subjectMatterExpert', label: 'Subject Matter Input', type: 'radio', required: true, step: 7, order: 1, options: ['I will provide detailed briefs', 'Available for questions/interviews', 'Light input - you research', 'Need interview-based content', 'Have internal SMEs available'] },
          { name: 'approvalProcess', label: 'Content Approval Process', type: 'select', required: true, step: 7, order: 2, options: ['I am the sole approver', 'Small team review (2-3 people)', 'Multiple stakeholders involved', 'Legal/compliance review required', 'Need help establishing process'] },
          { name: 'revisionProcess', label: 'Revision Expectations', type: 'select', required: true, step: 7, order: 3, options: ['Quick review, minimal changes expected', '1 round of revisions included', '2 rounds of revisions included', 'Unlimited revisions until satisfied', 'Collaborative editing process'] },
          { name: 'turnaroundTime', label: 'Preferred Turnaround Time', type: 'select', required: true, step: 7, order: 4, options: ['24-48 hours (rush)', '3-5 business days', '1 week', '2 weeks', 'Flexible / based on content calendar'] },
          { name: 'deliveryFormat', label: 'Content Delivery Format', type: 'multiselect', required: true, step: 7, order: 5, options: ['Google Docs', 'Microsoft Word', 'Directly in CMS (WordPress, etc.)', 'Notion', 'Markdown files', 'HTML formatted', 'Project management tool (Asana, Trello, etc.)'] },
          { name: 'publishingSupport', label: 'Publishing Support Needed', type: 'radio', required: true, step: 7, order: 6, options: ['Just deliver content, I publish', 'Full publishing in CMS', 'Scheduling and publishing', 'Need CMS training/setup'] },
          { name: 'publishingPlatform', label: 'Publishing Platform', type: 'select', required: true, step: 7, order: 7, options: ['WordPress', 'Webflow', 'Shopify Blog', 'HubSpot', 'Ghost', 'Squarespace', 'Wix', 'Custom CMS', 'Medium', 'LinkedIn Articles', 'Multiple platforms', 'Not decided yet'] },
          { name: 'communicationPreference', label: 'Communication Preference', type: 'select', required: true, step: 7, order: 8, options: ['Email only', 'Slack / Teams', 'Project management tool', 'Weekly calls', 'As-needed calls', 'Mix of async and sync'] },
          { name: 'reportingNeeds', label: 'Reporting Requirements', type: 'multiselect', required: true, step: 7, order: 9, options: ['No reporting needed', 'Monthly traffic report', 'Keyword ranking updates', 'Content performance metrics', 'Lead/conversion tracking', 'Quarterly strategy reviews', 'Real-time dashboard access'] },
          { name: 'existingTools', label: 'Tools We Should Integrate With', type: 'multiselect', required: false, step: 7, order: 10, options: ['Google Analytics 4', 'Google Search Console', 'HubSpot', 'Salesforce', 'Mailchimp / Email tool', 'SEMrush / Ahrefs', 'Trello / Asana / Monday', 'Slack', 'Notion', 'Other project tools'] },

          // Step 8: Budget & Timeline (8 fields)
          { name: 'budget', label: 'Monthly Content Budget', type: 'select', required: true, step: 8, order: 1, options: ['Under €500/month', '€500 - €1,000/month', '€1,000 - €2,000/month', '€2,000 - €3,500/month', '€3,500 - €5,000/month', '€5,000 - €7,500/month', '€7,500 - €10,000/month', '€10,000 - €15,000/month', '€15,000+/month'] },
          { name: 'engagementType', label: 'Preferred Engagement Model', type: 'radio', required: true, step: 8, order: 2, options: ['Monthly retainer', 'Per-article pricing', 'Project-based (one-time)', 'Quarterly packages', 'Flexible / hybrid', 'Not sure - need guidance'] },
          { name: 'contractLength', label: 'Preferred Contract Length', type: 'select', required: true, step: 8, order: 3, options: ['Month-to-month', '3 months', '6 months', '12 months', 'Project-based', 'Flexible'] },
          { name: 'startDate', label: 'Desired Start Date', type: 'select', required: true, step: 8, order: 4, options: ['Immediately / ASAP', 'Within 1 week', 'Within 2 weeks', 'Within 1 month', 'Next quarter', 'Planning for later', 'Just exploring options'] },
          { name: 'decisionMaker', label: 'Decision Making Authority', type: 'radio', required: true, step: 8, order: 5, options: ['I am the final decision maker', 'Need approval from 1 other person', 'Team/committee decision', 'Need executive approval'] },
          { name: 'decisionTimeline', label: 'Decision Timeline', type: 'select', required: true, step: 8, order: 6, options: ['Ready to start now', 'Within this week', 'Within 2 weeks', 'Within 1 month', '1-3 months', 'Just researching'] },
          { name: 'additionalInfo', label: 'Additional Requirements or Questions', type: 'textarea', placeholder: 'Any specific guidelines, preferences, concerns, or questions...', required: false, step: 8, order: 7 },
          { name: 'referralSource', label: 'How Did You Find Us?', type: 'select', required: false, step: 8, order: 8, options: ['Google Search', 'LinkedIn', 'Twitter / X', 'Facebook', 'Referral from colleague', 'Your content / Blog', 'Podcast', 'Conference / Event', 'Clutch / Agency directory', 'Cold outreach', 'Other'] },
        ],
      },
    ]

    for (const service of services) {
      await Service.findOneAndUpdate(
        { slug: service.slug },
        service,
        { upsert: true }
      )
    }
    console.log('Services created with form fields')

    console.log('\n✅ Seed completed successfully!')
    console.log('\nYou can now:')
    console.log('1. Visit http://localhost:3000 to see the client onboarding')
    console.log('2. Login as admin: admin@awesome.com / admin123')

  } catch (error) {
    console.error('Seed error:', error)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

seed()
