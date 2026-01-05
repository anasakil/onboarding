import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db/connect'
import { OnboardingRequest, ActivityLog } from '@/lib/db/models'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const lead = await OnboardingRequest.findById(params.id)
      .populate('assignedTo', 'name email role')
      .populate('createdBy', 'name email')
      .populate('companyId')
      .populate('contactId')
      .lean()

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Get activity history
    const activities = await ActivityLog.find({
      entityType: 'onboarding_request',
      entityId: params.id,
    })
      .populate('actorId', 'name email')
      .sort({ createdAt: -1 })
      .limit(20)
      .lean()

    return NextResponse.json({ lead, activities })
  } catch (error) {
    console.error('GET /api/leads/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lead' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    const oldLead = await OnboardingRequest.findById(params.id)

    if (!oldLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const lead = await OnboardingRequest.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    )
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')

    // Log status change
    if (body.status && body.status !== oldLead.status) {
      await ActivityLog.create({
        entityType: 'onboarding_request',
        entityId: lead!._id,
        action: 'status_changed',
        actorId: session.user.id,
        message: `Status changed from ${oldLead.status} to ${body.status}`,
        metadata: {
          oldStatus: oldLead.status,
          newStatus: body.status,
        },
      })
    }

    // Log assignment change
    if (body.assignedTo && body.assignedTo !== oldLead.assignedTo?.toString()) {
      await ActivityLog.create({
        entityType: 'onboarding_request',
        entityId: lead!._id,
        action: 'assigned',
        actorId: session.user.id,
        message: 'Lead reassigned',
        metadata: {
          assignedTo: body.assignedTo,
        },
      })
    }

    return NextResponse.json(lead)
  } catch (error) {
    console.error('PATCH /api/leads/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const lead = await OnboardingRequest.findByIdAndDelete(params.id)

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Log deletion
    await ActivityLog.create({
      entityType: 'onboarding_request',
      entityId: params.id,
      action: 'deleted',
      actorId: session.user.id,
      message: `Lead deleted: ${lead.companyName || 'Unnamed'}`,
    })

    return NextResponse.json({ message: 'Lead deleted successfully' })
  } catch (error) {
    console.error('DELETE /api/leads/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    )
  }
}
