import { Card, CardContent } from "@/components/ui/card"

export function MetricsStrip() {
  const items = [
    ["Checkout + inventory", "One workflow", "Reduce tab-switching during store operations."],
    ["Team access", "Role-based", "Separate owner, manager, and cashier responsibilities."],
    ["Analytics", "Decision-ready", "Track sales trends and stock risk from the same system."],
    ["Deployment posture", "Operations suite", "Position it as a control center, not a single feature tool."],
  ] as const

  return (
    <section aria-label="Operational metrics" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([label, value, note]) => (
          <Card key={label} className="border-white/10 bg-white/5 py-0">
            <CardContent className="space-y-2 p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">{label}</p>
              <p className="text-xl font-semibold tracking-tight text-white">{value}</p>
              <p className="text-sm leading-5 text-zinc-300">{note}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

