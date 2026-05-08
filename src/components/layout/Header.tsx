"use client"

import * as React from "react"
import { Logo } from "@/components/ui/Logo"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Moon, Sun } from "lucide-react"

export function Header() {
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
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link href="/login">
            <Button variant="outline" className="rounded-full">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
