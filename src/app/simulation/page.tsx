"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Activity, Brain, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SimulationPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showRationale, setShowRationale] = useState(false)

  const scenario = {
    title: "Acute Respiratory Distress",
    patient: "A 65-year-old male presents with severe shortness of breath, audible wheezing, and a respiratory rate of 28 breaths per minute. O2 saturation is 88% on room air.",
    question: "What is your immediate first action?",
    options: [
      { text: "Administer Albuterol via nebulizer", correct: false, rationale: "While indicated, ensuring adequate oxygenation takes precedence." },
      { text: "Apply high-flow oxygen via non-rebreather mask", correct: true, rationale: "Correct. The patient is hypoxic (SpO2 88%). The ABCs (Airway, Breathing, Circulation) dictate immediate oxygenation." },
      { text: "Draw arterial blood gases (ABG)", correct: false, rationale: "This is a diagnostic step and should not delay immediate life-saving interventions." },
      { text: "Prepare for intubation", correct: false, rationale: "Premature. Less invasive oxygen therapy should be attempted first unless the patient is in frank respiratory failure." }
    ]
  }

  const handleSelect = (idx: number) => {
    if (showRationale) return
    setSelectedAnswer(idx)
    setShowRationale(true)
  }

  return (
    <div className="flex-1 bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Virtual Clinical Simulations</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Practice clinical judgment safely with AI-adaptive feedback.</p>
        </div>

        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient Scenario */}
          <Card className="col-span-1 md:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Activity className="h-6 w-6 text-orange-error" />
                <CardTitle>Case: {scenario.title}</CardTitle>
              </div>
              <CardDescription>Review the patient presentation carefully.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-lg leading-relaxed">
                {scenario.patient}
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-xl mb-4">{scenario.question}</h3>
                <div className="space-y-3">
                  {scenario.options.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx
                    const isCorrect = opt.correct

                    let btnClass = "w-full justify-start h-auto py-4 px-6 text-left whitespace-normal h-auto rounded-xl border-2 border-transparent transition-all "

                    if (showRationale) {
                      if (isCorrect) {
                        btnClass += "bg-green-50 dark:bg-green-950 border-green-success/50 text-green-900 dark:text-green-100"
                      } else if (isSelected) {
                        btnClass += "bg-orange-50 dark:bg-orange-950 border-orange-error/50 text-orange-900 dark:text-orange-100"
                      } else {
                        btnClass += "bg-gray-50 dark:bg-gray-900 opacity-50"
                      }
                    } else {
                      btnClass += "bg-gray-50 dark:bg-gray-900 hover:border-blue-primary/30 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={showRationale}
                        className={btnClass}
                      >
                        <div className="flex items-center w-full">
                          <span className="flex-1">{opt.text}</span>
                          {showRationale && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-success ml-2" />}
                          {showRationale && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-orange-error ml-2" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Feedback Panel */}
          <Card className="col-span-1 border-0 shadow-lg bg-blue-primary/5 dark:bg-blue-primary/10">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Brain className="h-6 w-6 text-blue-primary" />
                <CardTitle>AI Feedback</CardTitle>
              </div>
              <CardDescription>Clinical rationale engine.</CardDescription>
            </CardHeader>
            <CardContent>
              {showRationale ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className={cn("p-4 rounded-xl border", selectedAnswer !== null && scenario.options[selectedAnswer].correct ? "bg-green-success/10 border-green-success/20 text-green-800 dark:text-green-200" : "bg-orange-error/10 border-orange-error/20 text-orange-800 dark:text-orange-200")}>
                    <p className="font-bold mb-2">
                      {selectedAnswer !== null && scenario.options[selectedAnswer].correct ? "Excellent Judgment." : "Let's review."}
                    </p>
                    <p className="text-sm">
                      {selectedAnswer !== null && scenario.options[selectedAnswer].rationale}
                    </p>
                  </div>
                  <Button className="w-full mt-4" onClick={() => {
                    setSelectedAnswer(null)
                    setShowRationale(false)
                  }}>
                    Next Scenario &rarr;
                  </Button>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 p-8">
                  <Brain className="h-12 w-12 mb-4 opacity-20" />
                  <p className="text-sm">Make a selection to receive adaptive clinical feedback.</p>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
