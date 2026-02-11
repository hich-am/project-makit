"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/i18n/i18n"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const WHATSAPP_URL = "https://wa.me/message/YOUR_WHATSAPP_BUSINESS_ID"

export function CTA() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="relative overflow-hidden px-4 py-24 md:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div ref={ref} className={`relative z-10 mx-auto max-w-3xl text-center scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
        <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          <span className="text-balance">{t('cta.title')}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
          {t('cta.description')}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full bg-gradient-to-br from-[#E2E2E2] via-[#F5F5F7] to-[#999999] px-10 text-lg text-black font-medium shadow-[0_4px_14px_0_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]"
            asChild
          >
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                animate={{ translateX: ["-100%", "200%"] }}
              />
              <span className="relative flex items-center gap-2">
                <MessageCircle size={20} />
                {t('cta.bookCallLong')}
              </span>
            </motion.a>
          </Button>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground/40">
          {t('cta.tagline')}
        </p>
      </div>
    </section>
  )
}
