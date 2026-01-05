import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db/connect'
import { Admin } from '@/lib/db/models'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const teamMembers = await Admin.find({
      role: { $in: ['admin', 'manager', 'sales'] },
    })
      .select('_id name email role')
      .sort({ name: 1 })
      .lean()

    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error('GET /api/team error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}
