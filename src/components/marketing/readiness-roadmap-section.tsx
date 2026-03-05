import { Lock } from "lucide-react"

import { comingSoon, readySignals } from "@/components/marketing/data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ReadinessRoadmapSection() {
  return (
    <section id="readiness" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8">
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-white/10 bg-zinc-900/75 py-0">
          <CardHeader className="p-6 pb-3">
            <Badge variant="outline" className="w-fit border-emerald-300/25 bg-white/5 text-emerald-200">
              Operations Readiness
            </Badge>
            <CardTitle className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Trust signals you can market today
            </CardTitle>
            <CardDescription className="max-w-2xl leading-6 text-zinc-400">
              Present the technical strengths in business language so buyers understand this is built for operational control, shared access, and organized data boundaries.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 p-6 pt-2 sm:grid-cols-2">
            {readySignals.map((signal) => (
              <div key={signal} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200">
                <Lock className="size-4 text-emerald-300" aria-hidden="true" />
                <span>{signal}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card id="roadmap" className="scroll-mt-24 border-white/10 bg-zinc-900/75 py-0">
          <CardHeader className="p-6 pb-3">
            <Badge variant="outline" className="w-fit border-blue-300/20 bg-blue-400/10 text-blue-200">
              What&apos;s Next
            </Badge>
            <CardTitle className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Roadmap momentum, clearly labeled
            </CardTitle>
            <CardDescription className="leading-6 text-zinc-400">
              These modules are strong &quot;coming soon&quot; signals. Position them as forward momentum, not fully launched features.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <div className="flex flex-wrap gap-2">
              {comingSoon.map((item) => (
                <Badge key={item} variant="outline" className="border-white/10 bg-white/5 px-2.5 py-1 text-zinc-200">
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-between gap-3 border-white/10 bg-white/5">
            <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Status</p>
            <Badge className="bg-amber-400/10 text-amber-200 ring-1 ring-inset ring-amber-300/20">
              Coming soon modules
            </Badge>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

