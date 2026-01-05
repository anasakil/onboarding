import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db/connect'
import { Submission } from '@/lib/db/models'

export const dynamic = 'force-dynamic'

// GET - Admin only: Fetch all submissions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const serviceId = searchParams.get('serviceId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const query: Record<string, unknown> = {}
    if (status) query.status = status
    if (serviceId) query.serviceId = serviceId

    const [submissions, total] = await Promise.all([
      Submission.find(query)
        .populate('assignedTo', 'name email')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Submission.countDocuments(query),
    ])

    return NextResponse.json({
      submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('GET /api/submissions error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

// POST - Public: Create new submission (client form submission)
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    const submission = await Submission.create({
      serviceId: body.serviceId,
      serviceName: body.serviceName,
      data: body.data,
      clientEmail: body.clientEmail,
      clientName: body.clientName,
      clientPhone: body.clientPhone,
      status: 'pending',
    })

    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    console.error('POST /api/submissions error:', error)
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}
