import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db/connect'
import { Service } from '@/lib/db/models'

export const dynamic = 'force-dynamic'

// GET - Admin only: Fetch all services (including inactive)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const services = await Service.find()
      .sort({ category: 1, name: 1 })
      .lean()

    return NextResponse.json(services)
  } catch (error) {
    console.error('GET /api/admin/services error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}
