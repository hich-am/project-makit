"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "@/lib/i18n/i18n"
import { Play, X } from "lucide-react"

// ─── Types ──────────────────────────────────────────────────────────────────────
type FilterTab = "products" | "models" | "videos"

interface PortfolioItem {
  title: string
  image: string
  tagKeys: string[]
  span?: string
}

interface VideoItem {
  title: string
  poster: string
  tagKeys: string[]
}

// ─── Data ───────────────────────────────────────────────────────────────────────

const products: PortfolioItem[] = [
  { title: "Ethereal Couture", image: "/portfolio/products/product-1.png", tagKeys: ["portfolio.tag.product", "portfolio.tag.aiGenerated"] },
  { title: "Obsidian Shades", image: "/portfolio/products/product-2.png", tagKeys: ["portfolio.tag.accessory", "portfolio.tag.aiGenerated"] },
  { title: "Midnight Stilettos", image: "/portfolio/products/product-3.png", tagKeys: ["portfolio.tag.footwear", "portfolio.tag.aiGenerated"] },
  { title: "Noir Ensemble", image: "/portfolio/products/product-4.png", tagKeys: ["portfolio.tag.apparel", "portfolio.tag.aiGenerated"] },
  { title: "Elixir Nuit", image: "/portfolio/products/product-5.png", tagKeys: ["portfolio.tag.fragrance", "portfolio.tag.aiGenerated"] },
  { title: "Heritage Satchel", image: "/portfolio/products/product-6.png", tagKeys: ["portfolio.tag.leather", "portfolio.tag.aiGenerated"] },
]

const models: PortfolioItem[] = [
  { title: "Golden Hour Editorial", image: "/portfolio/models/model-1.png", tagKeys: ["portfolio.tag.editorial", "portfolio.tag.virtualModel"], span: "md:col-span-2 md:row-span-2" },
  { title: "Lookbook SS26", image: "/portfolio/models/model-2.png", tagKeys: ["portfolio.tag.lookbook", "portfolio.tag.aiGenerated"] },
  { title: "Neon Streets Campaign", image: "/portfolio/models/model-3.png", tagKeys: ["portfolio.tag.campaign", "portfolio.tag.virtualModel"] },
  { title: "Urban Streetwear", image: "/portfolio/models/model-4.png", tagKeys: ["portfolio.tag.streetwear", "portfolio.tag.aiGenerated"] },
]

const videos: VideoItem[] = [
  { title: "Runway Campaign Film", poster: "/portfolio/videos/video-1.svg", tagKeys: ["portfolio.tag.runway", "portfolio.tag.aiVideo"] },
  { title: "Brand Story", poster: "/portfolio/videos/video-2.svg", tagKeys: ["portfolio.tag.brandFilm", "portfolio.tag.aiVideo"] },
  { title: "Behind the Scenes", poster: "/portfolio/videos/video-3.svg", tagKeys: ["portfolio.tag.bts", "portfolio.tag.aiVideo"] },
]

// ─── Framer Motion Variants ─────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

