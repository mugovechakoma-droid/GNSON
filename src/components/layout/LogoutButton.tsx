"use client"

import { Button } from "@/components/ui/Button"
import { logoutAction } from "@/actions/auth"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutAction()
    // Redirect to landing page and force refresh to clear state
    router.push("/")
    router.refresh()
  }

  return (
    <Button variant="outline" className="rounded-full" onClick={handleLogout}>
      Logout
    </Button>
  )
}
