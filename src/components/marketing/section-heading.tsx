import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl space-y-4", className)}>
      <Badge
        variant="outline"
        className="border-emerald-400/25 bg-white/5 text-emerald-200"
      >
        {eyebrow}
      </Badge>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="text-pretty text-sm leading-6 text-zinc-300 sm:text-base">{description}</p>
    </div>
  )
}

