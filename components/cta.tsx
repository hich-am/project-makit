"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageCircle, Sparkles, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/i18n/i18n"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { toast } from "sonner"

const WHATSAPP_URL = "https://wa.me/message/YOUR_WHATSAPP_BUSINESS_ID"

export function CTA() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollReveal()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      })

      if (res.status === 201) {
        toast.success(t("waitlist.success"))
        setOpen(false)
        setFirstName("")
        setLastName("")
        setEmail("")
      } else if (res.status === 409) {
        toast.info(t("waitlist.duplicate"))
      } else {
        toast.error(t("waitlist.error"))
      }
    } catch {
      toast.error(t("waitlist.error"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="cta" className="relative overflow-hidden px-4 py-24 md:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div ref={ref} className={`relative z-10 mx-auto max-w-3xl text-center scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-6xl">
          <span className="text-balance">{t('cta.title')}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
          {t('cta.description')}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="group relative w-full sm:w-auto max-w-full overflow-hidden rounded-full bg-gradient-to-br from-[#E2E2E2] via-[#F5F5F7] to-[#999999] px-6 sm:px-10 text-base sm:text-lg text-black font-medium shadow-[0_4px_14px_0_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]"
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

          {/* Waitlist Button + Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="outline"
                className="group relative w-full sm:w-auto max-w-full overflow-hidden rounded-full border-foreground/10 bg-transparent px-6 sm:px-10 text-base sm:text-lg text-foreground font-medium backdrop-blur-sm transition-all hover:border-foreground/20 hover:bg-foreground/5 hover:scale-[1.02] active:scale-[0.98]"
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative flex items-center gap-2">
                    <Sparkles size={20} />
                    {t('waitlist.join')}
                  </span>
                </motion.button>
              </Button>
            </DialogTrigger>
            <DialogContent className="border-foreground/10 bg-[#0a0a0a] backdrop-blur-xl sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-bold tracking-tight text-foreground">
                  {t('waitlist.title')}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {t('waitlist.description')}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="waitlist-firstName"
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      {t('waitlist.firstName')}
                    </label>
                    <Input
                      id="waitlist-firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder={t('waitlist.placeholder.firstName')}
                      required
                      className="rounded-lg border-foreground/10 bg-background/50 text-foreground placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="waitlist-lastName"
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      {t('waitlist.lastName')}
                    </label>
                    <Input
                      id="waitlist-lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder={t('waitlist.placeholder.lastName')}
                      required
                      className="rounded-lg border-foreground/10 bg-background/50 text-foreground placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="waitlist-email"
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {t('waitlist.email')}
                  </label>
                  <Input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('waitlist.placeholder.email')}
                    required
                    className="rounded-lg border-foreground/10 bg-background/50 text-foreground placeholder:text-muted-foreground/40"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="mt-2 rounded-full bg-gradient-to-tr from-[#949494] via-[#F5F5F7] to-[#A1A1AA] text-black font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] transition-all hover:brightness-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    t('waitlist.submit')
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground/40">
          {t('cta.tagline')}
        </p>
      </div>
    </section>
  )
}
