import { targetSegments } from "@/components/marketing/data"
import { SectionHeading } from "@/components/marketing/section-heading"
import { Card, CardContent } from "@/components/ui/card"

export function TargetSegmentsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Best Fit"
        title="Who MansaStock fits best today"
        description="Based on the current product shape, the clearest fit is businesses running daily counter sales with inventory visibility and multi-user operations."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {targetSegments.map((segment) => {
          const Icon = segment.icon
          return (
            <Card key={segment.title} className="border-white/10 bg-zinc-900/70 py-0">
              <CardContent className="p-5">
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-emerald-200">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-white">{segment.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{segment.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

