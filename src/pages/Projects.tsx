import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    id: 1,
    title: "Ubud Terraces",
    location: "Ubud, Bali",
    description: "A collection of contemporary villas nestled among rice terraces, offering privacy and connection to Bali's cultural heart.",
    image: project1,
    units: "12 Villas",
    size: "180–320 m²",
    status: "Under Construction",
  },
  {
    id: 2,
    title: "Canggu Villas",
    location: "Canggu, Bali",
    description: "Modern tropical residences designed for the discerning investor, with seamless indoor-outdoor living and premium finishes.",
    image: project2,
    units: "8 Villas",
    size: "220–400 m²",
    status: "Available",
  },
  {
    id: 3,
    title: "Seminyak Residences",
    location: "Seminyak, Bali",
    description: "Boutique apartments in Bali's most established lifestyle destination, combining location with architectural excellence.",
    image: project3,
    units: "24 Units",
    size: "85–180 m²",
    status: "Coming Soon",
  },
];

export default function Projects() {
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
            Real Projects. Real Demand. Real Returns.
          </h1>
          <p className="mt-8 font-sans text-lg text-muted-foreground leading-relaxed">
            Wahi develops high-quality properties in locations with strong tourism 
            fundamentals and year-round occupancy potential. Each project is designed, 
            built, and structured to perform as a long-term investment.
          </p>
        </motion.div>
      </Section>

      {/* Projects List */}
      <Section className="pt-0">
        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <span className="inline-block font-sans text-xs tracking-widest uppercase text-muted-foreground mb-4">
                  {project.status}
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl font-light">
                  {project.title}
                </h2>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  {project.location}
                </p>
                <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-8 flex gap-8">
                  <div>
                    <div className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                      Units
                    </div>
                    <div className="mt-1 font-serif text-lg">{project.units}</div>
                  </div>
                  <div>
                    <div className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                      Size Range
                    </div>
                    <div className="mt-1 font-serif text-lg">{project.size}</div>
                  </div>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="mt-8 font-sans text-sm tracking-wide uppercase"
                >
                  <Link to="/contact">
                    View Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="accent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            Not Sure Which Project Fits You Best?
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            Speak with a Wahi advisor to compare options and opportunities.
          </p>
          <Button asChild size="lg" className="mt-8 font-sans text-sm tracking-wide uppercase">
            <Link to="/contact">Schedule a Consultation</Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
}
