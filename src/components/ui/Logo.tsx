import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-baseline space-x-1", className)}>
      <span className="text-xl font-light tracking-tight">The</span>
      <span className="text-xl font-black tracking-tighter">HUB</span>
      <span className="h-2.5 w-2.5 rounded-full bg-green-success" />
    </Link>
  )
}
