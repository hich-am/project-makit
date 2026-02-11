"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, Variants } from "framer-motion"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useTranslation } from "@/lib/i18n/i18n"

const navbarVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useTranslation()

  const navLinks = [
    { label: t('nav.work'), href: "#work" },
    { label: t('nav.services'), href: "#services" },
    { label: t('nav.about'), href: "#about" },
    { label: t('nav.contact'), href: "#contact" },
  ]

  return (
    <motion.nav
      className="fixed top-4 inset-x-4 z-50 mx-auto max-w-4xl"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main navbar - Monochrome Glass styling */}
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md md:px-6">
        {/* Top border highlight for glass edge effect */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full" />

        <a href="#" className="flex items-center gap-2" aria-label="makit home">
          <Image
            src="logonobg.png"
            alt="makit logo"
            width={240}
            height={80}
            className="max-h-8"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* CTA - Solid White button, Black text */}
          <Button
            size="sm"
            className="rounded-full bg-gradient-to-b from-[#FFFFFF] via-[#F8F8F8] to-[#D4D4D8] text-black font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:to-[#E4E4E7] hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:scale-[1.03]"
            asChild
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('nav.startProject')}
            </motion.a>
          </Button>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-full p-2 text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu - Monochrome Glass styling */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md md:hidden"
        >
          {/* Top border highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Language Switcher */}
          <div className="py-2">
            <LanguageSwitcher />
          </div>

          {/* Mobile CTA - Solid White */}
          <Button
            size="sm"
            className="mt-2 rounded-full bg-white text-black font-semibold"
            asChild
          >
            <a href="#contact" onClick={() => setMobileOpen(false)}>{t('nav.startProject')}</a>
          </Button>
        </motion.div>
      )}
    </motion.nav>
  )
}