// ─── Component ──────────────────────────────────────────────────────────────────

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<FilterTab>("products")
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | VideoItem | null>(null)
  const { t } = useTranslation()

  const tabs: { key: FilterTab; labelKey: string }[] = [
    { key: "products", labelKey: "portfolio.filter.products" },
    { key: "models", labelKey: "portfolio.filter.models" },
    { key: "videos", labelKey: "portfolio.filter.videos" },
  ]

  const resolveTag = (key: string): string => {
    const translated = t(key)
    return translated !== key ? translated : key
  }

  return (
    <section id="work" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* ─── Header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            {t("portfolio.label")}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">{t("portfolio.title")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t("portfolio.description")}
          </p>
        </motion.div>

        {/* ─── Filter Toggle ───────────────────────────────────────── */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${activeTab === tab.key
                  ? "bg-white text-black shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
                  : "text-zinc-400 hover:text-white"
                  }`}
              >
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t(tab.labelKey)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── Content ─────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeTab === "products" && (
            <PortfolioGrid key="products" items={products} resolveTag={resolveTag} onItemClick={setSelectedItem} />
          )}
          {activeTab === "models" && (
            <PortfolioGrid key="models" items={models} resolveTag={resolveTag} onItemClick={setSelectedItem} />
          )}
          {activeTab === "videos" && (
            <VideoGrid key="videos" items={videos} resolveTag={resolveTag} t={t} onItemClick={setSelectedItem} />
          )}
        </AnimatePresence>

        {/* ─── Lightbox ────────────────────────────────────────────── */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-xl md:p-10"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative max-h-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white/70 backdrop-blur-md transition-colors hover:bg-black/70 hover:text-white"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row">
                  {/* Image/Video Container */}
                  <div className="relative aspect-square w-full bg-zinc-900 md:aspect-auto md:h-[70vh] md:w-[60%]">
                    <Image
                      src={'image' in selectedItem ? selectedItem.image : selectedItem.poster}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Info Sidebar */}
                  <div className="flex flex-col justify-center p-8 md:w-[40%]">
                    <p className="text-xs font-medium uppercase tracking-widest text-accent">
                      {activeTab === 'videos' ? t('portfolio.filter.videos') : activeTab === 'models' ? t('portfolio.filter.models') : t('portfolio.filter.products')}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">
                      {selectedItem.title}
                    </h3>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {selectedItem.tagKeys.map((tagKey) => (
                        <Badge
                          key={tagKey}
                          variant="outline"
                          className="rounded-full border-foreground/10 bg-foreground/5 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm"
                        >
                          {resolveTag(tagKey)}
                        </Badge>
                      ))}
                    </div>

                    <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                      {t("portfolio.description")}
                    </p>

                    <div className="mt-auto pt-10">
                      <button
                        className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        onClick={() => setSelectedItem(null)}
                      >
                        {t("common.close") || "Close Preview"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── Product / Model Grid ───────────────────────────────────────────────────────

function PortfolioGrid({
  items,
  resolveTag,
  onItemClick,
}: {
  items: PortfolioItem[]
  resolveTag: (key: string) => string
  onItemClick: (item: PortfolioItem) => void
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[280px]"
    >
      {items.map((item) => (
        <motion.div
          key={item.title}
          variants={itemVariants}
          className={`group relative cursor-zoom-in overflow-hidden rounded-xl border border-foreground/5 bg-card ${item.span ?? ""}`}
          onClick={() => onItemClick(item)}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="h-full w-full relative">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.tagKeys.map((tagKey) => (
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
          {/* Hover border glow */}
          <div className="absolute inset-0 border-2 border-accent/0 transition-colors duration-300 group-hover:border-accent/50 rounded-xl pointer-events-none" />
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─── Video Grid ─────────────────────────────────────────────────────────────────

function VideoGrid({
  items,
  resolveTag,
  t,
  onItemClick,
}: {
  items: VideoItem[]
  resolveTag: (key: string) => string
  t: (key: string) => string
  onItemClick: (item: VideoItem) => void
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
    >
      {items.map((item) => (
        <motion.div
          key={item.title}
          variants={itemVariants}
          className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-xl border border-foreground/5 bg-card"
          onClick={() => onItemClick(item)}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Poster */}
          <Image
            src={item.poster}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
          />

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
              <Play size={24} className="ml-1 text-white" />
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-display text-sm font-semibold text-foreground">
              {item.title}
            </h3>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {item.tagKeys.map((tagKey) => (
                <Badge
                  key={tagKey}
                  variant="outline"
                  className="rounded-full border-foreground/10 bg-foreground/5 text-[10px] text-muted-foreground backdrop-blur-sm"
                >
                  {resolveTag(tagKey)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Hover border glow */}
          <div className="absolute inset-0 border-2 border-accent/0 transition-colors duration-300 group-hover:border-accent/50 rounded-xl pointer-events-none" />
        </motion.div>
      ))}
    </motion.div>
  )
}
