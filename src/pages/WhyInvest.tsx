import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-villa.jpg";

const fundamentals = [
  {
    title: "Global Tourism Economy",
    description: "One of the world's strongest and most diversified tourism economies, supporting consistent year-round demand.",
  },
  {
    title: "Dual Demand Sources",
    description: "Both international visitors and a rapidly growing domestic travel market from Indonesia's 280 million population.",
  },
  {
    title: "Limited Quality Supply",
    description: "Limited supply of professionally designed, high-quality rental stock creates natural scarcity value.",
  },
  {
    title: "Entry Pricing Advantage",
    description: "Entry pricing that remains materially below Western markets while offering superior yield characteristics.",
  },
];

const comparison = [
  { market: "Developed Markets (EU, US, AU)", yield: "3–5%", note: "Typical residential rental" },
  { market: "Bali, Indonesia", yield: "12–18%", note: "Professionally managed assets" },
];

export default function WhyInvest() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Bali landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        <div className="relative section-container pb-16 lg:pb-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight max-w-3xl"
          >
            A Yield Environment Shaped by Real Demand
          </motion.h1>
        </div>
      </section>

      {/* Introduction */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans text-base lg:text-lg text-muted-foreground leading-relaxed space-y-6"
          >
            <p>
              Indonesia combines several fundamentals rarely found together in 
              mature property markets. For investors from developed economies, 
              this results in a clear structural yield differential.
            </p>
            <p>
              This is not driven by financial engineering, but by market mechanics: 
              high occupancy, shorter stay durations, and strong nightly rates 
              supported by global travel patterns.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-6">
              Yield Comparison
            </h3>
            <div className="space-y-4">
              {comparison.map((item) => (
                <div key={item.market} className="border border-foreground p-6">
                  <div className="font-serif text-3xl lg:text-4xl font-light">
                    {item.yield}
                  </div>
                  <div className="mt-2 font-sans text-sm font-medium">
                    {item.market}
                  </div>
                  <div className="mt-1 font-sans text-xs text-muted-foreground">
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 font-sans text-xs text-muted-foreground italic">
              Illustrative only — not a forecast or guarantee
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Fundamentals */}
      <Section variant="accent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            Market Fundamentals
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {fundamentals.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-l border-foreground pl-6"
            >
              <h3 className="font-serif text-xl">{item.title}</h3>
              <p className="mt-3 font-sans text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Demand Security */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              Demand Security Over Speculation
            </h2>
            <div className="mt-8 space-y-6 font-sans text-base text-muted-foreground leading-relaxed">
              <p>
                Bali benefits from long-term, resilient tourism demand supported 
                by both international and domestic travel. This demand creates a 
                rental market that is structurally different from mature Western 
                residential markets.
              </p>
              <p>
                The yield differential is driven by market fundamentals and demand 
                structure, not increased leverage or speculative risk. Well-located, 
                professionally managed assets operate in an environment where 
                double-digit gross yields are achievable under conservative assumptions.
              </p>
              <p>
                Wahi's approach prioritises demand security, conservative structuring, 
                and long-term operability — rather than short-term speculation.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="dark">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            Ready to Learn More?
          </h2>
          <p className="mt-6 font-sans text-base text-primary-foreground/80 leading-relaxed">
            Schedule a consultation to discuss how Indonesian real estate 
            might fit within your investment portfolio.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="mt-8 font-sans text-sm tracking-wide uppercase border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <Link to="/contact">Book a Consultation</Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
}
