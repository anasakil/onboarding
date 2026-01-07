import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db/connect'
import { Service } from '@/lib/db/models'

// GET - Public: Fetch all active services (cached for 5 minutes)
export async function GET() {
  try {
    await connectDB()

    const services = await Service.find({ isActive: true })
      .select('name slug description icon color category')
      .sort({ category: 1, name: 1 })
      .lean()

    return NextResponse.json(services, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error('GET /api/services error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

// POST - Admin only: Create new service
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()

    // Generate slug from English name
    const slug = body.name.en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const service = await Service.create({
      ...body,
      slug,
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('POST /api/services error:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
