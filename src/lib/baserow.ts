// Baserow API Integration for Onboarding Data

const BASEROW_URL = 'https://dayta.intelligentb2b.com'
const BASEROW_TOKEN = process.env.BASEROW_TOKEN || 'q7memMh2OKuI0AvzKbO5w5L6QUzeJBkt'

// Table IDs for each service
const SERVICE_TABLES: Record<string, number> = {
  'cold-email-marketing': 1582,
  'facebook-ads-onboarding': 1583,
  'blogging-seo-friendly': 1584,
  'lead-generation-crm': 1585,
  'seo-content-strategy': 1586,
  'development-services': 1587,
  'ai-automation': 1588,
  'torch-crm': 1589,
}

// Field mappings for each service (form field name -> Baserow column name)
const COLD_EMAIL_FIELDS: Record<string, string> = {
  companyName: 'Company Name',
  mainSector: 'Main Sector',
  website: 'Website',
  legalName: 'Legal Name',
  contactName: 'Contact Name',
  email: 'Email',
  phone: 'Phone',
  appointmentReceivers: 'Appointment Receivers',
  contactPhone: 'Contact Phone',
  idealCustomerDesc: 'Ideal Customer Description',
  jobTitles: 'Job Titles',
  includedSectors: 'Included Sectors',
  excludedSectors: 'Excluded Sectors',
  geography: 'Geography',
  companySize: 'Company Size',
  productService: 'Product Service',
  avgPrice: 'Average Price',
  salesCycle: 'Sales Cycle',
  usp: 'USP',
  mainDomain: 'Main Domain',
  altDomains: 'Alt Domains',
  emailNames: 'Email Names',
  tone: 'Tone',
  existingExamples: 'Existing Examples',
  painPoints: 'Pain Points',
  objections: 'Objections',
  brandGuidelines: 'Brand Guidelines',
  materials: 'Materials',
}

const FACEBOOK_ADS_FIELDS: Record<string, string> = {
  companyName: 'Company Name',
  mainSector: 'Main Sector',
  website: 'Website',
  legalName: 'Legal Name',
  contactName: 'Contact Name',
  email: 'Email',
  phone: 'Phone',
  mainProductService: 'Main Product Service',
  shortDesc: 'Short Description',
  priceRange: 'Price Range',
  activePromotions: 'Active Promotions',
  mainGoal: 'Main Goal',
  salesCycleDuration: 'Sales Cycle Duration',
  perfectCustomerProfile: 'Perfect Customer Profile',
  avgAge: 'Average Age',
  gender: 'Gender',
  targetLocation: 'Target Location',
  relevantInterests: 'Relevant Interests',
  segmentsToExclude: 'Segments To Exclude',
  businessManagerActive: 'Business Manager Active',
  metaInstructions: 'Meta Instructions',
  materialsReady: 'Materials Ready',
  resourceLink: 'Resource Link',
  graphicStyle: 'Graphic Style',
  mainLandingUrl: 'Main Landing URL',
  pastCampaigns: 'Past Campaigns',
}

const BLOGGING_SEO_FIELDS: Record<string, string> = {
  companyName: 'Company Name',
  websiteUrl: 'Website URL',
  industry: 'Industry',
  fullName: 'Full Name',
  email: 'Email',
  country: 'Country',
  phone: 'Phone',
  hasBlog: 'Has Blog',
  blogFrequency: 'Blog Frequency',
  contentWriter: 'Content Writer',
  blogTraffic: 'Blog Traffic',
  contentChallenges: 'Content Challenges',
  primaryKeywords: 'Primary Keywords',
  targetAudience: 'Target Audience',
  geographicTargeting: 'Geographic Targeting',
  seoTools: 'SEO Tools',
  contentGoals: 'Content Goals',
  targetTrafficIncrease: 'Target Traffic Increase',
  leadGenPriority: 'Lead Gen Priority',
  topicsOfInterest: 'Topics Of Interest',
  cms: 'CMS',
  websiteSpeed: 'Website Speed',
  mobileOptimization: 'Mobile Optimization',
  crm: 'CRM',
  emailPlatform: 'Email Platform',
  socialPlatforms: 'Social Platforms',
  commMethod: 'Communication Method',
}

