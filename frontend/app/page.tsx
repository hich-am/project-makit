import { Navbar } from "@/components/navbar"
import { EclipseGlow } from "@/components/EclipseGlow"
import { Hero } from "@/components/hero"
import { BrandMarquee } from "@/components/brand-marquee"
import { Portfolio } from "@/components/portfolio"
import { About } from "@/components/about"
import { Features } from "@/components/features"
import { Services } from "@/components/services"
import { Contact } from "@/components/contact"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"


export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#010101]">
      <Navbar />
      {/* Eclipse atmospheric glow - positioned behind hero content */}
      <Hero />
      <BrandMarquee />
      <Portfolio />
      <Services />
      <About />
      <Features />
      <CTA />
      {/*<Contact />*/}
      <Footer />
    </main>
  )
}
