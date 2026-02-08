import { Sparkles, Eye, Target } from "lucide-react"

const values = [
  {
    icon: Sparkles,
    title: "Digital Reality",
    description:
      "We harness cutting-edge AI tools like Kling, Weavy, and Higgfield to produce imagery indistinguishable from reality.",
  },
  {
    icon: Eye,
    title: "Creative Vision",
    description:
      "Every campaign begins with a narrative. We craft compelling visual stories that elevate your brand far beyond standard production.",
  },
  {
    icon: Target,
    title: "Results Driven",
    description:
      "Our campaigns are designed to convert. From concept to delivery, we optimize every frame for maximum audience impact.",
  },
]

export function About() {
  return (
    <section id="about" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              About makit
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              <span className="text-balance">The studio where impossible becomes the standard</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Makit is a creative AI studio specializing in hyper-realistic video
              and photography campaigns for fashion and clothing brands. We
              eliminate the constraints of traditional production, delivering
              cinematic-quality campaigns in a fraction of the time and cost.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From virtual models to impossible locations, we empower brands to
              tell stories that were previously unimaginable. Our team merges
              deep fashion expertise with the most advanced generative AI tools
              on the market.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="group rounded-xl border border-foreground/5 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-accent/20 hover:bg-card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <value.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
