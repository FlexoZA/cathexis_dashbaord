import { NextRequest, NextResponse } from 'next/server'

const BACKEND_BASE_URL = 'http://185.202.223.35:9000'

function buildCommandUrl(serial: string) {
  return `${BACKEND_BASE_URL}/api/units/${encodeURIComponent(serial)}/command`
}

export async function GET(request: NextRequest) {
  try {
    const serial = request.nextUrl.searchParams.get('serial')

    if (!serial) {
      return NextResponse.json(
        { ok: false, error: 'serial is required' },
        { status: 400 }
      )
    }

    console.log("DEBUG::DeviceConfigAPI", { action: 'request_config', serial })

    const response = await fetch(buildCommandUrl(serial), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'request_config',
      }),
    })

    const data = await response.json()
    console.log("DEBUG::DeviceConfigAPI", { action: 'request_config_result', serial, data })

    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    console.log("DEBUG::DeviceConfigAPI", { action: 'request_config_error', error })
    return NextResponse.json(
      { ok: false, error: error?.message || 'Failed to fetch device config' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { serial, updates } = body || {}

    if (!serial) {
      return NextResponse.json(
        { ok: false, error: 'serial is required' },
        { status: 400 }
      )
    }

    if (!updates || Object.keys(updates).length === 0) {
      return NextResponse.json(
        { ok: false, error: 'updates payload is empty' },
        { status: 400 }
      )
    }

    console.log("DEBUG::DeviceConfigAPI", { action: 'update_config', serial, updatedSections: Object.keys(updates) })

    const response = await fetch(buildCommandUrl(serial), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'update_config',
        payload: updates,
      }),
    })

    const data = await response.json()
    console.log("DEBUG::DeviceConfigAPI", { action: 'update_config_result', serial, data })

    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    console.log("DEBUG::DeviceConfigAPI", { action: 'update_config_error', error })
    return NextResponse.json(
      { ok: false, error: error?.message || 'Failed to update device config' },
      { status: 500 }
    )
  }
}

