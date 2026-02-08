"use client"

import { Users, MapPin, Zap } from "lucide-react"

import { motion } from "framer-motion"

const features = [
  {
    icon: Users,
    title: "Virtual Models",
    description:
      "No casting needed. Generate diverse, photorealistic models tailored to your brand identity and campaign vision.",
    stat: "Unlimited",
    statLabel: "Model options",
  },
  {
    icon: MapPin,
    title: "Infinite Locations",
    description:
      "Shoot in space, underwater, on mountaintops, or inside conceptual environments. No location is off-limits.",
    stat: "Any",
    statLabel: "Environment",
  },
  {
    icon: Zap,
    title: "Hyper-Speed Delivery",
    description:
      "Full campaigns delivered in days, not months. Rapid iteration cycles with unlimited creative revisions.",
    stat: "10x",
    statLabel: "Faster delivery",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
}

export function Features() {
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
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Why makit
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">Production without boundaries</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-xl border border-foreground/5 bg-card/50 p-8 backdrop-blur-sm transition-colors hover:border-accent/20 hover:bg-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                <feature.icon size={24} />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <div className="mt-6 border-t border-foreground/5 pt-6">
                <p className="font-display text-2xl font-bold text-accent">
                  {feature.stat}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground/60">
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
