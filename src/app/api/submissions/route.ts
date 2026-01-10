import { NextRequest, NextResponse } from 'next/server'
import { saveSubmissionToBaserow, getSubmissionsFromBaserow, BASEROW_TABLES } from '@/lib/baserow'

export const dynamic = 'force-dynamic'

// GET - Fetch submissions from Baserow for a specific service
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const serviceSlug = searchParams.get('service')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!serviceSlug) {
      return NextResponse.json(
        { error: 'Service slug is required. Use ?service=cold-email-marketing' },
        { status: 400 }
      )
    }

    if (!BASEROW_TABLES[serviceSlug]) {
      return NextResponse.json(
        { error: `Unknown service: ${serviceSlug}. Available: ${Object.keys(BASEROW_TABLES).join(', ')}` },
        { status: 400 }
      )
    }

    const result = await getSubmissionsFromBaserow(serviceSlug, page, limit)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      service: serviceSlug,
      submissions: result.rows,
      pagination: {
        page,
        limit,
        total: result.total,
        pages: Math.ceil((result.total || 0) / limit),
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

// POST - Save submission to Baserow (service-specific table)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const serviceSlug = body.serviceSlug || body.slug
    const formData = body.data || body

    if (!serviceSlug) {
      return NextResponse.json(
        { error: 'serviceSlug is required' },
        { status: 400 }
      )
    }

    if (!BASEROW_TABLES[serviceSlug]) {
      return NextResponse.json(
        { error: `Unknown service: ${serviceSlug}. Available: ${Object.keys(BASEROW_TABLES).join(', ')}` },
        { status: 400 }
      )
    }

    // Save to the service-specific Baserow table
    const result = await saveSubmissionToBaserow(serviceSlug, formData)

    if (!result.success) {
      console.error('Failed to save to Baserow:', result.error)
      return NextResponse.json(
        { error: 'Failed to save submission', details: result.error },
        { status: 500 }
      )
    }

    console.log(`Saved to Baserow table for ${serviceSlug}, row ID:`, result.rowId)

    return NextResponse.json({
      success: true,
      id: result.rowId,
      service: serviceSlug,
      message: 'Submission saved successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('POST /api/submissions error:', error)
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}
