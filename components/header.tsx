"use client"

import { useState } from "react"
import { Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth"
import { useAuth } from "./auth-provider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()

  const handleLogout = async () => {
    try {
      console.log("DEBUG::Header", "Logging out...")
      await signOut()
      setIsMenuOpen(false)
      window.location.href = '/'
    } catch (error) {
      console.log("DEBUG::Header", "Logout error:", error)
    }
  }

  return (
    <header className="w-full border-b bg-background">
      <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Cathexis Dashboard</h1>
        </div>
        <nav className="flex items-center gap-4 relative">
          {user && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                <Menu className="w-8 h-8" />
              </Button>
              
              {isMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-muted-foreground border-b">
                        {user.email}
                      </div>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

