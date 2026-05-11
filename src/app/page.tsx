import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-background">
      {/*
        Z-Pattern Layout:
        - Top-left: Logo (handled by Header in layout)
        - Top-right: Login (handled by Header in layout)
        - Center: Bold hero message
        - Bottom-right: Primary CTA
      */}

      {/* Decorative minimal background element */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground">
            Clarity in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-primary to-blue-400">
              Education.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto">
            A comprehensive, distraction-free environment for nursing excellence.
          </p>
        </div>

        {/* Bottom Right CTA */}
        <div className="absolute bottom-12 right-4 md:right-12">
          <Link href="/login">
            <Button size="lg" className="rounded-full gap-2 group shadow-xl">
              Enter The HUB
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
