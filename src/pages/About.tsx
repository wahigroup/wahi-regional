import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import inspection1 from "@/assets/inspection-1.jpg";
import inspection2 from "@/assets/inspection-2.jpg";

const whyReliable = [
  "Developer-level expertise rather than third-party brokerage",
  "Clear and legal ownership structures tailored for foreign buyers",
  "Transparent documentation and processes",
  "Real projects with real track records",
  "Hands-on involvement from concept to operations",
];

const designPrinciples = [
  "Strong architectural identity",
  "Careful location selection",
  "Practical layouts",
  "Professional management",
  "Transparent ownership structures",
];

const localOfficeServices = [
  "Personal consultations in your language and time zone",
  "Clear explanations of Indonesian property structures",
  "Guidance on legal and financial considerations",
  "Coordination with local real estate agents",
  "Assistance throughout the buying process",
  "Ongoing support after purchase",
];

const investorProcess = [
  "Understand your objectives",
  "Present suitable projects",
  "Explain ownership and legal frameworks",
  "Register and secure the unit",
  "Guide you through contracts and payments",
  "Provide construction updates",
  "Assist with handover and rental onboarding",
];

const longTermSuccess = [
  "Satisfied owners",
  "Well-performing properties",
  "Repeat investors",
  "A strong, reputable brand in Indonesia",
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
            About Wahi
          </h1>
        </motion.div>
      </Section>

      {/* Who We Are */}
      <Section className="pt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">Who We Are</h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Wahi is a design-driven real estate developer operating in Indonesia. 
              We create thoughtfully planned residential and hospitality projects in 
              high-demand locations, focused on long-term performance rather than 
              short-term trends.
            </p>
            <p className="mt-4 font-sans text-base text-muted-foreground leading-relaxed">
              Our approach combines:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">Strong architectural identity</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">Careful location selection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">Practical layouts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">Professional management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">Transparent ownership structures</span>
              </li>
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Wahi develops properties that are enjoyable to own, attractive to guests, 
              and structured to deliver sustainable results for international investors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-[4/3] overflow-hidden"
          >
            <img
              src={inspection1}
              alt="Wahi team on site inspection"
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
        </div>
      </Section>

      {/* What We Do */}
      <Section variant="accent">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">What We Do</h2>
            <div className="mt-6 space-y-4 font-sans text-base text-muted-foreground leading-relaxed">
              <p>
                We build investment-grade property in Indonesia for global buyers. 
                Unlike agencies or listing platforms, Wahi is the developer. We originate 
                projects, manage design and construction, structure the legal framework, 
                and remain involved through completion and operations.
              </p>
              <p>Our projects are created with three clear objectives:</p>
            </div>
            <div className="mt-6 space-y-3">
              <div className="border-l border-foreground pl-4">
                <span className="font-sans text-sm font-medium">1. Real Demand</span>
                <p className="font-sans text-sm text-muted-foreground">Locations with proven tourism appeal</p>
              </div>
              <div className="border-l border-foreground pl-4">
                <span className="font-sans text-sm font-medium">2. Strong Product</span>
                <p className="font-sans text-sm text-muted-foreground">Distinctive design and high-quality execution</p>
              </div>
              <div className="border-l border-foreground pl-4">
                <span className="font-sans text-sm font-medium">3. Practical Performance</span>
                <p className="font-sans text-sm text-muted-foreground">Layouts and concepts optimized for rental success</p>
              </div>
            </div>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              This end-to-end involvement allows us to maintain quality, consistency, 
              and accountability throughout the entire life cycle of each development.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-[4/3] overflow-hidden"
          >
            <img
              src={inspection2}
              alt="Wahi project development oversight"
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
        </div>
      </Section>

      {/* Why Wahi is a Reliable Partner */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              Why Wahi is a Reliable Partner
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Investing internationally requires more than attractive photos. It requires 
              structure, clarity, and trust. Wahi offers:
            </p>
            <ul className="mt-6 space-y-3">
              {whyReliable.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Our focus is on building long-term relationships with a limited number 
              of informed investors, not on mass-market sales.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              Design as a Core Principle
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed font-medium">
              Design shapes performance.
            </p>
            <p className="mt-4 font-sans text-base text-muted-foreground leading-relaxed">
              Every Wahi project is created around the belief that better-designed properties generate better experiences—and better experiences create stronger demand.
            </p>
            <p className="mt-4 font-sans text-base text-muted-foreground leading-relaxed">
              We emphasize:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">Timeless, context-sensitive architecture</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">Materials and concepts suited to Bali's environment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">Layouts designed for guest comfort</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">Operational practicality for owners and managers</span>
              </li>
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              This design-driven approach is a key reason our properties remain competitive in the rental market over time.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Design Excellence */}
      <Section variant="accent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            Every Wahi project is created around the belief that better-designed 
            properties generate better experiences—and better experiences create 
            stronger demand. We emphasize:
          </p>
          <ul className="mt-6 space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
              <span className="font-sans text-sm text-muted-foreground">Timeless, context-sensitive architecture</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
              <span className="font-sans text-sm text-muted-foreground">Materials and concepts suited to Bali's environment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
              <span className="font-sans text-sm text-muted-foreground">Layouts designed for guest comfort</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
              <span className="font-sans text-sm text-muted-foreground">Operational practicality for owners and managers</span>
            </li>
          </ul>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            This design-driven approach is a key reason our properties remain 
            competitive in the rental market over time.
          </p>
        </motion.div>
      </Section>

      {/* Local Office */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              The Role of the Local Office
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Wahi's local office is your point of contact for Indonesian property investment. 
              The purpose of the regional office is to make cross-border investing simple, 
              clear, and comfortable for investors. The local representative provides:
            </p>
            <ul className="mt-6 space-y-3">
              {localOfficeServices.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Rather than dealing with an overseas developer directly, you have a 
              knowledgeable local advisor who understands both the Indonesian market 
              and your expectations as an investor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              How We Work with Investors
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Our process is intentionally structured and transparent:
            </p>
            <ol className="mt-6 space-y-4">
              {investorProcess.map((step, index) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="flex items-start gap-4"
                >
                  <span className="flex-shrink-0 w-6 h-6 border border-foreground flex items-center justify-center font-sans text-xs">
                    {index + 1}
                  </span>
                  <span className="font-sans text-sm text-muted-foreground pt-0.5">{step}</span>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </Section>

      {/* Long-Term Approach */}
      <Section variant="accent">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              A Long-Term Approach
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Wahi is not focused on quick transactions. We are focused on building assets, 
              communities, and lasting investor relationships. Our success is measured not 
              only by completed projects, but by:
            </p>
            <ul className="mt-6 space-y-3">
              {longTermSuccess.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center"
          >
            <p className="font-serif text-xl lg:text-2xl font-light leading-relaxed">
              For investors, Wahi provides a professional bridge to one of the world's 
              most attractive property markets. If you are looking for a structured, 
              transparent, and design-focused approach to investing in Indonesia, we 
              invite you to speak with the local Wahi representative.
            </p>
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
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            Speak with Wahi
          </h2>
          <Button asChild size="lg" className="mt-8 font-sans text-sm tracking-wide uppercase">
            <Link to="/contact">Book a Consultation</Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
}
