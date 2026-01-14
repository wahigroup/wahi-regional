import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/Section";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const values = [
  {
    title: "Transparency",
    description: "Full disclosure on ownership structures, risks, and operational realities.",
  },
  {
    title: "Long-Term Focus",
    description: "Building assets that perform over time rather than chasing short-term cycles.",
  },
  {
    title: "Conservative Planning",
    description: "Sound financial structuring without excessive leverage or speculation.",
  },
  {
    title: "Quality Design",
    description: "Strong architectural identity with practical, operable layouts.",
  },
];

export default function About() {
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
            A Long-Term Developer,
            <br />
            Not a Sales Platform
          </h1>
          <p className="mt-8 font-sans text-lg text-muted-foreground leading-relaxed">
            Wahi develops thoughtfully designed projects in Indonesia, combining 
            strong architectural identity, practical layouts, and conservative 
            financial planning.
          </p>
        </motion.div>
      </Section>

      {/* Content Grid */}
      <Section className="pt-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/3] overflow-hidden"
          >
            <img
              src={project3}
              alt="Wahi project"
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-[4/3] overflow-hidden"
          >
            <img
              src={project2}
              alt="Wahi interior"
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
        </div>
      </Section>

      {/* Philosophy */}
      <Section variant="accent">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              Our Philosophy
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Our focus is on building assets that perform over time rather than 
              chasing short-term market cycles. We operate with full transparency 
              regarding ownership structures, risks, and operational realities.
            </p>
            <p className="mt-4 font-sans text-base text-muted-foreground leading-relaxed">
              We work closely with legal and tax professionals to ensure each 
              project is structured responsibly, protecting investor interests 
              while maximizing long-term value.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-8">
              Our Values
            </h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="border-l border-foreground pl-6"
                >
                  <h4 className="font-serif text-xl">{value.title}</h4>
                  <p className="mt-2 font-sans text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Team Note */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            Working With Wahi
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            Every investor works directly with a dedicated Wahi representative 
            who guides them through the entire process — from initial consultation 
            to ownership and ongoing management. Our approach is personal, 
            unhurried, and focused on long-term relationships.
          </p>
        </motion.div>
      </Section>
    </Layout>
  );
}
