"use client"

import { useState, useMemo } from "react"
import { Eye, Play, Search, Plus } from "lucide-react"

interface Device {
  id: string
  device_friendly_name: string
  device_serial: string
  status: 'online' | 'offline' | 'warning' | 'maintenance'
}

// Mock data for demonstration
const mockDevices: Device[] = [
  {
    id: '1',
    device_friendly_name: 'Main Entrance Camera',
    device_serial: 'CAM-2024-001',
    status: 'online',
  },
  {
    id: '2',
    device_friendly_name: 'Parking Lot Camera',
    device_serial: 'CAM-2024-002',
    status: 'online',
  },
  {
    id: '3',
    device_friendly_name: 'Warehouse Camera',
    device_serial: 'CAM-2024-003',
    status: 'offline',
  },
  {
    id: '4',
    device_friendly_name: 'Loading Bay Camera',
    device_serial: 'CAM-2024-004',
    status: 'warning',
  },
  {
    id: '5',
    device_friendly_name: 'Reception Camera',
    device_serial: 'CAM-2024-005',
    status: 'maintenance',
  },
  {
    id: '6',
    device_friendly_name: 'Back Office Camera',
    device_serial: 'CAM-2024-006',
    status: 'online',
  },
]

const statusConfig = {
  online: { label: 'Online', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  offline: { label: 'Offline', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  warning: { label: 'Warning', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  maintenance: { label: 'Maintenance', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
}

export function DeviceList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredDevices = useMemo(() => {
    return mockDevices.filter((device) => {
      const matchesSearch = 
        device.device_friendly_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.device_serial.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || device.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm bg-white"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="warning">Warning</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>
      
      <hr className="border-gray-300 mb-6" />
      
      <div className="mb-6 flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-gray-400">
          <Plus className="w-4 h-4" />
          Add new device
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className="bg-white/80 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col"
          >
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-base font-semibold text-gray-900">
                      {device.device_friendly_name}
                    </h3>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                        statusConfig[device.status].color
                      }`}
                    >
                      {statusConfig[device.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {device.device_serial}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold flex-shrink-0 ml-3">
                  {device.device_friendly_name.charAt(0)}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 p-4 bg-gray-50/50 rounded-b-lg">
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400">
                  <Play className="w-4 h-4" />
                  Stream
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

