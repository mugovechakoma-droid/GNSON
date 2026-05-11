"use client"

import * as React from "react"
import { Logo } from "@/components/ui/Logo"
import { Button } from "@/components/ui/Button"
import { Moon, Sun, HelpCircle, Mail } from "lucide-react"
import { LogoutButton } from "./LogoutButton"

export function Header({ isLoggedIn }: { isLoggedIn?: boolean }) {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    // Check initial preference, use setTimeout to avoid calling setState directly in effect
    const isDarkMode = document.documentElement.classList.contains('dark')
    if (isDarkMode !== isDark) {
      const timeoutId = setTimeout(() => setIsDark(isDarkMode), 0)
      return () => clearTimeout(timeoutId)
    }
  }, [isDark])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Logo />
        <div className="flex items-center space-x-2 md:space-x-4">

          {/* Secondary Links for unauthenticated view */}
          {!isLoggedIn && (
            <div className="hidden md:flex items-center space-x-2 mr-2">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-foreground">
                <HelpCircle className="mr-2 h-4 w-4" /> Help
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-foreground">
                <Mail className="mr-2 h-4 w-4" /> Contact Admin
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {isLoggedIn && <LogoutButton />}
          {/* Removed login button, since it is embedded in the Z-pattern landing page */}
        </div>
      </div>
    </header>
  )
}
