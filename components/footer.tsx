"use client"

import Image from "next/image"
import { useTranslation } from "@/lib/i18n/i18n"

export function Footer() {
  const { t } = useTranslation()

  const footerLinks = {
    [t('footer.studio')]: [
      { label: t('footer.work'), href: "#work" },
      { label: t('footer.services'), href: "#services" },
      { label: t('footer.about'), href: "#about" },
      { label: t('footer.contact'), href: "#contact" },
    ],
    [t('footer.connect')]: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "Behance", href: "#" },
    ],
  }

  return (
    <footer className="border-t border-foreground/5 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="logonobg.png"
              alt="makit logo"
              width={240}
              height={80}
              className="max-h-8"
              style={{ width: "auto", height: "auto" }}
              priority
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t('footer.tagline')}
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                {category}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-foreground/5 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground/40">
            {new Date().getFullYear()} makit. {t('footer.rights')}.
          </p>
          <p className="text-xs text-muted-foreground/40">
            {t('footer.crafted')}
          </p>
        </div>
      </div>
    </footer>
  )
}
