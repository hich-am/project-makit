"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/i18n/i18n"

interface PortfolioItem {
  title: string
  categoryKey: string
  image: string
  tagKeys: string[]
  span: string
}

const projects: PortfolioItem[] = [
  {
    title: "Ethereal Couture",
    categoryKey: "portfolio.category.aiEditorial",
    image: "/logonobg.png",
    tagKeys: ["Kling AI", "portfolio.tag.virtualModel"],
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Golden Hour Collection",
    categoryKey: "portfolio.category.campaign",
    image: "/placeholder.svg",
    tagKeys: ["Weavy", "Photoshoot"],
    span: "md:col-span-1",
  },
  {
    title: "Deep Dive Series",
    categoryKey: "portfolio.category.editorial",
    image: "/placeholder.svg",
    tagKeys: ["Higgfield", "portfolio.tag.impossibleLocation"],
    span: "md:col-span-1",
  },
  {
    title: "Neon Streets",
    categoryKey: "portfolio.category.campaign",
    image: "/placeholder.svg",
    tagKeys: ["Kling AI", "portfolio.tag.virtualSet"],
    span: "md:col-span-1",
  },
  {
    title: "Desert Mirage",
    categoryKey: "portfolio.category.editorial",
    image: "/placeholder.svg",
    tagKeys: ["Weavy", "portfolio.tag.aiCampaign"],
    span: "md:col-span-1",
  },
  {
    title: "Zero Gravity",
    categoryKey: "portfolio.category.concept",
    image: "/placeholder.svg",
    tagKeys: ["Higgfield", "portfolio.tag.impossibleLocation"],
    span: "md:col-span-2",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function Portfolio() {
  const { t } = useTranslation()

  // Helper: if the key exists in translations, use t(), otherwise return as-is (for tool names like "Kling AI")
  const resolveTag = (key: string): string => {
    const translated = t(key)
    return translated !== key ? translated : key
  }

  return (
    <section id="work" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            {t('portfolio.label')}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">{t('portfolio.title')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t('portfolio.description')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 md:grid-cols-4 md:auto-rows-[280px]"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-xl border border-foreground/5 bg-card ${project.span}`}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="h-full w-full relative">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-xs font-medium uppercase tracking-wider text-accent">
                    {t(project.categoryKey)}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tagKeys.map((tagKey) => (
                      <Badge
                        key={tagKey}
                        variant="outline"
                        className="rounded-full border-foreground/10 bg-foreground/5 text-xs text-muted-foreground backdrop-blur-sm"
                      >
                        {resolveTag(tagKey)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-accent/0 transition-colors duration-300 group-hover:border-accent/50 rounded-xl pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
