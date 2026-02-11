"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n/i18n"
import { useScrollReveal } from "@/hooks/useScrollReveal"

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="contact" className="relative px-4 py-24 md:py-32">
      <div ref={ref} className={`mx-auto max-w-6xl scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              {t('contact.label')}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              <span className="text-balance">{t('contact.title')}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t('contact.description')}
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Mail size={18} />
                </div>
                <span className="text-sm">hello@makit.studio</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <ArrowRight size={18} />
                </div>
                <span className="text-sm">{t('contact.bookCall')}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-foreground/5 bg-card/50 p-6 backdrop-blur-sm md:p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Send size={24} />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                  {t('contact.sent.title')}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t('contact.sent.description')}
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="flex flex-col gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {t('contact.firstName')}
                    </label>
                    <Input
                      id="firstName"
                      placeholder={t('contact.placeholder.firstName')}
                      required
                      className="rounded-lg border-foreground/10 bg-background/50 text-foreground placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {t('contact.lastName')}
                    </label>
                    <Input
                      id="lastName"
                      placeholder={t('contact.placeholder.lastName')}
                      required
                      className="rounded-lg border-foreground/10 bg-background/50 text-foreground placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t('contact.email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('contact.placeholder.email')}
                    required
                    className="rounded-lg border-foreground/10 bg-background/50 text-foreground placeholder:text-muted-foreground/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t('contact.company')}
                  </label>
                  <Input
                    id="company"
                    placeholder={t('contact.placeholder.company')}
                    className="rounded-lg border-foreground/10 bg-background/50 text-foreground placeholder:text-muted-foreground/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t('contact.placeholder.message')}
                    rows={4}
                    required
                    className="resize-none rounded-lg border-foreground/10 bg-background/50 text-foreground placeholder:text-muted-foreground/40"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="mt-2 rounded-full bg-gradient-to-tr from-[#949494] via-[#F5F5F7] to-[#A1A1AA] text-black font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] transition-all hover:brightness-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                >
                  {t('contact.send')}
                  <Send size={16} />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
