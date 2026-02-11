"use client"

import { Sparkles, Eye, Target } from "lucide-react"
import { useTranslation } from "@/lib/i18n/i18n"
import { useScrollReveal } from "@/hooks/useScrollReveal"

interface ValueDef {
  icon: React.ElementType
  titleKey: string
  descriptionKey: string
}

const valueDefs: ValueDef[] = [
  {
    icon: Sparkles,
    titleKey: "about.digitalReality.title",
    descriptionKey: "about.digitalReality.description",
  },
  {
    icon: Eye,
    titleKey: "about.creativeVision.title",
    descriptionKey: "about.creativeVision.description",
  },
  {
    icon: Target,
    titleKey: "about.resultsDriven.title",
    descriptionKey: "about.resultsDriven.description",
  },
]

export function About() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="about" className="relative px-4 py-24 md:py-32">
      <div ref={ref} className={`mx-auto max-w-6xl scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              {t('about.label')}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              <span className="text-balance">{t('about.title')}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t('about.description1')}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t('about.description2')}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {valueDefs.map((value) => (
              <div
                key={value.titleKey}
                className="group rounded-xl border border-foreground/5 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-accent/20 hover:bg-card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <value.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {t(value.titleKey)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t(value.descriptionKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
