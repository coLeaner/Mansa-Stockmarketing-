import { useEffect, useState } from "react";
import {
  Boxes,
  ChevronDown,
  ChevronRight,
  Database,
  Menu,
  Radio,
  ShieldCheck,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

import { Button } from "@/components/ui/button";
import logo from "@/assets/mansastock-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MarketingHeader() {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      <motion.header
        className="fixed inset-x-0 top-0 z-50 w-full border-b transition-all duration-300"
        animate={{
          backgroundColor: scrolled
            ? "var(--header-bg-scrolled)"
            : "var(--header-bg)",
          borderColor: scrolled
            ? "var(--header-border-scrolled)"
            : "var(--header-border)",
          backdropFilter: scrolled ? "blur(16px)" : "blur(12px)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link to="/" className="group flex items-center gap-2.5">
                <div className="relative flex size-8 items-center justify-center overflow-hidden rounded-lg border border-emerald-500/30 bg-white/5 transition-all duration-300 group-hover:border-emerald-500/50 group-hover:bg-white/10">
                  <img
                    src={logo}
                    alt="MansaStock logo"
                    className="size-full object-cover"
                  />
                </div>
                <span className="text-sm font-bold tracking-tight text-foreground transition-colors group-hover:text-emerald-500">
                  MansaStock
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden items-center gap-1 md:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground">
                      Product
                      <ChevronDown className="size-3 opacity-50" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={12}
                    className="w-[560px] rounded-xl border border-border/50 bg-background/95 p-4 shadow-xl backdrop-blur-xl"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/80">
                          Infrastructure
                        </p>
                        <div className="space-y-1">
                          {[
                            {
                              icon: Database,
                              title: "Inventory",
                              desc: "Real-time stock tracking",
                            },
                            {
                              icon: Radio,
                              title: "Realtime",
                              desc: "Live sync across devices",
                            },
                          ].map((item) => (
                            <a
                              key={item.title}
                              href="#"
                              className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-foreground/5"
                            >
                              <div className="rounded-md border border-border/50 bg-background p-1.5 text-emerald-500 group-hover:border-emerald-500/30">
                                <item.icon className="size-4" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {item.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {item.desc}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/80">
                          Operations
                        </p>
                        <div className="space-y-1">
                          {[
                            {
                              icon: Boxes,
                              title: "POS Checkout",
                              desc: "Fast & reliable sales",
                            },
                            {
                              icon: ShieldCheck,
                              title: "Auth & Roles",
                              desc: "Secure team access",
                            },
                          ].map((item) => (
                            <a
                              key={item.title}
                              href="#"
                              className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-foreground/5"
                            >
                              <div className="rounded-md border border-border/50 bg-background p-1.5 text-emerald-500 group-hover:border-emerald-500/30">
                                <item.icon className="size-4" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {item.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {item.desc}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground">
                      Solutions
                      <ChevronDown className="size-3 opacity-50" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={12}
                    className="w-48 rounded-xl border border-border/50 bg-background/95 p-2 shadow-xl backdrop-blur-xl"
                  >
                    {["Retail", "Wholesale", "E-commerce", "Enterprise"].map(
                      (item) => (
                        <a
                          key={item}
                          href="#"
                          className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-foreground/5"
                        >
                          {item}
                        </a>
                      ),
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <a
                  href="#pricing"
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  Pricing
                </a>
              </nav>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-3 sm:flex">
                <a
                  href="/signin"
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  Sign in
                </a>
                <Button
                  size="sm"
                  variant="default"
                  className="supa-button font-medium"
                >
                  Request a demo
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                className="flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-foreground/5 hover:text-foreground md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
            >
              <div className="space-y-1 px-4 py-6">
                {[
                  { label: "Product", href: "#product" },
                  { label: "Solutions", href: "#solutions" },
                  { label: "Pricing", href: "#pricing" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-foreground/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                    <ChevronRight className="size-4 opacity-50" />
                  </a>
                ))}
                <div className="mt-6 pt-6 border-t border-border/50 flex flex-col gap-3">
                  <a
                    href="/signin"
                    className="flex h-11 items-center justify-center rounded-lg border border-border font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </a>
                  <Button
                    className="w-full supa-button"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Request a demo
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}






