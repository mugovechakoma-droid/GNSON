"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Activity, Brain, CheckCircle2, XCircle, Award } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SimulationPage() {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showRationale, setShowRationale] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const scenarios = [
    {
      title: "Acute Respiratory Distress",
      patient: "A 65-year-old male presents with severe shortness of breath, audible wheezing, and a respiratory rate of 28 breaths per minute. O2 saturation is 88% on room air.",
      question: "What is your immediate first action?",
      options: [
        { text: "Administer Albuterol via nebulizer", correct: false, rationale: "While indicated, ensuring adequate oxygenation takes precedence." },
        { text: "Apply high-flow oxygen via non-rebreather mask", correct: true, rationale: "Correct. The patient is hypoxic (SpO2 88%). The ABCs (Airway, Breathing, Circulation) dictate immediate oxygenation." },
        { text: "Draw arterial blood gases (ABG)", correct: false, rationale: "This is a diagnostic step and should not delay immediate life-saving interventions." },
        { text: "Prepare for intubation", correct: false, rationale: "Premature. Less invasive oxygen therapy should be attempted first unless the patient is in frank respiratory failure." }
      ]
    },
    {
      title: "Post-operative Hemorrhage",
      patient: "A 42-year-old female is 2 hours post-op from a cholecystectomy. Her heart rate has increased from 85 to 115 bpm, and blood pressure dropped from 120/80 to 90/60 mmHg. She appears pale and restless.",
      question: "Which of the following is the most appropriate initial nursing intervention?",
      options: [
        { text: "Administer prescribed pain medication", correct: false, rationale: "Restlessness can be a sign of pain, but the vital sign changes strongly suggest hypovolemia/bleeding." },
        { text: "Elevate the head of the bed to 45 degrees", correct: false, rationale: "This could exacerbate hypotension by decreasing venous return to the heart." },
        { text: "Increase the IV fluid rate and notify the surgeon immediately", correct: true, rationale: "Correct. Tachycardia, hypotension, pallor, and restlessness are classic signs of hypovolemic shock, likely due to internal bleeding. IV fluids support blood pressure while awaiting surgical intervention." },
        { text: "Check the surgical dressing for bleeding", correct: false, rationale: "While important, internal bleeding is common after this surgery. Fluid resuscitation and notifying the provider are higher priorities given the unstable vitals." }
      ]
    },
    {
      title: "Medication Error Prevention",
      patient: "You are preparing to administer Digoxin 0.125 mg IV push to a patient with heart failure. The patient's morning lab results show a Potassium level of 3.1 mEq/L.",
      question: "What is your next action?",
      options: [
        { text: "Administer the medication as prescribed", correct: false, rationale: "Hypokalemia increases the risk of digoxin toxicity, potentially causing fatal arrhythmias." },
        { text: "Hold the Digoxin and notify the healthcare provider", correct: true, rationale: "Correct. A potassium level of 3.1 mEq/L is low (normal 3.5-5.0). Hypokalemia sensitizes the myocardium to digoxin, leading to toxicity." },
        { text: "Administer a potassium supplement and then the Digoxin", correct: false, rationale: "Nurses cannot prescribe medications. You must notify the provider to get an order for potassium replacement." },
        { text: "Dilute the Digoxin in 50 mL of Normal Saline and infuse over 30 minutes", correct: false, rationale: "Dilution does not mitigate the risk of toxicity caused by the underlying hypokalemia." }
      ]
    }
  ]

  const currentScenario = scenarios[currentScenarioIndex]

  const handleSelect = (idx: number) => {
    if (showRationale) return
    setSelectedAnswer(idx)
    setShowRationale(true)
    if (currentScenario.options[idx].correct) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowRationale(false)
    } else {
      setIsFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentScenarioIndex(0)
    setSelectedAnswer(null)
    setShowRationale(false)
    setScore(0)
    setIsFinished(false)
  }

  if (isFinished) {
    const percentage = Math.round((score / scenarios.length) * 100)
    return (
      <div className="flex-1 flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md shadow-2xl border-0 text-center py-8">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Award className={cn("h-16 w-16", percentage >= 70 ? "text-green-success" : "text-orange-error")} />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">Simulation Complete</CardTitle>
            <CardDescription className="text-lg mt-2">
              You scored {score} out of {scenarios.length} ({percentage}%)
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <p className="text-gray-500 mb-8">
              {percentage >= 70
                ? "Excellent clinical judgment. Your responses align well with evidence-based practices."
                : "Review the rationales closely. Focus on prioritizing ABCs and recognizing critical lab values."}
            </p>
            <Button className="w-full rounded-2xl h-12" onClick={handleRestart}>
              Restart Simulations
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Virtual Clinical Simulations</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Practice clinical judgment safely with AI-adaptive feedback.</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-500">Scenario</span>
            <p className="text-xl font-bold">{currentScenarioIndex + 1} / {scenarios.length}</p>
          </div>
        </div>

        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient Scenario */}
          <Card className="col-span-1 md:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Activity className="h-6 w-6 text-orange-error" />
                <CardTitle>Case: {currentScenario.title}</CardTitle>
              </div>
              <CardDescription>Review the patient presentation carefully.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-lg leading-relaxed">
                {currentScenario.patient}
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-xl mb-4">{currentScenario.question}</h3>
                <div className="space-y-3">
                  {currentScenario.options.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx
                    const isCorrect = opt.correct

                    let btnClass = "w-full justify-start h-auto py-4 px-6 text-left whitespace-normal rounded-xl border-2 border-transparent transition-all "

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
                          {showRationale && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-success ml-2 flex-shrink-0" />}
                          {showRationale && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-orange-error ml-2 flex-shrink-0" />}
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
                  <div className={cn("p-4 rounded-xl border", selectedAnswer !== null && currentScenario.options[selectedAnswer].correct ? "bg-green-success/10 border-green-success/20 text-green-800 dark:text-green-200" : "bg-orange-error/10 border-orange-error/20 text-orange-800 dark:text-orange-200")}>
                    <p className="font-bold mb-2">
                      {selectedAnswer !== null && currentScenario.options[selectedAnswer].correct ? "Excellent Judgment." : "Let's review."}
                    </p>
                    <p className="text-sm">
                      {selectedAnswer !== null && currentScenario.options[selectedAnswer].rationale}
                    </p>
                  </div>
                  <Button className="w-full mt-4" onClick={handleNext}>
                    {currentScenarioIndex < scenarios.length - 1 ? "Next Scenario \u2192" : "View Results"}
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
