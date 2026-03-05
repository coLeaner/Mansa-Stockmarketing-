import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Layout,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  Mail,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useInView,
  useTransform,
  animate,
} from "motion/react";

import {
  comingSoon,
  coreValues,
  heroScreenshots,
  productPreviewScreens,
  targetSegments,
} from "@/components/marketing/data";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { ScreenshotFrame } from "@/components/marketing/screenshot-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const demoVideoUrl = "/demo/mansa-video.mp4";
/* ─────────────────────────────────────────────
   Count-up hook
───────────────────────────────────────────── */
function useCountUp(target: number, duration = 1.8, shouldStart = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return controls.stop;
  }, [shouldStart, target, duration]);
  return value;
}

/* ─────────────────────────────────────────────
   Stat item with count-up
───────────────────────────────────────────── */
function StatItem({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCountUp(value, 1.6, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="stat-number text-4xl font-bold sm:text-5xl">
        {count}
        {suffix}
      </div>
      <p className="mt-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
        {label}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Spotlight Card (mouse-glow on hover)
───────────────────────────────────────────── */
function SpotlightCard({
  children,
  className = "",
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`,
    );
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };
  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Floating Metric Badge
───────────────────────────────────────────── */
function FloatingBadge({
  label,
  style,
  delay = 0,
}: {
  label: string;
  style: React.CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute z-20 hidden lg:flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-zinc-900/90 px-3 py-1.5 text-xs font-semibold text-emerald-300 shadow-lg backdrop-blur-sm"
      style={style}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {label}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Checkout Animation Component
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
export function MarketingPage() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number | null>(
    null,
  );
  const prefersReducedMotion = useReducedMotion();
  const showTrustedBy = false;
  const workflowSectionRef = useRef<HTMLElement>(null);
  const workflowVideoRef = useRef<HTMLVideoElement>(null);
  const isWorkflowInView = useInView(workflowSectionRef, { amount: 0.45 });

  useEffect(() => {
    const video = workflowVideoRef.current;
    if (!video) return;

    if (isWorkflowInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore autoplay errors from restrictive browser policies.
        });
      }
      return;
    }

    video.pause();
  }, [isWorkflowInView]);

  /* 3-D tilt for hero screenshot */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 160,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 160,
    damping: 22,
  });

  const tiltRef = useRef<HTMLDivElement>(null);
  const handleTiltMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tiltRef.current || prefersReducedMotion) return;
      const rect = tiltRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY, prefersReducedMotion],
  );
  const resetTilt = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div className="marketing-theme min-h-screen bg-background text-foreground font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-foreground"
      >
        Skip to content
      </a>

      <MarketingHeader />

      <main id="main-content">
        {/* ══════════════════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════════════════ */}
        <section className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
          <motion.div
            className="mx-auto max-w-5xl text-center"
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? undefined : "show"}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.12, delayChildren: 0.05 },
              },
            }}
          >
            {/* Badge */}
            <motion.div
              className="mb-8 flex justify-center"
              variants={{
                hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.5 },
                },
              }}
            >
              <Badge
                variant="outline"
                className="border-white/10 bg-transparent px-4 py-1.5 text-zinc-300 hover:text-white transition cursor-pointer text-sm font-medium"
              >
                <Sparkles className="mr-2 size-3.5 text-emerald-500" />
                Now in Private Beta
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-balance text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65 },
                },
              }}
            >
              Build your store operations. <br />
              <span className="text-white">Rule Your Inventory.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl"
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              MansaStock is a business operations platform. Manage sales,
              inventory, team permissions, and analytics in one unified
              workspace.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-xl"
              >
                <Button
                  size="lg"
                  className="h-12 supa-button px-8 text-base font-semibold"
                >
                  Request a demo
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 border-white/10 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  Request a demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Hero Screenshot + 3D Tilt ─────────────────────── */}
          <motion.div
            className="mx-auto mt-16 max-w-6xl px-4 lg:mt-24"
            initial={
              prefersReducedMotion ? false : { opacity: 0, y: 30, scale: 0.97 }
            }
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
            }
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              ref={tiltRef}
              className="relative"
              onMouseMove={handleTiltMove}
              onMouseLeave={resetTilt}
              style={{ perspective: "1200px" }}
            >
              {/* Floating metric badges */}
              <FloatingBadge
                label="↑ 34% Revenue"
                style={{ top: "10%", left: "-4%" }}
                delay={0}
              />
              <FloatingBadge
                label="🔒 256-bit Encrypted"
                style={{ top: "20%", right: "-3%" }}
                delay={1.2}
              />
              <FloatingBadge
                label="⚡ Real-time Sync"
                style={{ bottom: "18%", left: "-3%" }}
                delay={0.6}
              />
              <FloatingBadge
                label="🟢 99.9% Uptime"
                style={{ bottom: "12%", right: "-4%" }}
                delay={1.8}
              />

              <motion.div
                className="relative rounded-2xl border border-white/10 bg-zinc-900/40 p-2 shadow-2xl"
                style={
                  prefersReducedMotion
                    ? undefined
                    : { rotateX, rotateY, transformStyle: "preserve-3d" }
                }
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [0, -5, 0],
                      }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <ScreenshotFrame
                  src={heroScreenshots.analytics.src}
                  alt={heroScreenshots.analytics.alt}
                  width={heroScreenshots.analytics.width}
                  height={heroScreenshots.analytics.height}
                  priority
                  className="rounded-xl border border-white/5"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════
            LOGO MARQUEE STRIP
        ══════════════════════════════════════════════════════ */}
        {showTrustedBy && (
          <section
            className="border-y border-white/5 bg-white/[0.02] py-10 overflow-hidden"
            aria-label="Trusted by"
          >
            <motion.p
              className="text-center text-sm font-medium uppercase tracking-widest text-zinc-500 mb-8"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Trusted by fast-growing companies worldwide
            </motion.p>
            <div className="relative overflow-hidden">
              {/* Left fade */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10" />
              {/* Right fade */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10" />
              <div className="marquee-track gap-x-16 px-8">
                {/* Two copies for seamless loop */}
                {[...Array(2)].map((_, copyIdx) =>
                  [
                    { icon: Zap, label: "FlashPay", color: "text-emerald-400" },
                    {
                      icon: ShieldCheck,
                      label: "SecureOps",
                      color: "text-blue-400",
                    },
                    {
                      icon: Layout,
                      label: "StackCo",
                      color: "text-purple-400",
                    },
                    { icon: Users, label: "Teamly", color: "text-orange-400" },
                    {
                      icon: BarChart3,
                      label: "MetricIQ",
                      color: "text-cyan-400",
                    },
                    {
                      icon: Sparkles,
                      label: "NovaMart",
                      color: "text-emerald-300",
                    },
                  ].map(({ icon: Icon, label, color }) => (
                    <div
                      key={`${label}-${copyIdx}`}
                      className="flex shrink-0 items-center gap-2.5 text-xl font-bold text-white/60 hover:text-white/90 transition-colors duration-300"
                    >
                      <Icon className={`size-6 ${color}`} />
                      {label}
                    </div>
                  )),
                )}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            FEATURES — INTERCONNECTED HUB DESIGN
        ══════════════════════════════════════════════════════ */}
        <motion.section
          id="platform"
          className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Section heading */}
          <motion.div className="text-center mb-20" variants={fadeUp}>
            <Badge className="mb-4 border-emerald-500/20 bg-white/5 text-emerald-400">
              Platform
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Everything your store needs
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400 text-lg">
              Four pillars, one loop — hover a card to see the live connections.
            </p>
          </motion.div>

          <motion.div className="relative" variants={fadeUp}>
            {/* ── Central Hub SVG (desktop only) */}
            <div
              className="pointer-events-none absolute inset-0 hidden lg:block"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 900 560"
                className="absolute inset-0 h-full w-full overflow-visible"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter
                    id="hubGlow"
                    x="-80%"
                    y="-80%"
                    width="260%"
                    height="260%"
                  >
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter
                    id="hubGlowStrong"
                    x="-100%"
                    y="-100%"
                    width="300%"
                    height="300%"
                  >
                    <feGaussianBlur stdDeviation="7" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <path
                    id="path-tl"
                    d="M 200 135 C 310 135, 390 210, 450 280"
                  />
                  <path
                    id="path-tr"
                    d="M 700 135 C 590 135, 510 210, 450 280"
                  />
                  <path
                    id="path-bl"
                    d="M 200 425 C 310 425, 390 350, 450 280"
                  />
                  <path
                    id="path-br"
                    d="M 700 425 C 590 425, 510 350, 450 280"
                  />
                </defs>

                {/* Subtle always-on cross lines */}
                <path
                  d="M 200 135 C 310 105, 590 105, 700 135"
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                  strokeDasharray="4 10"
                />
                <path
                  d="M 200 425 C 310 455, 590 455, 700 425"
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                  strokeDasharray="4 10"
                />
                <path
                  d="M 200 135 C 168 240, 168 330, 200 425"
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                  strokeDasharray="4 10"
                />
                <path
                  d="M 700 135 C 732 240, 732 330, 700 425"
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                  strokeDasharray="4 10"
                />

                {/* Hub spokes */}
                {[
                  {
                    pathId: "path-tl",
                    d: "M 200 135 C 310 135, 390 210, 450 280",
                    idx: 0,
                  },
                  {
                    pathId: "path-tr",
                    d: "M 700 135 C 590 135, 510 210, 450 280",
                    idx: 1,
                  },
                  {
                    pathId: "path-bl",
                    d: "M 200 425 C 310 425, 390 350, 450 280",
                    idx: 2,
                  },
                  {
                    pathId: "path-br",
                    d: "M 700 425 C 590 425, 510 350, 450 280",
                    idx: 3,
                  },
                ].map(({ pathId, d, idx }) => {
                  const active = activeFeatureIndex === idx;
                  return (
                    <g key={pathId}>
                      <path
                        d={d}
                        fill="none"
                        stroke={
                          active
                            ? "rgba(148,163,184,0)"
                            : "rgba(148,163,184,0.13)"
                        }
                        strokeWidth="1.5"
                        strokeDasharray="5 8"
                      >
                        {!active && (
                          <animate
                            attributeName="stroke-dashoffset"
                            values="0;-26"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        )}
                      </path>
                      {active && (
                        <>
                          <path
                            d={d}
                            fill="none"
                            stroke="rgba(148,163,184,0.2)"
                            strokeWidth="10"
                            filter="url(#hubGlowStrong)"
                          />
                          <path
                            d={d}
                            fill="none"
                            stroke="rgba(148,163,184,0.8)"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              values="0;-24"
                              dur="0.85s"
                              repeatCount="indefinite"
                            />
                          </path>
                          <circle
                            r="5"
                            fill="rgba(148,163,184,0.95)"
                            filter="url(#hubGlow)"
                          >
                            <animateMotion
                              dur="1.0s"
                              repeatCount="indefinite"
                              rotate="auto"
                            >
                              <mpath href={`#${pathId}`} />
                            </animateMotion>
                          </circle>
                          <circle r="2.2" fill="rgba(209,250,229,1)">
                            <animateMotion
                              dur="1.0s"
                              repeatCount="indefinite"
                              rotate="auto"
                            >
                              <mpath href={`#${pathId}`} />
                            </animateMotion>
                          </circle>
                          <circle
                            r="3.5"
                            fill="rgba(148,163,184,0.7)"
                            filter="url(#hubGlow)"
                          >
                            <animateMotion
                              dur="1.0s"
                              begin="0.5s"
                              repeatCount="indefinite"
                              rotate="auto"
                            >
                              <mpath href={`#${pathId}`} />
                            </animateMotion>
                          </circle>
                        </>
                      )}
                    </g>
                  );
                })}

                {/* Central hub rings */}
                <circle
                  cx="450"
                  cy="280"
                  r="40"
                  fill="none"
                  stroke={
                    activeFeatureIndex !== null
                      ? "rgba(148,163,184,0.3)"
                      : "rgba(148,163,184,0.12)"
                  }
                  strokeWidth="1"
                >
                  <animate
                    attributeName="r"
                    values="40;50;40"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.8;0.2;0.8"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="450"
                  cy="280"
                  r="28"
                  fill={
                    activeFeatureIndex !== null
                      ? "rgba(148,163,184,0.08)"
                      : "rgba(113,113,122,0.04)"
                  }
                  stroke={
                    activeFeatureIndex !== null
                      ? "rgba(148,163,184,0.55)"
                      : "rgba(113,113,122,0.22)"
                  }
                  strokeWidth="1.5"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="450"
                  cy="280"
                  r="14"
                  fill={
                    activeFeatureIndex !== null
                      ? "rgba(148,163,184,0.22)"
                      : "rgba(113,113,122,0.1)"
                  }
                  stroke="rgba(148,163,184,0.65)"
                  strokeWidth="1.5"
                  filter={
                    activeFeatureIndex !== null ? "url(#hubGlow)" : undefined
                  }
                />
                <circle
                  cx="450"
                  cy="280"
                  r="5"
                  fill="rgba(226,232,240,0.95)"
                  filter="url(#hubGlow)"
                >
                  <animate
                    attributeName="opacity"
                    values="0.6;1;0.6"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Corner nodes */}
                {[
                  { cx: 200, cy: 135, idx: 0 },
                  { cx: 700, cy: 135, idx: 1 },
                  { cx: 200, cy: 425, idx: 2 },
                  { cx: 700, cy: 425, idx: 3 },
                ].map(({ cx, cy, idx }) => (
                  <g key={`node-${idx}`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={activeFeatureIndex === idx ? 14 : 9}
                      fill={
                        activeFeatureIndex === idx
                          ? "rgba(148,163,184,0.14)"
                          : "rgba(113,113,122,0.05)"
                      }
                      stroke={
                        activeFeatureIndex === idx
                          ? "rgba(148,163,184,0.75)"
                          : "rgba(113,113,122,0.2)"
                      }
                      strokeWidth={activeFeatureIndex === idx ? 1.5 : 1}
                    >
                      {activeFeatureIndex === idx && (
                        <animate
                          attributeName="r"
                          values="14;19;14"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      )}
                    </circle>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={activeFeatureIndex === idx ? 4.5 : 3}
                      fill={
                        activeFeatureIndex === idx
                          ? "rgba(148,163,184,0.95)"
                          : "rgba(148,163,184,0.4)"
                      }
                      filter={
                        activeFeatureIndex === idx ? "url(#hubGlow)" : undefined
                      }
                    >
                      <animate
                        attributeName="opacity"
                        values="0.4;1;0.4"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                ))}
              </svg>
            </div>

            {/* 2 × 2 card grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:gap-7">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                const isActive = activeFeatureIndex === index;
                const stepLabels = ["Step 1", "Step 2", "Step 3", "Step 4"];
                const connectedTo = [
                  "feeds → Inventory",
                  "feeds → Analytics",
                  "feeds → Checkout",
                  "feeds → Team",
                ][index];
                return (
                  <motion.div
                    key={value.title}
                    variants={fadeUp}
                    whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                    transition={{ duration: 0.22 }}
                    onMouseEnter={() => setActiveFeatureIndex(index)}
                    onMouseLeave={() => setActiveFeatureIndex(null)}
                    onFocus={() => setActiveFeatureIndex(index)}
                    onBlur={() => setActiveFeatureIndex(null)}
                  >
                    <SpotlightCard
                      className={`group relative flex flex-col rounded-2xl border p-7 transition-all duration-300 overflow-hidden h-full ${
                        isActive
                          ? "border-emerald-500/40 bg-zinc-900/80 shadow-[0_0_48px_-10px_rgba(148,163,184,0.30),0_0_0_1px_rgba(148,163,184,0.12)]"
                          : "border-white/6 bg-zinc-900/40 hover:border-white/20 hover:bg-zinc-900/60"
                      }`}
                    >
                      {/* Top accent line */}
                      <div
                        className={`absolute inset-x-0 top-0 h-px transition-all duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(148,163,184,0.7), transparent)",
                        }}
                      />
                      {/* BG radial glow */}
                      <div
                        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
                        style={{
                          background:
                            "radial-gradient(ellipse at 50% 0%, rgba(148,163,184,0.09) 0%, transparent 65%)",
                        }}
                      />

                      {/* Header row */}
                      <div className="relative mb-5 flex items-center justify-between">
                        <span className="rounded-full border border-emerald-500/20 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                          {stepLabels[index]}
                        </span>
                        <motion.span
                          className="text-[10px] font-medium"
                          animate={{
                            color: isActive
                              ? "rgba(148,163,184,0.85)"
                              : "rgba(113,113,122,1)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {connectedTo}
                        </motion.span>
                      </div>

                      {/* Animated icon */}
                      <motion.div
                        className="relative mb-5 flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-zinc-950 text-emerald-400 transition-all duration-300"
                        animate={
                          isActive && !prefersReducedMotion
                            ? {
                                boxShadow:
                                  "0 0 28px 7px rgba(148,163,184,0.28)",
                                borderColor: "rgba(148,163,184,0.45)",
                              }
                            : {
                                boxShadow: "none",
                                borderColor: "rgba(255,255,255,0.1)",
                              }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        {isActive && !prefersReducedMotion && (
                          <motion.div
                            className="absolute inset-0 rounded-2xl border border-emerald-500/25"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            style={{
                              background:
                                "conic-gradient(from 0deg, transparent 260deg, rgba(148,163,184,0.45) 360deg)",
                              borderRadius: "inherit",
                            }}
                          />
                        )}
                        <Icon className="relative size-6" />
                      </motion.div>

                      {/* Text */}
                      <div className="relative flex-1">
                        <h3 className="text-xl font-bold text-white">
                          {value.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-400">
                          {value.description}
                        </p>
                      </div>

                      {/* Feature points */}
                      <ul className="relative mt-5 space-y-2 border-t border-white/5 pt-4">
                        {value.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-2 text-xs text-zinc-300"
                          >
                            <motion.span
                              animate={
                                isActive && !prefersReducedMotion
                                  ? { color: "rgba(148,163,184,0.9)" }
                                  : { color: "rgba(148,163,184,0.55)" }
                              }
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircle2 className="size-3.5 shrink-0" />
                            </motion.span>
                            {point}
                          </li>
                        ))}
                      </ul>

                      {/* Connection port */}
                      <div className="relative mt-5 flex items-center gap-2">
                        <motion.span
                          className="size-2 rounded-full"
                          animate={
                            isActive && !prefersReducedMotion
                              ? {
                                  backgroundColor: "rgb(52,211,153)",
                                  boxShadow:
                                    "0 0 8px 3px rgba(148,163,184,0.6)",
                                }
                              : {
                                  backgroundColor: "rgb(39,39,42)",
                                  boxShadow: "none",
                                }
                          }
                          transition={{ duration: 0.3 }}
                        />
                        <motion.span
                          className="text-[10px] font-medium"
                          animate={{
                            color: isActive
                              ? "rgba(148,163,184,0.85)"
                              : "rgba(113,113,122,0.7)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {isActive ? "Connected to hub" : "Hover to connect"}
                        </motion.span>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>

            {/* Loop label */}
            <motion.div
              className="mt-10 hidden lg:flex items-center justify-center gap-3"
              variants={fadeUp}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
              <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                Continuous operating loop
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════
            WORKFLOW SECTION — CINEMATIC SHOWCASE
        ══════════════════════════════════════════════════════ */}
        {false && (
        <section
          id="workflow"
          ref={workflowSectionRef}
          className="relative overflow-hidden border-y border-white/5 bg-zinc-950 py-24 sm:py-32 lg:py-48"
        >
          {/* Background Elements */}
          <div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(24,24,24,0.55),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(31,31,31,0.45),transparent_70%)]" />

            {/* Moving Aurora Blobs for this section specifically */}
            <motion.div
              animate={{
                x: [0, 30, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-zinc-900/45 blur-[120px]"
            />
            <motion.div
              animate={{
                x: [0, -40, 0],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{ duration: 12, repeat: Infinity, delay: 2 }}
              className="absolute -right-[10%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-zinc-800/35 blur-[120px]"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
            {/*
            <div className="mx-auto max-w-4xl text-center mb-20 lg:mb-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 flex justify-center">
                  <Badge className="border-emerald-500/30 bg-white/5 px-4 py-1 text-emerald-400 backdrop-blur-md">
                    <Zap className="mr-2 size-3" />
                    Interactive Product Tour
                  </Badge>
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.1]">
                  The future of{" "}
                  <span className="shimmer-text">retail intelligence</span>{" "}
                  <br className="hidden lg:block" />
                  is here.
                </h2>
                <p className="mt-8 text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                  Experience a platform where every transaction, inventory
                  movement, and team action is synchronized in real-time.
                  Designed for scale, built for speed.
                </p>
              </motion.div>
            </div>
            */}

            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, scale: 0.95, y: 60 }
              }
              whileInView={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 1, scale: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto"
            >
              {/* Floating UI Elements (Decorative) */}
              <div className="absolute -left-6 top-1/4 z-20 hidden xl:block">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="rounded-2xl border border-white/10 bg-zinc-900/80 p-4 shadow-2xl backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-white/10 flex items-center justify-center">
                      <BarChart3 className="size-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Live Sales</p>
                      <p className="text-[10px] text-zinc-500">Updating now</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="absolute -right-8 bottom-1/4 z-20 hidden xl:block">
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="rounded-2xl border border-white/10 bg-zinc-900/80 p-4 shadow-2xl backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <ShieldCheck className="size-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Security</p>
                      <p className="text-[10px] text-zinc-500">
                        AES-256 Active
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Main Cinematic Video Frame */}
              <div className="group relative rounded-[2.5rem] border border-white/10 bg-zinc-900/40 p-2 shadow-[0_0_100px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-3 lg:p-4">
                {/* Dynamic Border Glow */}
                <div
                  className="pointer-events-none absolute -inset-0.5 rounded-[2.5rem] opacity-30 transition-opacity duration-1000 group-hover:opacity-100"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.09), transparent 40%, transparent 60%, rgba(255,255,255,0.05), transparent)",
                  }}
                />

                <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-black">
                  <video
                    ref={workflowVideoRef}
                    className="block aspect-video w-full object-cover transition-transform duration-1000 group-hover:scale-[1.015]"
                    src={demoVideoUrl}
                    poster={heroScreenshots.pos.src}
                    autoPlay
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    controlsList="nodownload"
                    aria-label="MansaStock demo video"
                  >
                    Your browser does not support the video tag.
                  </video>

                  {/* Glass Reflection Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-white/5 opacity-40" />
                </div>
              </div>

              {/* Premium Feature Grid */}
              <div className="mt-16 grid grid-cols-2 gap-y-12 gap-x-6 sm:grid-cols-4 lg:mt-24 lg:gap-16">
                {[
                  {
                    label: "Architecture",
                    title: "Edge Native",
                    desc: "Global ultra-low latency",
                  },
                  {
                    label: "Interface",
                    title: "Pro Workflow",
                    desc: "Designed for high volume",
                  },
                  {
                    label: "Intelligence",
                    title: "Smart Alerts",
                    desc: "Predictive stock insights",
                  },
                  {
                    label: "Open Source",
                    title: "Extensible",
                    desc: "Build your own modules",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 * idx }}
                    className="group flex flex-col items-center text-center sm:items-start sm:text-left"
                  >
                    <div className="mb-4 h-px w-12 bg-white/20 transition-all duration-500 group-hover:w-full group-hover:bg-white/40" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 mb-2">
                      {item.label}
                    </span>
                    <span className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </span>
                    <span className="text-sm text-zinc-500 mt-2 leading-relaxed">
                      {item.desc}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        )}

        <section
          id="readiness"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
        >
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 p-6 text-center sm:p-8 lg:p-10"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            <div className="relative">
              <Badge className="mb-4 border-white/10 bg-transparent text-emerald-500 hover:bg-transparent">
                Analytics
              </Badge>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Decision-ready analytics.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                Turn daily transactions into actionable intelligence with our
                real-time dashboards.
              </p>
              <div className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-3">
                {[
                  ["Revenue Signals", "Live trend visibility"],
                  ["Stock Health", "Risk & sell-through tracking"],
                  ["Operator Actions", "Decisions tied to data"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-left transition-colors hover:border-white/20 hover:bg-[#1a1a1a]"
                  >
                    <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-zinc-200">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            {productPreviewScreens.map(
              (screen, i) =>
                screen.title !== "Business Analytics" && (
                  <motion.div
                    key={screen.title}
                    className={`group overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-3 transition-colors duration-300 hover:border-white/20 hover:bg-[#1a1a1a] ${
                      i === 0 ? "lg:col-span-7" : "lg:col-span-5"
                    }`}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 20 }
                    }
                    whileInView={
                      prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-white/10">
                      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0a0a0a] px-3 py-2">
                        <div className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-white/60" />
                          <span className="size-2 rounded-full bg-cyan-400/50" />
                          <span className="size-2 rounded-full bg-white/25" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                          Live Dashboard
                        </span>
                      </div>
                      <div
                        className={`${i === 0 ? "h-60 sm:h-72 lg:h-[22rem]" : "h-56 sm:h-64 lg:h-[22rem]"}`}
                      >
                        <ScreenshotFrame
                          src={screen.src}
                          alt={screen.alt}
                          width={screen.width}
                          height={screen.height}
                          className="h-full rounded-none border-0 shadow-none"
                          imgClassName={
                            i === 0
                              ? "object-[center_18%]"
                              : "object-[center_22%]"
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-4 px-1 pb-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-semibold text-white sm:text-lg">
                            {screen.title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-zinc-400">
                            {screen.caption}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full border border-white/10 bg-transparent px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-zinc-400">
                          {i === 0 ? "Primary View" : "Snapshot"}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(i === 0
                          ? ["Trends", "Revenue", "Inventory health"]
                          : ["Tables", "Filters", "Ops alerts"]
                        ).map((chip) => (
                          <span
                            key={chip}
                            className="rounded-full border border-white/10 bg-transparent px-2.5 py-1 text-xs text-zinc-400"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ),
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            WHO IT FITS
        ══════════════════════════════════════════════════════ */}
        <section
          id="best-fit"
          className="border-t border-white/5 bg-[#0a0a0a] py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55 }}
            >
              <Badge className="mb-4 border-emerald-500/20 bg-white/5 text-emerald-400">
                Best Fit
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Who MansaStock fits best today.
              </h2>
            </motion.div>
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {targetSegments.map((segment, i) => {
                const Icon = segment.icon;
                return (
                  <motion.div
                    key={segment.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, x: -20 }
                    }
                    whileInView={
                      prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                    }
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  >
                    {/* Background glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 0%, rgba(148,163,184,0.07), transparent 70%)",
                      }}
                    />
                    <motion.div
                      className="relative mb-6 flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-emerald-400 transition-all duration-300 group-hover:border-emerald-500/35 group-hover:bg-white/5"
                      whileHover={
                        prefersReducedMotion ? undefined : { scale: 1.1 }
                      }
                      transition={{ duration: 0.2 }}
                      style={{ boxShadow: "0 0 0 0 rgba(148,163,184,0)" }}
                    >
                      <Icon className="size-6" />
                    </motion.div>
                    <h3 className="relative text-xl font-semibold text-white">
                      {segment.title}
                    </h3>
                    <p className="relative mt-4 text-sm leading-6 text-zinc-400">
                      {segment.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            ROADMAP
        ══════════════════════════════════════════════════════ */}
        <section
          id="roadmap"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
        >
          <motion.div
            className="rounded-3xl border border-white/10 bg-zinc-900/40 p-8 lg:p-16"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }
            }
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              boxShadow:
                "0 0 60px -20px rgba(148,163,184,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <Badge className="mb-4 border-emerald-500/20 bg-white/5 text-emerald-400">
                  Roadmap
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Our Roadmap
                </h2>
                <p className="mt-6 text-lg text-zinc-400">
                  We're constantly building new modules to help you run your
                  business better. Here's what's coming soon to the MansaStock
                  ecosystem.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {comingSoon.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={
                        prefersReducedMotion
                          ? false
                          : { opacity: 0, scale: 0.8 }
                      }
                      whileInView={
                        prefersReducedMotion
                          ? undefined
                          : { opacity: 1, scale: 1 }
                      }
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                    >
                      <Badge
                        variant="outline"
                        className="shimmer-badge border-white/10 bg-white/5 px-3 py-1.5 text-zinc-300 hover:border-white/20 hover:text-emerald-300 transition-colors cursor-default"
                      >
                        {item}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="space-y-5">
                <div className="relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <h4 className="font-semibold text-white">
                    Join the Community
                  </h4>
                  <p className="mt-2 text-sm text-zinc-400">
                    Help us shape the future of MansaStock by contributing on
                    GitHub or joining our Discord.
                  </p>
                  <Button
                    variant="link"
                    className="mt-4 px-0 text-emerald-400 hover:text-emerald-300 group"
                  >
                    Join Discord{" "}
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                  <h4 className="font-semibold text-white">
                    Contribute on GitHub
                  </h4>
                  <p className="mt-2 text-sm text-zinc-400">
                    MansaStock is open-source. Star the repo, open issues, and
                    submit PRs to help build the future.
                  </p>
                  <Button
                    variant="link"
                    className="mt-4 px-0 text-emerald-400 hover:text-emerald-300 group"
                  >
                    View Repository{" "}
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════
            STATS / TRUST — Count-Up
        ══════════════════════════════════════════════════════ */}
        <section id="pricing" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 border-emerald-500/20 bg-white/5 text-emerald-400">
              Pricing
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pick the right plan for your business
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Start free, upgrade when you need more power, and scale with confidence.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Free",
                price: "$0",
                period: "/month",
                cta: "Start free",
                highlight: false,
                features: [
                  "Basic inventory management",
                  "Single location support",
                  "Community support",
                ],
              },
              {
                name: "Starter",
                price: "$15",
                period: "/month",
                cta: "Choose starter",
                highlight: true,
                features: [
                  "Everything in Free",
                  "Team access controls",
                  "Sales and stock insights",
                ],
              },
              {
                name: "Pro",
                price: "$30",
                period: "/month",
                cta: "Go pro",
                highlight: false,
                features: [
                  "Everything in Starter",
                  "Advanced analytics",
                  "Priority support",
                ],
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                className={`relative rounded-2xl border p-7 ${
                  plan.highlight
                    ? "border-emerald-500/45 bg-emerald-500/[0.08]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
                    Most Popular
                  </span>
                )}

                <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  {plan.name}
                </p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="pb-1 text-sm text-zinc-400">{plan.period}</span>
                </div>

                <div className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`mt-8 w-full ${
                    plan.highlight
                      ? "supa-button"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                  variant={plan.highlight ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="bg-white/[0.02] py-24 border-y border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-4"
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView={prefersReducedMotion ? undefined : "show"}
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.div variants={fadeUp}>
                <StatItem value={100} suffix="%" label="Real-time Data" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <div className="text-center">
                  <div className="stat-number text-4xl font-bold sm:text-5xl">
                    256-bit
                  </div>
                  <p className="mt-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
                    Encryption
                  </p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp}>
                <div className="text-center">
                  <div className="stat-number text-4xl font-bold sm:text-5xl">
                    24/7
                  </div>
                  <p className="mt-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
                    Ops Ready
                  </p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp}>
                <div className="text-center">
                  <div className="stat-number text-4xl font-bold sm:text-5xl">
                    99.9%
                  </div>
                  <p className="mt-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
                    Uptime
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FINAL CTA — Aurora + Email
        ══════════════════════════════════════════════════════ */}
        <section id="book-demo" className="relative overflow-hidden py-32">
          {/* Aurora background */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="absolute left-1/2 top-1/2 h-[600px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(148,163,184,0.18) 0%, rgba(113,113,122,0.06) 50%, transparent 80%)",
                filter: "blur(60px)",
              }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }
              }
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-[15%] top-[20%] h-[300px] w-[300px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(161,161,170,0.1) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { x: [0, 20, 0], y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }
              }
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[10%] bottom-[15%] h-[250px] w-[250px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(148,163,184,0.1) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { x: [0, -18, 0], y: [0, 12, 0], opacity: [0.3, 0.6, 0.3] }
              }
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
            />
          </div>

          <motion.div
            className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
            initial={
              prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 20 }
            }
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge className="mb-6 border-emerald-500/25 bg-white/5 text-emerald-400">
              <Sparkles className="mr-2 size-3.5" />
              Private Beta
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Ready to modernize your <br />
              <span className="shimmer-text">store operations?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Join the waitlist for our private beta and be the first to
              experience the next generation of store management.
            </p>

            {/* Email input row */}
            <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email address for waitlist"
                  className="w-full rounded-xl border border-border bg-muted/40 py-3 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none ring-0 transition-all focus:border-primary/50 focus:bg-muted/80 focus:ring-2 focus:ring-primary/20 hover:border-white/20"
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="glow-btn rounded-xl"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 supa-button px-7 text-base font-semibold rounded-xl"
                >
                  Join Waitlist
                </Button>
              </motion.div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 border-border bg-muted/40 px-8 text-base font-semibold text-foreground hover:bg-muted/80 hover:border-white/20 transition-all"
                >
                  View on GitHub
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}










