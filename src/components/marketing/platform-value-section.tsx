import { CheckCircle2 } from "lucide-react"

import { coreValues } from "@/components/marketing/data"
import { SectionHeading } from "@/components/marketing/section-heading"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PlatformValueSection() {
  return (
    <section id="platform" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Platform Value"
        title="A product-led operations page built around workflow and outcomes"
        description="Lead with real product screens and business outcomes. MansaStock is strongest when shown as a connected workflow across checkout, stock management, team permissions, and analytics."
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {coreValues.map((value) => {
          const Icon = value.icon
          return (
            <Card key={value.title} className="border-white/10 bg-zinc-900/70 py-0">
              <CardHeader className="p-5 pb-3">
                <div className="mb-3 flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-emerald-200">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg font-semibold tracking-tight text-white">{value.title}</CardTitle>
                <CardDescription className="leading-6 text-zinc-400">{value.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <ul className="space-y-2" aria-label={`${value.title} capabilities`}>
                  {value.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-zinc-200">
                      <CheckCircle2 className="size-4 text-emerald-300" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