const LEAD_GEN_CRM_FIELDS: Record<string, string> = {
  companyName: 'Company Name',
  industry: 'Industry',
  companySize: 'Company Size',
  annualRevenue: 'Annual Revenue',
  fullName: 'Full Name',
  jobTitle: 'Job Title',
  email: 'Email',
  phone: 'Phone',
  linkedin: 'LinkedIn',
  hasBlogWebsite: 'Has Blog Website',
  websiteUrl: 'Website URL',
  currentMethods: 'Current Methods',
  leadVolume: 'Lead Volume',
  leadQualitySat: 'Lead Quality Satisfaction',
  leadGenChallenges: 'Lead Gen Challenges',
  currentCrm: 'Current CRM',
  crmSatisfaction: 'CRM Satisfaction',
  salesTeamSize: 'Sales Team Size',
  salesCycleLength: 'Sales Cycle Length',
  avgDealSize: 'Avg Deal Size',
  conversionRate: 'Conversion Rate',
  targetCustomerType: 'Target Customer Type',
  geographicFocus: 'Geographic Focus',
  icpDescription: 'ICP Description',
  targetJobTitles: 'Target Job Titles',
  companySizeTargets: 'Company Size Targets',
  industryVerticals: 'Industry Verticals',
  prospectBudget: 'Prospect Budget',
  servicesInterest: 'Services Interest',
  primaryObjective: 'Primary Objective',
  leadTarget: 'Lead Target',
  acceptableCpl: 'Acceptable CPL',
  timelineResults: 'Timeline Results',
  metricsPriority: 'Metrics Priority',
  emailPlatform: 'Email Platform',
  linkedinTools: 'LinkedIn Tools',
  analyticsTools: 'Analytics Tools',
  commTools: 'Comm Tools',
  bookingSystem: 'Booking System',
  phoneSystem: 'Phone System',
  monthlyLeadGenBudget: 'Monthly Lead Gen Budget',
  setupBudget: 'Setup Budget',
  roiExpectations: 'ROI Expectations',
  approvalProcess: 'Approval Process',
  startTime: 'Start Time',
  crmIntegration: 'CRM Integration',
  dataExport: 'Data Export',
  compliance: 'Compliance',
  trainingNeeds: 'Training Needs',
  reportingFrequency: 'Reporting Frequency',
  competitors: 'Competitors',
  usp: 'USP',
  threats: 'Threats',
  positioning: 'Positioning',
  agencyExperience: 'Agency Experience',
  commMethod: 'Communication Method',
  meetingFreq: 'Meeting Frequency',
  decisionProcess: 'Decision Process',
  internalChampion: 'Internal Champion',
  successMeasurement: 'Success Measurement',
  marketingChallenge: 'Marketing Challenge',
  bizConcerns: 'Business Concerns',
  failedAttempts: 'Failed Attempts',
  constraints: 'Constraints',
  seasonalFactors: 'Seasonal Factors',
}

const SEO_CONTENT_FIELDS: Record<string, string> = {
  companyName: 'Company Name',
  websiteUrl: 'Website URL',
  industry: 'Industry',
  companySize: 'Company Size',
  primaryContactName: 'Primary Contact Name',
  email: 'Email',
  phone: 'Phone',
  hasBlog: 'Has Blog',
  blogFrequency: 'Blog Frequency',
  contentWriter: 'Content Writer',
  organicTraffic: 'Organic Traffic',
  googleRanking: 'Google Ranking',
  seoChallenges: 'SEO Challenges',
  interestedServices: 'Interested Services',
  primaryAudience: 'Primary Audience',
  geoTargeting: 'Geo Targeting',
  targetKeywords: 'Target Keywords',
  competitorWebsites: 'Competitor Websites',
  usp: 'USP',
  industryTerms: 'Industry Terms',
  contentObjectives: 'Content Objectives',
  trafficIncreaseTarget: 'Traffic Increase Target',
  resultTimeline: 'Result Timeline',
  leadGenPriority: 'Lead Gen Priority',
  contentTopics: 'Content Topics',
  seoTools: 'SEO Tools',
  cmsSystem: 'CMS System',
  websiteSpeed: 'Website Speed',
  mobileOptimized: 'Mobile Optimized',
  sslInstalled: 'SSL Installed',
  contentTone: 'Content Tone',
  contentTypes: 'Content Types',
  articleLength: 'Article Length',
  visualNeeds: 'Visual Needs',
  approvalProcess: 'Approval Process',
  hasPhysicalLocation: 'Has Physical Location',
  gmbClaimed: 'GMB Claimed',
  gmbRating: 'GMB Rating',
  serviceAreas: 'Service Areas',
  localCompetitors: 'Local Competitors',
  directoriesListed: 'Directories Listed',
  hostingProvider: 'Hosting Provider',
}

// Simple field mappings for newer services (store complex data in Form Data field)
const DEVELOPMENT_FIELDS: Record<string, string> = {
  companyName: 'Company Name',
  primaryContactName: 'Primary Contact Name',
  email: 'Email',
  phone: 'Phone',
  companySize: 'Company Size',
}

