import type { LucideIcon } from "lucide-react"

export type MarketingFeatureCard = {
  icon: LucideIcon
  title: string
  description: string
  points: string[]
}

export type MarketingStep = {
  title: string
  detail: string
}

export type MarketingSegment = {
  icon: LucideIcon
  title: string
  description: string
}

export type MarketingScreenshot = {
  title: string
  caption: string
  src: string
  alt: string
  width: number
  height: number
}
