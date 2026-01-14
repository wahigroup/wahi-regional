import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-villa.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const stats = [
  { value: "12–18%", label: "Gross Yield Range" },
  { value: "70–85%", label: "Occupancy Potential" },
  { value: "5–7 Years", label: "Investment Horizon" },
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
            src={heroImage}
            alt="Luxury villa in Bali"
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
              Security Through Demand.
              <br />
              Returns Through Structure.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 lg:mt-8 font-sans text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              A calm, transparent approach for investors seeking stable demand 
              and materially higher rental income than in mature home markets.
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

      {/* Introduction */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight">
              Where Structural Yield Meets Long-Term Security
            </h2>
            <div className="mt-6 space-y-4 font-sans text-base text-muted-foreground leading-relaxed">
              <p>
                Wahi is a real estate developer focused on high-quality residential 
                and hospitality projects in Indonesia's most resilient lifestyle destinations.
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
              src={project2}
              alt="Modern villa interior"
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section variant="accent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            Investment Context
          </h2>
          <p className="mt-4 font-sans text-sm text-muted-foreground">
            Illustrative figures based on market fundamentals — not forecasts or guarantees
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-box bg-background"
            >
              <div className="font-serif text-3xl lg:text-4xl font-light">
                {stat.value}
              </div>
              <div className="mt-2 font-sans text-xs tracking-widest uppercase text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Featured Projects */}
      <Section>
        <SectionHeader
          title="Featured Projects"
          subtitle="Carefully selected destinations with strong tourism demand, limited high-quality supply, and long-term appeal."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { image: project1, title: "Ubud Terraces", location: "Ubud, Bali" },
            { image: project2, title: "Canggu Villas", location: "Canggu, Bali" },
            { image: project3, title: "Seminyak Residences", location: "Seminyak, Bali" },
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
                <h3 className="font-serif text-xl">{project.title}</h3>
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

      {/* Why Invest */}
      <Section variant="dark">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-light">
              A Yield Environment Shaped by Real Demand
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
              Indonesia combines several fundamentals rarely found together in mature 
              property markets: one of the world's strongest tourism economies, 
              year-round demand, limited high-quality supply, and entry pricing 
              materially below Western markets.
            </p>
            <p>
              This results in a clear structural yield differential. Where residential 
              property elsewhere often delivers 3–5% gross yields, Indonesia — and 
              Bali in particular — operates in a market where double-digit rental 
              yields are achievable under conservative assumptions.
            </p>
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
