"use client"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function Hero() {
  const headline = "Reimagining Digital Fashion"
  const words = headline.split(" ")

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Background gradient effects */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Badge
            variant="outline"
            className="mb-8 gap-2 rounded-full border-foreground/10 bg-foreground/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm"
          >
            <span className="inline-block h-2 w-2 animate-glow-pulse rounded-full bg-accent" />
            The Future of Digital Apparel
          </Badge>
        </motion.div>

        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl overflow-hidden">
          <span className="block text-balance">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.2em] last:mr-0"
                variants={wordVariants}
              >
                {word === "Digital" || word === "Fashion" ? (
                  word === "Fashion" ? (
                    <span className="bg-gradient-to-r from-accent via-[hsl(260,70%,55%)] to-[hsl(260,70%,55%)] bg-clip-text text-transparent">
                      {word}
                    </span>
                  ) : (
                    <span className="bg-gradient-to-r from-accent via-[hsl(260,70%,55%)] to-[hsl(260,70%,55%)] bg-clip-text text-transparent">
                      {word}
                    </span>
                  )
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </span>
          {/* Fallback structure kept in mind, but using word split for reveal */}
        </h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          We turn clothing concepts into hyper-realistic AI campaigns.
          Impossible shoots made possible.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground/60"
        >
          your kit to make it
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-accent to-[hsl(260,70%,55%)] px-8 text-accent-foreground hover:opacity-90"
            asChild
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                animate={{ translateX: ["-100%", "200%"] }}
              />
              <span className="relative flex items-center gap-2">
                View Our Work
                <ArrowRight size={16} />
              </span>
            </motion.a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-foreground/20 text-foreground hover:bg-foreground/10 bg-transparent"
            asChild
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
            </motion.a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-foreground/20 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-foreground/40" />
        </div>
      </motion.div>
    </section>
  )
}
