"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Mail, Building, Loader2, CheckCircle2 } from "lucide-react"
import { generateOfferLetters, runAutoAllocation } from "@/actions/admissions"

export function AdmissionsActions() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isAllocating, setIsAllocating] = useState(false)

  const [generateMsg, setGenerateMsg] = useState("")
  const [allocateMsg, setAllocateMsg] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenerateMsg("")
    const res = await generateOfferLetters()
    setIsGenerating(false)
    if (res.success && res.message) {
      setGenerateMsg(res.message)
      setTimeout(() => setGenerateMsg(""), 5000)
    }
  }

  const handleAllocate = async () => {
    setIsAllocating(true)
    setAllocateMsg("")
    const res = await runAutoAllocation()
    setIsAllocating(false)
    if (res.success && res.message) {
      setAllocateMsg(res.message)
      setTimeout(() => setAllocateMsg(""), 5000)
    }
  }

  return (
    <Card className="col-span-1 border-0 shadow-lg h-full">
      <CardHeader>
        <CardTitle>Admissions & Allocation</CardTitle>
        <CardDescription>Manage student intake operations.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">

        <div className="space-y-2">
          <Button
            className="w-full justify-start h-12 relative overflow-hidden group"
            variant="outline"
            onClick={handleGenerate}
            disabled={isGenerating || !!generateMsg}
          >
            {isGenerating ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
            ) : generateMsg ? (
              <span className="text-green-success flex items-center"><CheckCircle2 className="mr-2 h-5 w-5" /> Success</span>
            ) : (
              <><Mail className="mr-2 h-5 w-5" /> Generate Offer Letters</>
            )}
          </Button>
          {generateMsg && <p className="text-xs text-green-success font-medium px-2">{generateMsg}</p>}
        </div>

        <div className="space-y-2">
          <Button
            className="w-full justify-start h-12"
            variant="outline"
            onClick={handleAllocate}
            disabled={isAllocating || !!allocateMsg}
          >
            {isAllocating ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Algorithm Running...</>
            ) : allocateMsg ? (
              <span className="text-green-success flex items-center"><CheckCircle2 className="mr-2 h-5 w-5" /> Success</span>
            ) : (
              <><Building className="mr-2 h-5 w-5" /> Run Auto-Allocation</>
            )}
          </Button>
          {allocateMsg && <p className="text-xs text-green-success font-medium px-2">{allocateMsg}</p>}
        </div>

      </CardContent>
    </Card>
  )
}
