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
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            What We Do
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">Services & Offerings</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            End-to-end AI-powered creative production for fashion brands ready to
            lead the future.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl border border-foreground/5 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-accent/20 hover:bg-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                <service.icon size={24} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
