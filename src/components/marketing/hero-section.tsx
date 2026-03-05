import { ArrowRight, CheckCircle2, MonitorPlay, ShieldCheck } from "lucide-react"

import { heroScreenshots } from "@/components/marketing/data"
import { ScreenshotFrame } from "@/components/marketing/screenshot-frame"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
        <div className="space-y-7">
          <div className="space-y-5">
            <Badge className="bg-white/5 text-emerald-200 ring-1 ring-inset ring-emerald-400/20">
              Sales + Inventory + Team + Analytics
            </Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Run Sales, Stock, and Staff from One Control Center
            </h1>
            <p className="text-pretty max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              MansaStock is an all-in-one business operations control center for checkout,
              inventory, team access, and performance analytics built for daily store operations.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 bg-primary px-5 text-primary-foreground hover:bg-primary/90">
              <a href="#book-demo">
                Book a Demo
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 border-white/10 bg-white/5 px-5 text-zinc-100 hover:bg-white/10">
              <a href="#product-preview">
                See POS in Action
                <MonitorPlay className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Card className="border-white/10 bg-white/5 py-0 shadow-none">
              <CardContent className="flex items-start gap-3 p-4">
                <div className="mt-0.5 flex size-8 items-center justify-center rounded-lg bg-white/5 text-emerald-300">
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Launch-ready now</p>
                  <p className="text-sm leading-5 text-zinc-200">
                    POS checkout, inventory management, dashboards, roles, and settings.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5 py-0 shadow-none">
              <CardContent className="flex items-start gap-3 p-4">
                <div className="mt-0.5 flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
                  <ShieldCheck className="size-4" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Ops-ready access</p>
                  <p className="text-sm leading-5 text-zinc-200">
                    Multi-user permissions and organization-scoped access for teams.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div id="product-preview" className="scroll-mt-24 space-y-4">
          <div className="grid gap-4 sm:grid-cols-[1.18fr_0.82fr]">
            <ScreenshotFrame
              src={heroScreenshots.analytics.src}
              alt={heroScreenshots.analytics.alt}
              width={heroScreenshots.analytics.width}
              height={heroScreenshots.analytics.height}
              priority
              className="h-[240px] sm:h-[300px] lg:h-[340px] motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none"
            />
            <div className="grid gap-4">
              <ScreenshotFrame
                src={heroScreenshots.inventory.src}
                alt={heroScreenshots.inventory.alt}
                width={heroScreenshots.inventory.width}
                height={heroScreenshots.inventory.height}
                priority
                className="h-[112px] sm:h-[142px] lg:h-[162px]"
              />
              <Card className="justify-between border-white/10 bg-zinc-900/80 py-0">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-semibold tracking-wide text-white">
                    From checkout to stock decisions
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    Built for daily store operations, not just isolated tasks.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2 p-4 pt-0">
                  {["POS checkout", "Inventory catalog", "Team access", "Analytics"].map((item) => (
                    <div key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200">
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          <ScreenshotFrame
            src={heroScreenshots.pos.src}
            alt={heroScreenshots.pos.alt}
            width={heroScreenshots.pos.width}
            height={heroScreenshots.pos.height}
            priority
            className="h-[240px] sm:h-[320px] lg:h-[360px] motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none"
          />
        </div>
      </div>
    </section>
  )
}

