import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { SectionHeading } from "@/components/marketing/section-heading"
import { workflowSteps } from "@/components/marketing/data"

export function WorkflowSection() {
  return (
    <section id="workflow" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Workflow"
          title="Show the end-to-end daily operating loop"
          description="The strongest message for this product is the connected operational sequence: add products, sell in POS, review what sold, inspect trends, and refine access and settings."
        />

        <Card className="border-white/10 bg-zinc-900/75 py-0">
          <CardContent className="p-5 sm:p-6">
            <ol className="space-y-4">
              {workflowSteps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex size-8 items-center justify-center rounded-full border border-emerald-400/30 bg-white/5 text-sm font-semibold text-emerald-200">
                      {index + 1}
                    </div>
                    {index < workflowSteps.length - 1 ? (
                      <div className="mt-2 h-full w-px bg-gradient-to-b from-white/30 to-transparent" />
                    ) : null}
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-medium tracking-wide text-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
          <CardFooter className="justify-between gap-4 border-white/10 bg-white/5 text-zinc-300">
            <span className="text-sm">From checkout to stock decisions</span>
            <Badge className="bg-white/5 text-emerald-200 ring-1 ring-inset ring-emerald-400/20">
              Built for daily store operations
            </Badge>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}


