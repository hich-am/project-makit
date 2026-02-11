"use client"

import React from "react"
import { useTranslation } from "@/lib/i18n/i18n"
import { useScrollReveal } from "@/hooks/useScrollReveal"

/* ─── SVG Icon Components ─── */

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
      <path d="M24 14L36 21V35L24 42L12 35V21L24 14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 14L36 21L24 28L12 21L24 14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
      <path d="M24 28V42" stroke="currentColor" strokeWidth="2" />
      <path d="M36 21L24 28V42L36 35V21Z" fill="currentColor" fillOpacity="0.05" />
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
      <line x1="20" y1="20" x2="28" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="28" y1="20" x2="20" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="24" cy="24" rx="8" ry="16" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <ellipse cx="24" cy="24" rx="16" ry="6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <ellipse cx="24" cy="16" rx="14" ry="3" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
      <ellipse cx="24" cy="32" rx="14" ry="3" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="30" cy="22" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="22" cy="30" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="32" cy="28" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

/* ─── Feature Definitions ─── */

interface FeatureDef {
  titleKey: string
  descriptionKey: string
  Icon: React.FC<{ className?: string }>
}

const featureDefs: FeatureDef[] = [
  {
    titleKey: "features.speed.title",
    descriptionKey: "features.speed.description",
    Icon: LightningIcon,
  },
  {
    titleKey: "features.consistency.title",
    descriptionKey: "features.consistency.description",
    Icon: CubeIcon,
  },
  {
    titleKey: "features.customization.title",
    descriptionKey: "features.customization.description",
    Icon: SpheresIcon,
  },
  {
    titleKey: "features.global.title",
    descriptionKey: "features.global.description",
    Icon: GlobeIcon,
  },
]

/* ─── Main Component ─── */

export function Features() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="relative px-4 py-24 md:py-32">
      <div ref={ref} className={`mx-auto max-w-6xl scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
        {/* ─── Header Section ─── */}
        <div className="mb-16 text-center">
          {/* Label - Solid eclipse green */}
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-eclipse-glow">
            {t('features.label')}
          </p>
          {/* Title - Solid white, no gradient */}
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            <span className="text-balance">{t('features.title')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            {t('features.body')}
          </p>
        </div>

        {/* ─── 4 Pillar Cards Grid ─── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureDefs.map((feature) => (
            <div
              key={feature.titleKey}
              className="group relative rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-eclipse-glow/20 hover:bg-white/[0.05]"
            >
              {/* Top border highlight for glass edge effect */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-xl" />

              {/* Icon container */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-eclipse-deep/30 text-eclipse-glow transition-colors group-hover:bg-eclipse-deep/50">
                <feature.Icon className="w-6 h-6" />
              </div>

              {/* Title - Solid white */}
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                {t(feature.titleKey)}
              </h3>

              {/* Description - Zinc grey */}
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
