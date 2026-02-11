"use client"

import { useRef, useEffect, useCallback } from "react"
import { motion, Variants, useMotionValue, useTransform, useScroll } from "framer-motion"
import { useTranslation } from "@/lib/i18n/i18n"

/* ─── Animated SVG Icon Components ─── */

function LightningIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28 4L8 28h12l-4 16 20-24H24l4-16z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-[0_0_8px_currentColor]"
      />
      {/* Inner glow fill */}
      <path
        d="M28 4L8 28h12l-4 16 20-24H24l4-16z"
        fill="currentColor"
        opacity="0.15"
      />
    </svg>
  )
}

function CubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Front face */}
      <path d="M24 14L36 21V35L24 42L12 35V21L24 14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {/* Top face */}
      <path d="M24 14L36 21L24 28L12 21L24 14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
      {/* Center line */}
      <path d="M24 28V42" stroke="currentColor" strokeWidth="2" />
      {/* Right face */}
      <path d="M36 21L24 28V42L36 35V21Z" fill="currentColor" fillOpacity="0.05" />
      {/* Crosshair marks */}
      <circle cx="24" cy="28" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

function SpheresIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="28" r="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.06" />
      <circle cx="32" cy="28" r="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.10" />
      <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.14" />
      {/* Connection lines */}
      <line x1="20" y1="20" x2="28" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="28" y1="20" x2="20" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" />
      {/* Meridians */}
      <ellipse cx="24" cy="24" rx="8" ry="16" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      {/* Equator and tropics */}
      <ellipse cx="24" cy="24" rx="16" ry="6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <ellipse cx="24" cy="16" rx="14" ry="3" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
      <ellipse cx="24" cy="32" rx="14" ry="3" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
      {/* Ping dots */}
      <circle cx="18" cy="18" r="1.5" fill="currentColor" className="animate-glow-pulse" />
      <circle cx="30" cy="22" r="1.5" fill="currentColor" className="animate-glow-pulse" style={{ animationDelay: "0.5s" }} />
      <circle cx="22" cy="30" r="1.5" fill="currentColor" className="animate-glow-pulse" style={{ animationDelay: "1s" }} />
      <circle cx="32" cy="28" r="1.5" fill="currentColor" className="animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
    </svg>
  )
}

/* ─── Background Particles ─── */

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener("resize", resize)

    // Create particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.offsetWidth
        if (p.x > canvas.offsetWidth) p.x = 0
        if (p.y < 0) p.y = canvas.offsetHeight
        if (p.y > canvas.offsetHeight) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.fill()
      })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ willChange: "transform" }}
    />
  )
}

/* ─── Animation Variants ─── */

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
}

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/* ─── Feature Definitions ─── */

interface FeatureDef {
  titleKey: string
  descriptionKey: string
  Icon: React.FC<{ className?: string }>
  hoverClass: string
}

const featureDefs: FeatureDef[] = [
  {
    titleKey: "features.speed.title",
    descriptionKey: "features.speed.description",
    Icon: LightningIcon,
    hoverClass: "group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.6)] group-hover:scale-110",
  },
  {
    titleKey: "features.consistency.title",
    descriptionKey: "features.consistency.description",
    Icon: CubeIcon,
    hoverClass: "group-hover:rotate-[15deg] group-hover:scale-110",
  },
  {
    titleKey: "features.customization.title",
    descriptionKey: "features.customization.description",
    Icon: SpheresIcon,
    hoverClass: "group-hover:scale-110 group-hover:hue-rotate-30",
  },
  {
    titleKey: "features.global.title",
    descriptionKey: "features.global.description",
    Icon: GlobeIcon,
    hoverClass: "group-hover:animate-spin-slow group-hover:scale-105",
  },
]

/* ─── Main Component ─── */

export function Features() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax: particles move at 50% speed relative to scroll
  const particleY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])

  return (
    <section ref={sectionRef} className="relative px-4 py-28 md:py-40 overflow-hidden">
      {/* Background particle field with parallax */}
      <motion.div className="absolute inset-0" style={{ y: particleY }}>
        <ParticleField />
      </motion.div>

      {/* Subtle radial gradient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ─── Header Section ─── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerVariants}
          className="mb-20 max-w-3xl mx-auto text-center"
        >
          {/* H2 — Bold Sans-Serif headline */}
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
            {t('features.label')}
          </h2>

          {/* H3 — Monospace / thin, all caps */}
          <h3 className="mt-4 font-mono text-sm font-light uppercase tracking-[0.35em] text-zinc-500">
            {t('features.title')}
          </h3>

          {/* Body paragraph */}
          <p className="mt-8 text-base leading-relaxed text-zinc-400 md:text-lg">
            {t('features.body')}
          </p>
        </motion.div>

        {/* ─── 4 Pillar Cards Grid ─── */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featureDefs.map((feature) => (
            <motion.div
              key={feature.titleKey}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-xl transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.06]"
            >
              {/* Top glass edge */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />

              {/* Hover glow overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 60%)",
                }}
              />

              {/* Animated Icon */}
              <div className="relative mb-6">
                <div className={`w-14 h-14 text-white/70 transition-all duration-500 ${feature.hoverClass}`}>
                  <feature.Icon className="w-full h-full" />
                </div>
              </div>

              {/* Title */}
              <h4 className="font-display text-lg font-semibold text-white mb-3 tracking-tight">
                {t(feature.titleKey)}
              </h4>

              {/* Description */}
              <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors duration-500">
                {t(feature.descriptionKey)}
              </p>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
