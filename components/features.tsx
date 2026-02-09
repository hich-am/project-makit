"use client"

import { Users, MapPin, Zap } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useTranslation } from "@/lib/i18n/i18n"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
}

export function Features() {
  const { t } = useTranslation()

  const features = [
    {
      icon: Users,
      title: t('features.virtualModels.title'),
      description: t('features.virtualModels.description'),
      stat: t('features.virtualModels.stat'),
      statLabel: t('features.virtualModels.statLabel'),
    },
    {
      icon: MapPin,
      title: t('features.locations.title'),
      description: t('features.locations.description'),
      stat: t('features.locations.stat'),
      statLabel: t('features.locations.statLabel'),
    },
    {
      icon: Zap,
      title: t('features.delivery.title'),
      description: t('features.delivery.description'),
      stat: t('features.delivery.stat'),
      statLabel: t('features.delivery.statLabel'),
    },
  ]

  return (
    <section className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          {/* Label - Solid eclipse green, no gradient */}
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-eclipse-glow">
            {t('features.label')}
          </p>
          {/* Title - Solid white, no gradient */}
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            <span className="text-balance">{t('features.title')}</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl transition-colors hover:border-eclipse-glow/20 hover:bg-white/[0.05]"
            >
              {/* Top border highlight for glass edge effect */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Icon container */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-eclipse-deep/30 text-eclipse-glow transition-transform duration-300 group-hover:scale-110">
                <feature.icon size={24} />
              </div>

              {/* Title - Solid white */}
              <h3 className="mt-6 font-display text-xl font-semibold text-white">
                {feature.title}
              </h3>

              {/* Description - Zinc grey */}
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>

              <div className="mt-6 border-t border-white/[0.08] pt-6">
                {/* Stat - Eclipse green, solid color */}
                <p className="font-display text-2xl font-bold text-eclipse-glow">
                  {feature.stat}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                  {feature.statLabel}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
