"use client"

import { DeviceList } from "@/components/device-list"

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-300">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-3">
            Cathexis Dashboard
          </h1>
          <p className="text-muted-foreground md:text-lg">
            View and configure your dashcam devices
          </p>
        </div>
        <DeviceList />
      </div>
    </div>
  )
}

