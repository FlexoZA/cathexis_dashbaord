"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Eye } from "lucide-react"

interface Device {
  id: number
  device_friendly_name: string
  device_serial: string
  status: 'online' | 'offline' | 'warning' | 'maintenance'
  group_name: string | null
}

interface DeviceViewDialogProps {
  device: Device
  children?: React.ReactNode
}

const statusConfig = {
  online: { label: 'Online', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  offline: { label: 'Offline', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  warning: { label: 'Warning', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  maintenance: { label: 'Maintenance', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
}

export function DeviceViewDialog({ device, children }: DeviceViewDialogProps) {
  console.log("DEBUG::DeviceViewDialog", { device })

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4" />
            View
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{device.device_friendly_name}</DialogTitle>
          <DialogDescription>
            Device details and status information
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serial" className="text-right">
              Serial
            </Label>
            <div className="col-span-3">
              <p className="text-sm font-mono">{device.device_serial}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <div className="col-span-3">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                  statusConfig[device.status].color
                }`}
              >
                {statusConfig[device.status].label}
              </span>
            </div>
          </div>
          {device.group_name && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="group" className="text-right">
                Group
              </Label>
              <div className="col-span-3">
                <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border bg-gray-500/10 text-gray-700 border-gray-500/20">
                  {device.group_name}
                </span>
              </div>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              ID
            </Label>
            <div className="col-span-3">
              <p className="text-sm text-muted-foreground">{device.id}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
