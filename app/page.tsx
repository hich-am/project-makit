import { Navbar } from "@/components/navbar"
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
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <BrandMarquee />
      <Portfolio />
      <About />
      <Features />
      <Services />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}
