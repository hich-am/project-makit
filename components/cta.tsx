"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function CTA() {
  return (
    <section className="relative overflow-hidden px-4 py-24 md:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          <span className="text-balance">Ready to Make It?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
          Let{"'"}s create something impossible together. Book a strategy call
          and see what AI can do for your brand.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-accent to-[hsl(260,70%,55%)] px-10 text-lg text-accent-foreground hover:opacity-90"
            asChild
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                animate={{ translateX: ["-100%", "200%"] }}
              />
              <span className="relative flex items-center gap-2">
                Book a 15-min Strategy Call
                <ArrowRight size={18} />
              </span>
            </motion.a>
          </Button>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground/40">
          your kit to make it
        </p>
      </div>
    </section>
  )
}
