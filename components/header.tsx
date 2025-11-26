"use client"

import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="w-full border-b bg-background">
      <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Cathexis Dashboard</h1>
        </div>
        <nav className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-gray-400"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </nav>
      </div>
    </header>
  )
}

