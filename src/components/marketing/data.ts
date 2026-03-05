import { BarChart3, Boxes, ShieldCheck, ShoppingCart, Store, Users } from "lucide-react"

import analyticsShot from "@/assets/Mansa-Stock-ScreenShoot/Screenshot 2026-02-21 235921 1.png"
import inventoryShot from "@/assets/Mansa-Stock-ScreenShoot/Screenshot 2026-02-22 010139 1.png"
import posShot from "@/assets/Mansa-Stock-ScreenShoot/Screenshot 2026-02-22 005620 1.png"

import type {
  MarketingFeatureCard,
  MarketingScreenshot,
  MarketingSegment,
  MarketingStep,
} from "@/components/marketing/types"

export const heroScreenshots = {
  analytics: {
    src: analyticsShot,
    alt: "MansaStock analytics dashboard with revenue cards, charts, and inventory health insights.",
    width: 1152,
    height: 768,
  },
  inventory: {
    src: inventoryShot,
    alt: "MansaStock inventory products table showing valuation, on-hand stock, and lifecycle status.",
    width: 1365,
    height: 768,
  },
  pos: {
    src: posShot,
    alt: "MansaStock checkout station POS interface with product grid, cart, and payment summary.",
    width: 1292,
    height: 755,
  },
} as const

export const coreValues: MarketingFeatureCard[] = [
  {
    icon: ShoppingCart,
    title: "Sell faster at the counter",
    description:
      "Checkout workflows designed for daily store operations with cart management, payment method handling, and sale finalization.",
    points: ["POS checkout flow", "Payment handling", "Receipt-ready workflow"],
  },
  {
    icon: Boxes,
    title: "Track inventory live",
    description:
      "Manage products with clear identifiers, categories, valuation, stock levels, and lifecycle status from one inventory workspace.",
    points: ["Product CRUD", "Stock visibility", "SKU & category organization"],
  },
  {
    icon: Users,
    title: "Control team access",
    description:
      "Support multi-user operations with employee access, role assignment, and permission-based workflows across the business.",
    points: ["Employee invites", "Role controls", "Organization workflows"],
  },
  {
    icon: BarChart3,
    title: "Act on operational insights",
    description:
      "Turn daily transactions into decision-ready visibility with sales reporting foundations and business intelligence dashboards.",
    points: ["Analytics dashboards", "Sales history foundation", "Inventory health signals"],
  },
]

export const workflowSteps: MarketingStep[] = [
  {
    title: "Add products",
    detail: "Create and maintain your catalog with identifiers, pricing, media, and stock quantities.",
  },
  {
    title: "Sell in POS",
    detail: "Cashiers complete fast checkout with cart, payment method, and sale finalization flows.",
  },
  {
    title: "Track sales history",
    detail: "Operational data accumulates into a reporting foundation for transaction and trend review.",
  },
  {
    title: "Review analytics",
    detail: "Owners and managers monitor revenue, sell-through velocity, and stock-risk signals.",
  },
  {
    title: "Adjust access & settings",
    detail: "Update team permissions, company settings, and tax configuration as the business evolves.",
  },
]

export const readySignals = [
  "Multi-user access control",
  "Role-based permissions",
  "Organization-level data separation",
  "Clerk authentication",
  "Convex-backed realtime data model",
  "Company and tax settings",
]

export const comingSoon = [
  "Customers & Invoices",
  "Stock Adjustments",
  "Purchase Orders",
  "Suppliers",
  "Attendance & Schedules",
  "Performance tracking",
  "Financial reporting",
  "Integrations",
]

export const targetSegments: MarketingSegment[] = [
  {
    icon: Store,
    title: "Retail shops",
    description: "Counter-checkout teams that need fast POS plus product visibility in one system.",
  },
  {
    icon: Boxes,
    title: "Stock-led businesses",
    description: "Businesses where inventory levels and sell-through directly drive daily decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Multi-user operators",
    description: "Owners, managers, and cashiers working with role-based access and shared workflows.",
  },
]

export const productPreviewScreens: MarketingScreenshot[] = [
  {
    title: "Checkout Station",
    caption: "Fast cart management, payment summary, and finalize sale flow.",
    src: posShot,
    alt: "Checkout station POS screen with items grid and order details panel.",
    width: 1292,
    height: 755,
  },
  {
    title: "Inventory Intelligence",
    caption: "Product records with valuation, on-hand levels, and lifecycle state.",
    src: inventoryShot,
    alt: "Inventory products table with valuation and stock lifecycle columns.",
    width: 1365,
    height: 768,
  },
  {
    title: "Business Analytics",
    caption: "Revenue overview, stock dynamics, and inventory health signals.",
    src: analyticsShot,
    alt: "Business analytics dashboard with charts and management alerts.",
    width: 1152,
    height: 768,
  },
]
