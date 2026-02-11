"use client"

import { useTranslation } from "@/lib/i18n/i18n"

const brands = [
  "OpenAI",
  "Midjourney",
  "Kling",
  "Runway",
  "Stable Diffusion",
  "Weavy",
  "Higgfield",
  "ComfyUI",
]

export function BrandMarquee() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden border-y border-foreground/5 py-12">
      <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/60">
        {t('marquee.poweredBy')}
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="animate-marquee flex w-max gap-12">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="shrink-0 text-lg font-semibold text-foreground/20 transition-colors duration-300 hover:text-foreground/80"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
