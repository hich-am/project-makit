"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useTranslation } from "@/lib/i18n/i18n"
import Hls from "hls.js"

// Staggered animation variants for orchestrated entrance
const navbarVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.5, ease: "easeOut" } },
}

const headlineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.4,
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const subtextVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5, ease: "easeOut" } },
}

const buttonsVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5, ease: "easeOut" } },
}

const videoVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.8, duration: 1, ease: "easeOut" } },
}

export function Hero() {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)

  // HLS Video Setup
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const hlsSource = "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      })
      hls.loadSource(hlsSource)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay was prevented, video will show first frame
        })
      })

      return () => {
        hls.destroy()
      }
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari native HLS support
      video.src = hlsSource
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => { })
      })
    }
  }, [])

  const line1Words = t('hero.headline.line1').split(" ")
  const line2Words = t('hero.headline.line2').split(" ")

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Monochrome Eclipse Arc - White/Silver radial gradient */}
      <div className="pointer-events-none absolute inset-0">
        {/* Moonlight arc at top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 h-[800px] w-[1200px] rounded-full bg-gradient-radial from-white/10 via-white/5 to-transparent animate-eclipse-pulse"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)",
          }}
        />
        {/* Subtle ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        initial="hidden"
        animate="visible"
      >
        {/* Announcement Badge */}
        <motion.div variants={badgeVariants}>
          <Badge
            variant="outline"
            className="mb-8 gap-2 rounded-full border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400 backdrop-blur-md"
          >
            <span className="inline-block h-2 w-2 animate-glow-pulse rounded-full bg-white/60" />
            {t('hero.badge')}
          </Badge>
        </motion.div>

        {/* Two-Line Headline - MASSIVE, Solid White */}
        <motion.h1
          className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-[80px]"
          variants={headlineVariants}
        >
          {/* Line 1 - Added pb-2 and leading-tight to fix descender clipping */}
          <span className="block pb-2 overflow-hidden leading-tight">
            {line1Words.map((word, i) => (
              <motion.span
                key={`l1-${i}`}
                className="inline-block me-[0.2em] last:me-0"
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </span>

          {/* Line 2 - Added pb-2 and leading-tight to fix descender clipping */}
          <span className="block pb-2 overflow-hidden leading-tight">
            {line2Words.map((word, i) => (
              <motion.span
                key={`l2-${i}`}
                className="inline-block me-[0.2em] last:me-0"
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={subtextVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400 md:text-xl"
        >
          {t('hero.description')}
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={buttonsVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Primary button - Solid White, Black Text */}
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full bg-gradient-to-b from-[#FFFFFF] via-[#E4E4E7] to-[#A1A1AA] px-8 text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            asChild
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative flex items-center gap-2">
                {t('cta.bookCall')}
                <ArrowRight size={16} />
              </span>
            </motion.a>
          </Button>

          {/* Secondary button - Transparent, White Border */}
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/[0.05] backdrop-blur-md"
            asChild
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('cta.viewWork')}
            </motion.a>
          </Button>
        </motion.div>
      </motion.div>

      {/* HLS Video - Bottom-aligned with mix-blend-screen */}
      <motion.div
        variants={videoVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 start-0 end-0 w-full overflow-hidden mb-[-150px] pointer-events-none"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto mix-blend-screen grayscale opacity-80"
          style={{ filter: "grayscale(100%)" }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-20"
      >
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white/40" />
        </div>
      </motion.div>
    </section>
  )
}