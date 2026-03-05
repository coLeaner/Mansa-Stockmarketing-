import { Github, Twitter, Youtube, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function MarketingFooter() {
  return (
    <footer className="relative border-t border-border bg-background py-12 lg:py-20 overflow-hidden">
      {/* Dot grid background */}
      <div
        className="dot-grid-bg absolute inset-0 opacity-60"
        aria-hidden="true"
      />

      {/* Top gradient line */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="group flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl border border-emerald-400/35 bg-white/5 text-emerald-200 transition-all duration-300 group-hover:border-emerald-400/60 group-hover:bg-white/10">
                <Sparkles className="size-4" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold text-foreground group-hover:text-emerald-200 transition-colors">
                MansaStock
              </span>
            </Link>
            <p className="text-sm leading-6 text-zinc-400">
              The open-source business operations platform. <br />
              Manage sales, inventory, and analytics in one place.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Github, label: "GitHub" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <motion.button
                  key={label}
                  aria-label={label}
                  className="social-icon-wrap text-zinc-500 transition-colors hover:text-emerald-400"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon className="size-5" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {[
                ["Platform", "#platform"],
                ["Workflow", "#workflow"],
                ["Analytics", "#readiness"],
                ["Roadmap", "#roadmap"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="nav-link-underline hover:text-emerald-400 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Resources</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {["Documentation", "API Reference", "Blog", "Community"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="nav-link-underline hover:text-emerald-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {["About", "Careers", "Privacy Policy", "Terms of Service"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="nav-link-underline hover:text-emerald-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-border pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} MansaStock Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-white/45 opacity-60"
                style={{
                  animation: "ping-slow 2s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
              <span className="relative inline-flex size-2 rounded-full bg-white/70" />
            </span>
            <span className="text-xs text-zinc-400">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}


