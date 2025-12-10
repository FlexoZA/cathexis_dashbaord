import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.CWE_MVR_API_KEY

export async function POST(request: NextRequest) {
  try {
    if (!API_KEY) {
      console.log("DEBUG::StreamStopAPI", "Error:", "Missing API key")
      return NextResponse.json(
        { ok: false, error: 'API key not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { serial, camera, profile } = body

    console.log("DEBUG::StreamStopAPI", "Stopping stream:", { serial, camera, profile })

    // Call the backend server directly for stop command
    const backendUrl = `http://185.202.223.35:9000/api/units/${serial}/stream/stop`
    console.log("DEBUG::StreamStopAPI", "Backend URL:", backendUrl)

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        camera,
        profile
      })
    })

    const data = await response.json()
    console.log("DEBUG::StreamStopAPI", "Backend response:", data)

    return NextResponse.json(data)
  } catch (error: any) {
    console.log("DEBUG::StreamStopAPI", "Error:", error)
    return NextResponse.json(
      { ok: false, error: error.message || 'Failed to stop stream' },
      { status: 500 }
    )
  }
}

