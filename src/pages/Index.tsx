import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import elementsResidence from "@/assets/elements-residence.jpg";
import sabawa from "@/assets/sabawa.jpg";
import omaSora from "@/assets/oma-sora.jpg";
import bocoaJimbaran from "@/assets/bocoa-jimbaran.png";

const pillars = [
  {
    title: "High-Demand Destination",
    description: "Bali is one of the world's most visited lifestyle destinations, generating consistent year-round occupancy and resilient rental performance.",
  },
  {
    title: "Professionally Structured",
    description: "Clear ownership structures, transparent processes, and full lifecycle support—from purchase to operation.",
  },
  {
    title: "Designed for Performance",
    description: "Thoughtfully designed properties optimized for guest experience, strong reviews, and sustainable income.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={sabawa}
            alt="Sabawa - Bamboo residences in Nusa Penida"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>

        <div className="relative section-container py-24 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="max-w-2xl"
          >
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight tracking-tight"
            >
              Wahi – Your Gateway to Bali's Property Market
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 lg:mt-8 font-sans text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              Design-driven developments in a globally attractive destination 
              where strong demand supports attractive long-term returns.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="font-sans text-sm tracking-wide uppercase">
                <Link to="/contact">Book a Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-sans text-sm tracking-wide uppercase">
                <Link to="/projects">
                  Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Invest Beyond Low-Yield Markets */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight">
              Invest Beyond Low-Yield Markets
            </h2>
            <div className="mt-6 space-y-4 font-sans text-base text-muted-foreground leading-relaxed">
              <p>
                Wahi is a design-driven real estate developer creating high-quality 
                property investments in Bali. We focus on markets where global tourism 
                demand, limited supply, and professional management combine to support 
                stable, long-term returns for international investors.
              </p>
              <p>
                Indonesia's tourism economy provides structurally stable, year-round demand, 
                supporting rental performance that differs fundamentally from residential 
                markets in Europe, the US, and Australia.
              </p>
              <p>
                While residential rental yields in developed markets often sit around 3–5%, 
                professionally designed and managed Bali assets can operate in a significantly 
                higher yield environment when built and run correctly.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/3] lg:aspect-square"
          >
            <img
              src={elementsResidence}
              alt="Elements Residence - Modern apartments in Canggu"
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
        </div>
      </Section>

      {/* Three Pillars */}
      <Section variant="accent">
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-foreground p-8 bg-background"
            >
              <h3 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-4">
                {pillar.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center font-serif text-xl lg:text-2xl font-light max-w-3xl mx-auto"
        >
          "A straightforward way to access Bali property through an experienced, hands-on developer."
        </motion.p>
      </Section>

      {/* Featured Projects */}
      <Section>
        <SectionHeader
          title="Our Projects"
          subtitle="Each Wahi project is developed with the same principles: strong locations, thoughtful design, and practical layouts optimized for guest experience and long-term performance. Explore our current developments below."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { image: elementsResidence, title: "Elements Residence", location: "Canggu, Bali", type: "Modern Apartments" },
            { image: bocoaJimbaran, title: "Bocoa Jimbaran", location: "Jimbaran, Bali", type: "Adobe-style Villas" },
            { image: omaSora, title: "Oma Sora", location: "Umalas, Bali", type: "Earth-formed Architecture" },
          ].map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground">{project.type}</p>
                <h3 className="font-serif text-xl mt-1">{project.title}</h3>
                <p className="font-sans text-sm text-muted-foreground">{project.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="font-sans text-sm tracking-wide uppercase">
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </Section>

      {/* Why Bali */}
      <Section variant="dark">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-light">
              Why Bali? Strong Demand, Higher Returns
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6 font-sans text-base text-primary-foreground/80 leading-relaxed"
          >
            <p>
              Bali is one of the world's most established and resilient tourism 
              destinations. With consistent international arrivals, limited high-quality 
              supply, and year-round occupancy, the island supports rental yields that 
              are significantly higher than those typically available in mature markets.
            </p>
            <div className="space-y-4 pt-4">
              <div className="border-l-2 border-primary-foreground/30 pl-4">
                <p className="font-medium text-primary-foreground">Year-Round Global Demand</p>
                <p className="text-sm text-primary-foreground/70">Bali welcomes visitors from around the world throughout the year, creating stable occupancy across seasons and market cycles.</p>
              </div>
              <div className="border-l-2 border-primary-foreground/30 pl-4">
                <p className="font-medium text-primary-foreground">Limited Quality Supply</p>
                <p className="text-sm text-primary-foreground/70">Well-designed, professionally managed accommodation remains limited, allowing premium properties to perform strongly.</p>
              </div>
              <div className="border-l-2 border-primary-foreground/30 pl-4">
                <p className="font-medium text-primary-foreground">Structurally Higher Yields</p>
                <p className="text-sm text-primary-foreground/70">These fundamentals enable income potential that is rarely achievable in markets where residential yields are often only 3–5%.</p>
              </div>
            </div>
            <Link
              to="/why-invest"
              className="inline-flex items-center text-primary-foreground hover:opacity-70 transition-opacity"
            >
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
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
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-light">
            Speak With a Wahi Representative
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            If you are considering an investment in Indonesia and would like a 
            structured, transparent discussion, book a consultation with the 
            local Wahi representative.
          </p>
          <Button asChild size="lg" className="mt-8 font-sans text-sm tracking-wide uppercase">
            <Link to="/contact">Book a Consultation</Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
}
