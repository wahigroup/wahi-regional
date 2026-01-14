import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";

const structures = [
  {
    name: "Leasehold",
    duration: "Up to 80 years",
    description: "The most common structure for foreign investors, providing long-term rights to use and develop land.",
    suitable: "Ideal for villa investments with clear exit strategy",
  },
  {
    name: "Hak Pakai",
    duration: "Right of Use",
    description: "A right-of-use title available to foreign individuals, allowing direct property ownership for personal use.",
    suitable: "Suitable for permanent residents and long-term stays",
  },
  {
    name: "PT PMA",
    duration: "Corporate Structure",
    description: "A foreign-owned Indonesian company that can hold freehold land, suitable for larger investments.",
    suitable: "Best for commercial ventures and multiple properties",
  },
];

const process = [
  "Initial consultation and structure selection",
  "Due diligence and legal review",
  "Reservation agreement and deposit",
  "Full documentation preparation",
  "Notarisation and registration",
  "Title transfer and completion",
];

export default function Legal() {
  return (
    <Layout>
      {/* Hero */}
      <Section className="pt-24 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
            How Foreign Ownership Works in Practice
          </h1>
          <p className="mt-8 font-sans text-lg text-muted-foreground leading-relaxed">
            Foreigners cannot own freehold land in Indonesia, but several 
            well-established legal structures allow foreign investors to 
            acquire and operate property safely and legally.
          </p>
        </motion.div>
      </Section>

      {/* Structures */}
      <Section variant="accent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            Ownership Structures
          </h2>
          <p className="mt-4 font-sans text-base text-muted-foreground max-w-2xl">
            Each structure has specific advantages, limitations, and use cases. 
            These are explained clearly during consultation to ensure buyers 
            select the structure appropriate to their objectives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {structures.map((structure, index) => (
            <motion.div
              key={structure.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-8 border border-foreground"
            >
              <div className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                {structure.duration}
              </div>
              <h3 className="mt-2 font-serif text-2xl">{structure.name}</h3>
              <p className="mt-4 font-sans text-sm text-muted-foreground leading-relaxed">
                {structure.description}
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="font-sans text-xs text-muted-foreground italic">
                  {structure.suitable}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Legal Process */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              Legal Process
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Wahi works with established Indonesian legal professionals to 
              ensure all transactions are structured correctly and comply with 
              current regulations. The process is transparent and well-documented 
              at every stage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <ol className="space-y-4">
              {process.map((step, index) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="flex-shrink-0 w-8 h-8 border border-foreground flex items-center justify-center font-sans text-sm">
                    {index + 1}
                  </span>
                  <span className="font-sans text-base pt-1">{step}</span>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </Section>

      {/* Important Notes */}
      <Section variant="dark">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            Important Considerations
          </h2>
          <div className="mt-8 space-y-4 font-sans text-base text-primary-foreground/80 leading-relaxed">
            <p>
              Investing overseas involves both local (Indonesian) and home-country 
              considerations. While Wahi does not provide tax or legal advice, 
              we help investors understand the typical framework and coordinate 
              with qualified professionals when needed.
            </p>
            <p>
              Topics typically covered include overseas asset reporting, rental 
              income taxation, capital gains considerations, and double taxation 
              treaties where applicable.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            Have Questions About Ownership?
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            Schedule a consultation to discuss the legal structures in detail 
            and understand which option suits your investment objectives.
          </p>
          <Button asChild size="lg" className="mt-8 font-sans text-sm tracking-wide uppercase">
            <Link to="/contact">Book a Consultation</Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
}
