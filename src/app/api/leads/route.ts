import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db/connect'
import { OnboardingRequest, Admin, ActivityLog } from '@/lib/db/models'
import { calculateLeadScore } from '@/lib/scoring/lead-scoring'
import { determineAssignment } from '@/lib/rules/auto-assignment'
import { syncOnboardingToBaserow } from '@/lib/baserow'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const assignedTo = searchParams.get('assignedTo')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const query: Record<string, unknown> = {}
    if (status) query.status = status
    if (assignedTo) query.assignedTo = assignedTo

    const [leads, total] = await Promise.all([
      OnboardingRequest.find(query)
        .populate('assignedTo', 'name email')
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      OnboardingRequest.countDocuments(query),
    ])

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('GET /api/leads error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()

    // Calculate lead score
    const scoreResult = calculateLeadScore({
      budgetRange: body.budgetRange,
      urgency: body.urgency,
      services: body.services,
      companySize: body.companySize,
      decisionPower: body.decisionPower,
    })

    // Determine assignment
    const assignmentResult = determineAssignment({
      budgetRange: body.budgetRange,
      services: body.services,
      priorityScore: scoreResult.score,
    })

    // Find assigned team member if auto-assigning
    let assignedToId = body.assignedTo
    if (!assignedToId || assignedToId === 'auto') {
      // Get team members and assign to first available
      const teamMembers = await Admin.find({
        role: { $in: ['manager', 'sales'] },
      }).limit(1)
      if (teamMembers.length > 0) {
        assignedToId = teamMembers[0]._id.toString()
      }
    }

    // Create the lead
    const lead = await OnboardingRequest.create({
      leadType: body.leadType,
      companyName: body.companyName,
      companyType: body.companyType,
      industry: body.industry,
      companySize: body.companySize,
      services: body.services,
      goals: body.goals,
      challenges: body.challenges,
      budgetRange: body.budgetRange,
      urgency: body.urgency,
      timeline: body.timeline,
      decisionPower: body.decisionPower,
      source: body.source,
      contactName: body.contactName,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      status: 'new',
      priorityScore: scoreResult.score,
      priorityLevel: scoreResult.level,
      assignedTo: assignedToId,
      createdBy: session.user.id,
    })

    // Log the activity
    await ActivityLog.create({
      entityType: 'onboarding_request',
      entityId: lead._id,
      action: 'created',
      actorId: session.user.id,
      message: `New lead created: ${body.companyName || 'Unnamed'}`,
      metadata: {
        priorityScore: scoreResult.score,
        priorityLevel: scoreResult.level,
        assignmentRule: assignmentResult.ruleApplied,
      },
    })

    // Sync to Baserow (non-blocking)
    syncOnboardingToBaserow({
      _id: lead._id.toString(),
      leadType: body.leadType,
      companyName: body.companyName,
      companyType: body.companyType,
      industry: body.industry,
      companySize: body.companySize,
      contactName: body.contactName,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      services: body.services,
      goals: body.goals,
      challenges: body.challenges,
      budgetRange: body.budgetRange,
      urgency: body.urgency,
      timeline: body.timeline,
      decisionPower: body.decisionPower,
      status: 'new',
      priorityScore: scoreResult.score,
      priorityLevel: scoreResult.level,
      assignedTo: assignedToId || '',
      createdBy: session.user.id,
      source: body.source,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    }).then(result => {
      if (!result.success) {
        console.error('Failed to sync to Baserow:', result.error)
      } else {
        console.log('Synced to Baserow, row ID:', result.rowId)
      }
    }).catch(err => {
      console.error('Baserow sync error:', err)
    })

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    console.error('POST /api/leads error:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}
