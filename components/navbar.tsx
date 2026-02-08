"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-full border border-foreground/10 bg-background/40 px-4 py-2 backdrop-blur-md md:px-6">
        <a href="#" className="flex items-center gap-2" aria-label="makit home">
          <Image
            src="logonobg.png"
            alt="zbi"
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
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button size="sm" variant="outline" className="rounded-full border-foreground/20 text-foreground hover:bg-foreground/10 bg-transparent" asChild>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Project
            </motion.a>
          </Button>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-full p-2 text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mt-2 flex flex-col gap-2 rounded-2xl border border-foreground/10 bg-background/90 p-4 backdrop-blur-md md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button size="sm" variant="outline" className="mt-2 rounded-full border-foreground/20 text-foreground bg-transparent" asChild>
            <a href="#contact" onClick={() => setMobileOpen(false)}>Start Project</a>
          </Button>
        </div>
      )}
    </nav>
  )
}
