import { ArrowRight, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function FinalCtaSection() {
  return (
    <section id="book-demo" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8">
      <Card className="relative overflow-hidden border-emerald-300/20 bg-zinc-900/85 py-0">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
        <CardContent className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-4">
            <Badge className="bg-white/5 text-emerald-200 ring-1 ring-inset ring-emerald-400/20">
              Final CTA
            </Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Book a demo for your business and set up your store operations
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
              Position MansaStock as the operations control center for sales, inventory, team access, and analytics. Lead with the workflow. Show the real product.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-11 bg-primary px-5 text-primary-foreground hover:bg-primary/90">
                <Link to="/" aria-label="Book a demo for your business">
                  Book a Demo
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 border-white/10 bg-white/5 px-5 text-zinc-100 hover:bg-white/10">
                <a href="#platform">
                  Explore the Platform
                  <ChevronRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Card className="border-white/10 bg-white/5 py-0">
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Positioning</p>
                <p className="mt-2 text-sm leading-6 text-zinc-200">
                  An all-in-one business operations control center for sales, inventory, team access, and analytics.
                </p>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5 py-0">
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Messaging Angle</p>
                <p className="mt-2 text-sm leading-6 text-zinc-200">
                  Built for daily store operations. From checkout to stock decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

