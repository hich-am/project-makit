import Image from "next/image"

const footerLinks = {
  Studio: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  Connect: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "X / Twitter", href: "#" },
    { label: "Behance", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-foreground/5 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/images/makit-logo.png"
              alt="makit logo"
              width={100}
              height={32}
              className="h-8 w-auto"
              style={{ width: "auto" }}
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your kit to make it. Hyper-realistic AI campaigns for the fashion
              brands of tomorrow.
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
            {new Date().getFullYear()} makit. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/40">
            Crafted with AI. Made for the future.
          </p>
        </div>
      </div>
    </footer>
  )
}
