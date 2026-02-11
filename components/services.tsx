"use client"

import React from "react"
import { Camera, Layers, Zap, Play, Globe, Palette } from "lucide-react"
import { useTranslation } from "@/lib/i18n/i18n"

interface ServiceDef {
  icon: React.ElementType
  titleKey: string
  descriptionKey: string
}

const serviceDefs: ServiceDef[] = [
  {
    icon: Camera,
    titleKey: "services.virtualPhotoshoots.title",
    descriptionKey: "services.virtualPhotoshoots.description",
  },
  {
    icon: Play,
    titleKey: "services.aiVideo.title",
    descriptionKey: "services.aiVideo.description",
  },
  {
    icon: Layers,
    titleKey: "services.productViz.title",
    descriptionKey: "services.productViz.description",
  },
  {
    icon: Globe,
    titleKey: "services.locations.title",
    descriptionKey: "services.locations.description",
  },
  {
    icon: Palette,
    titleKey: "services.creativeDirection.title",
    descriptionKey: "services.creativeDirection.description",
  },
  {
    icon: Zap,
    titleKey: "services.delivery.title",
    descriptionKey: "services.delivery.description",
  },
]

export function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          {/* Label - Solid eclipse green */}
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-eclipse-glow">
            {t('services.label')}
          </p>
          {/* Title - Solid white, no gradient */}
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            <span className="text-balance">{t('services.title')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            {t('services.description')}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceDefs.map((service) => (
            <div
              key={service.titleKey}
              className="group relative rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-eclipse-glow/20 hover:bg-white/[0.05]"
            >
              {/* Top border highlight for glass edge effect */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-xl" />

              {/* Icon container */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-eclipse-deep/30 text-eclipse-glow transition-colors group-hover:bg-eclipse-deep/50">
                <service.icon size={24} />
              </div>

              {/* Title - Solid white */}
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                {t(service.titleKey)}
              </h3>

              {/* Description - Zinc grey */}
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {t(service.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
