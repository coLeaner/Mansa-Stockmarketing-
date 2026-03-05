import { productPreviewScreens } from "@/components/marketing/data"
import { ScreenshotFrame } from "@/components/marketing/screenshot-frame"
import { SectionHeading } from "@/components/marketing/section-heading"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProductPreviewSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Product Preview"
        title="Use real screens instead of illustrations"
        description="The current interface already looks strong. Showing the actual POS terminal, inventory table, and analytics dashboard builds trust faster than abstract marketing graphics."
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {productPreviewScreens.map((shot) => (
          <Card key={shot.title} className="border-white/10 bg-zinc-900/70 py-0">
            <CardContent className="p-3">
              <ScreenshotFrame
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                className="h-44 sm:h-52 lg:h-48 xl:h-56"
              />
            </CardContent>
            <CardHeader className="p-4 pt-1">
              <CardTitle className="text-base font-semibold text-white">{shot.title}</CardTitle>
              <CardDescription className="text-zinc-400">{shot.caption}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