const AI_AUTOMATION_FIELDS: Record<string, string> = {
  companyName: 'Company Name',
  primaryContactName: 'Primary Contact Name',
  email: 'Email',
  phone: 'Phone',
  jobTitle: 'Job Title',
  websiteUrl: 'Website URL',
}

const TORCH_CRM_FIELDS: Record<string, string> = {
  companyName: 'Company Name',
  primaryContactName: 'Primary Contact Name',
  email: 'Email',
  phone: 'Phone',
  industry: 'Industry',
}

// Get field mappings for a service
function getFieldMappings(serviceSlug: string): Record<string, string> {
  switch (serviceSlug) {
    case 'cold-email-marketing':
      return COLD_EMAIL_FIELDS
    case 'facebook-ads-onboarding':
      return FACEBOOK_ADS_FIELDS
    case 'blogging-seo-friendly':
      return BLOGGING_SEO_FIELDS
    case 'lead-generation-crm':
      return LEAD_GEN_CRM_FIELDS
    case 'seo-content-strategy':
      return SEO_CONTENT_FIELDS
    case 'development-services':
      return DEVELOPMENT_FIELDS
    case 'ai-automation':
      return AI_AUTOMATION_FIELDS
    case 'torch-crm':
      return TORCH_CRM_FIELDS
    default:
      return {}
  }
}

// Convert form data to Baserow payload
function convertToBaserowPayload(
  formData: Record<string, unknown>,
  fieldMappings: Record<string, string>
): Record<string, unknown> {
  const payload: Record<string, unknown> = {}

  for (const [formField, baserowField] of Object.entries(fieldMappings)) {
    const value = formData[formField]
    if (value !== undefined && value !== null) {
      // Convert arrays to comma-separated strings
      if (Array.isArray(value)) {
        payload[baserowField] = value.join(', ')
      } else {
        payload[baserowField] = value
      }
    }
  }

  return payload
}

interface SubmissionResult {
  success: boolean
  rowId?: number
  error?: string
}

export async function saveSubmissionToBaserow(
  serviceSlug: string,
  formData: Record<string, unknown>
): Promise<SubmissionResult> {
  try {
    const tableId = SERVICE_TABLES[serviceSlug]
    if (!tableId) {
      return { success: false, error: `Unknown service: ${serviceSlug}` }
    }

    const fieldMappings = getFieldMappings(serviceSlug)
    const payload = convertToBaserowPayload(formData, fieldMappings)

    // Add status and created at
    payload['Status'] = 'new'
    payload['Created At'] = new Date().toISOString()

    // For newer services, store full form data as JSON
    const newerServices = ['development-services', 'ai-automation', 'torch-crm']
    if (newerServices.includes(serviceSlug)) {
      payload['Form Data'] = JSON.stringify(formData, null, 2)
    }

    const response = await fetch(
      `${BASEROW_URL}/api/database/rows/table/${tableId}/?user_field_names=true`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${BASEROW_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Baserow save error:', errorText)
      return { success: false, error: errorText }
    }

    const result = await response.json()
    return { success: true, rowId: result.id }
  } catch (error) {
    console.error('Baserow save exception:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function getSubmissionsFromBaserow(
  serviceSlug: string,
  page: number = 1,
  limit: number = 20
): Promise<{ success: boolean; rows?: unknown[]; total?: number; error?: string }> {
  try {
    const tableId = SERVICE_TABLES[serviceSlug]
    if (!tableId) {
      return { success: false, error: `Unknown service: ${serviceSlug}` }
    }

    const response = await fetch(
      `${BASEROW_URL}/api/database/rows/table/${tableId}/?user_field_names=true&page=${page}&size=${limit}&order_by=-Created At`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Token ${BASEROW_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      return { success: false, error: errorText }
    }

    const result = await response.json()
    return {
      success: true,
      rows: result.results || [],
      total: result.count || 0,
    }
  } catch (error) {
    console.error('Baserow fetch error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function updateSubmissionStatus(
  serviceSlug: string,
  rowId: number,
  status: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const tableId = SERVICE_TABLES[serviceSlug]
    if (!tableId) {
      return { success: false, error: `Unknown service: ${serviceSlug}` }
    }

    const response = await fetch(
      `${BASEROW_URL}/api/database/rows/table/${tableId}/${rowId}/?user_field_names=true`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${BASEROW_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Status: status }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      return { success: false, error: errorText }
    }

    return { success: true }
  } catch (error) {
    console.error('Baserow update error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Export table IDs for reference
export const BASEROW_TABLES = SERVICE_TABLES
