"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Settings, Activity, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

interface Device {
  id: number
  friendly_name: string | null
  serial: string | null
  device_model: string | null
  status: 'online' | 'offline' | 'warning' | 'maintenance' | null
  created_at: string
  client_id: number | null
  group_id: number | null
  groups?: {
    name: string
  } | null
}

const statusConfig = {
  online: { label: 'Online', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  offline: { label: 'Offline', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  warning: { label: 'Warning', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  maintenance: { label: 'Maintenance', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
}

export default function DevicePage() {
  const params = useParams()
  const router = useRouter()
  const [device, setDevice] = useState<Device | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const deviceId = params.id as string

  useEffect(() => {
    fetchDevice()
  }, [deviceId])

  async function fetchDevice() {
    try {
      setLoading(true)
      console.log("DEBUG::DevicePage", "Fetching device:", deviceId)

      const { data, error } = await supabase
        .from('device')
        .select(`
          *,
          groups (
            name
          )
        `)
        .eq('id', parseInt(deviceId))
        .single()

      console.log("DEBUG::DevicePage", "Supabase response:", { data, error })

      if (error) {
        console.log("DEBUG::DevicePage", "Error fetching device:", error)
        throw error
      }

      if (!data) {
        throw new Error('Device not found')
      }

      console.log("DEBUG::DevicePage", "Device data:", data)
      setDevice(data)
    } catch (err: any) {
      console.log("DEBUG::DevicePage", "Catch block error:", err)
      setError(err.message || 'Failed to fetch device')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
          <div className="text-center py-12">
            <p className="text-gray-600">Loading device...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !device) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
          <div className="text-center py-12">
            <p className="text-destructive">{error || 'Device not found'}</p>
            <Button
              onClick={() => router.push('/')}
              className="mt-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Devices
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {device.friendly_name || 'Unnamed Device'}
                </h1>
                <p className="text-sm text-gray-600">
                  Device #{device.id}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full border ${
                  statusConfig[device.status || 'offline'].color
                }`}
              >
                {statusConfig[device.status || 'offline'].label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Device Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Friendly Name</label>
                <p className="text-sm text-gray-900 mt-1">
                  {device.friendly_name || 'Not set'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Serial Number</label>
                <p className="text-sm font-mono text-gray-900 mt-1">
                  {device.serial || 'Not available'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Device Model</label>
                <p className="text-sm text-gray-900 mt-1">
                  {device.device_model || 'Unknown'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Group</label>
                <p className="text-sm text-gray-900 mt-1">
                  {device.groups?.name || 'No group assigned'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Created</label>
                <p className="text-sm text-gray-900 mt-1">
                  {new Date(device.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Status & Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Status & Activity
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Current Status</label>
                <div className="mt-1">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full border ${
                      statusConfig[device.status || 'offline'].color
                    }`}
                  >
                    {statusConfig[device.status || 'offline'].label}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Last Updated</label>
                <p className="text-sm text-gray-900 mt-1">
                  {new Date().toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Client ID</label>
                <p className="text-sm font-mono text-gray-900 mt-1">
                  {device.client_id || 'Not assigned'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Future sections for more data */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Location/Network Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Location & Network
            </h2>
            <div className="text-center py-8 text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Location and network information coming soon</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activity
            </h2>
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Activity logs and history coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
