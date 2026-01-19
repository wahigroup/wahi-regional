import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import elementsResidence from "@/assets/elements-residence.jpg";
import sabawa from "@/assets/sabawa.jpg";
import omaSora from "@/assets/oma-sora.jpg";
import bocoaJimbaran from "@/assets/bocoa-jimbaran.png";
import saltStone from "@/assets/salt-stone.png";

const projects = [
  {
    id: 1,
    title: "Elements Residence",
    location: "Canggu, Bali",
    type: "Modern Apartments",
    description: "Ocean-view modern apartments inspired by the four natural elements of Bali. A harmonious blend of contemporary design and natural beauty.",
    image: elementsResidence,
    status: "Available",
  },
  {
    id: 2,
    title: "Sabawa",
    location: "Nusa Penida",
    type: "Bamboo Residences",
    description: "Nature-carved bamboo residences offering serene jungle and ocean vistas in Nusa Penida. Sustainable luxury in an untouched paradise.",
    image: sabawa,
    status: "Available",
  },
  {
    id: 3,
    title: "Oma Sora",
    location: "Umalas, Bali",
    type: "Earth-formed Architecture",
    description: "Earth-formed architecture with flowing curves inspired by Wabi-Sabi serenity. A unique expression of organic living.",
    image: omaSora,
    status: "Available",
  },
  {
    id: 4,
    title: "Bocoa Jimbaran",
    location: "Jimbaran, Bali",
    type: "Adobe-style Villas",
    description: "Adobe-style villa retreat where rustic elegance meets tropical serenity with private pool sanctuary. Mediterranean warmth in Bali.",
    image: bocoaJimbaran,
    status: "Available",
  },
  {
    id: 5,
    title: "Salt & Stone",
    location: "Balangan, Bali",
    type: "Mediterranean Villas",
    description: "Mediterranean serenity meets Balinese warmth with refined craftsmanship and coastal views. Timeless elegance by the sea.",
    image: saltStone,
    status: "Available",
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
                <span className="inline-block font-sans text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  {project.type}
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

                <div className="mt-6">
                  <span className="inline-block font-sans text-xs tracking-widest uppercase px-3 py-1 border border-foreground/20">
                    {project.status}
                  </span>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="mt-8 font-sans text-sm tracking-wide uppercase"
                >
                  <Link to="/contact">
                    Enquire Now <ArrowRight className="ml-2 h-4 w-4" />
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
