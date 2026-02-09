import React from "react"
import { Camera, Layers, Zap, Play, Globe, Palette } from "lucide-react"

interface Service {
  icon: React.ElementType
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: Camera,
    title: "Virtual Photoshoots",
    description:
      "No casting, no crew, no limits. Generate hyper-realistic model photography for lookbooks, e-commerce, and editorials.",
  },
  {
    icon: Play,
    title: "AI Video Campaigns",
    description:
      "Produce cinematic video content for social, web, and broadcast without a single day on set.",
  },
  {
    icon: Layers,
    title: "Product Visualization",
    description:
      "Transform flat designs into photorealistic product renders on virtual models and environments.",
  },
  {
    icon: Globe,
    title: "Infinite Locations",
    description:
      "Shoot on a rooftop in Tokyo, underwater in the Maldives, or on Mars. Any setting is possible.",
  },
  {
    icon: Palette,
    title: "Creative Direction",
    description:
      "From moodboard to final delivery, our team provides full creative direction tailored to your brand.",
  },
  {
    icon: Zap,
    title: "Hyper-Speed Delivery",
    description:
      "Campaigns delivered in days instead of months. Rapid iteration with unlimited revisions.",
  },
]

export function Services() {
  return (
    <section id="services" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          {/* Label - Solid eclipse green */}
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-eclipse-glow">
            What We Do
          </p>
          {/* Title - Solid white, no gradient */}
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            <span className="text-balance">Services & Offerings</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            End-to-end AI-powered creative production for fashion brands ready to
            lead the future.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
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
                {service.title}
              </h3>

              {/* Description - Zinc grey */}
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
