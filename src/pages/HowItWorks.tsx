import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const processSteps = [
  {
    title: "Initial Consultation",
    description: "Discussion of your objectives, budget, and preferred project.",
  },
  {
    title: "Project Selection",
    description: "Review available units, pricing, and expected timelines.",
  },
  {
    title: "Reservation",
    description: "A small booking deposit secures the chosen unit.",
  },
  {
    title: "Legal Documentation",
    description: "Formal sales agreement and leasehold contract prepared by notaries and legal professionals.",
  },
  {
    title: "Payment Milestones",
    description: "Payments are linked to construction stages or agreed schedules.",
  },
  {
    title: "Construction & Updates",
    description: "Regular progress reports and site updates.",
  },
  {
    title: "Handover",
    description: "Unit completion, furnishing (if applicable), and final documentation.",
  },
  {
    title: "Rental Onboarding",
    description: "Property management setup and income generation begin.",
  },
];

const ownerOptions = [
  "Pure investment use",
  "Partial personal use with rental income",
  "Long-term leasing strategies",
];

const legalPartners = [
  "Licensed Indonesian notaries",
  "Reputable legal advisors",
  "Established property management partners",
];

const documentationItems = [
  "Ownership rights",
  "Lease terms",
  "Payment schedules",
  "Ongoing obligations",
];

const faqs = [
  {
    question: "Can foreigners legally own property in Indonesia?",
    answer: "Yes. While foreigners cannot hold freehold land, leasehold (Hak Sewa) and other legal structures allow safe, long-term ownership and control of property.",
  },
  {
    question: "Can I resell my property?",
    answer: "Yes. Leasehold properties can be sold to another buyer, transferred, or assigned according to Indonesian law and project terms.",
  },
  {
    question: "Can I use the unit myself?",
    answer: "Yes. Owners may stay in their property subject to project rules and any agreed rental calendar.",
  },
  {
    question: "How is rental income paid?",
    answer: "Income is typically distributed monthly or quarterly with transparent operational reports provided by the management company.",
  },
  {
    question: "What happens if regulations change?",
    answer: "Indonesia has a long and stable history of supporting foreign investment in tourism property. Wahi structures all projects conservatively to minimize regulatory risk.",
  },
];

const risks = [
  "Currency fluctuations",
  "Tourism market cycles",
  "Operational performance",
  "Changes in local regulations",
];

export default function HowItWorks() {
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
            Buying Property in Bali – Clear, Legal, and Structured
          </h1>
          <p className="mt-8 font-sans text-lg text-muted-foreground leading-relaxed">
            Investing in Indonesian real estate is straightforward when it is approached 
            with the right structure and professional guidance. This page explains – in 
            practical terms – how foreign investors purchase, own, and earn income from 
            property developed by Wahi. Our goal is to remove uncertainty and provide a 
            transparent, step-by-step framework from first enquiry to completed ownership.
          </p>
        </motion.div>
      </Section>

      {/* Hak Sewa */}
      <Section variant="accent">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              The Most Common Model: Hak Sewa (Leasehold)
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Wahi projects for international buyers are primarily structured using 
              Hak Sewa – long-term leasehold ownership. This is the standard and most 
              practical way for foreigners to own property in Indonesia.
            </p>
            <div className="mt-6 space-y-4">
              <h3 className="font-sans text-sm font-medium">Typical terms:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">Initial lease period: around 25–30 years</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">Contractually guaranteed right to extend</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">Full legal control of the unit during the lease</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">Right to rent, resell, or transfer the property</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">Leasehold is widely used across Bali and Indonesia for villas, apartments, and resort residences and is recognized as a secure and bankable structure</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              A Common Misconception About Extensions
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Many first-time buyers worry that extending a lease means "buying the whole 
              property again." This is not the case. When a lease is extended, the owner 
              normally pays only for:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">The value of the land portion</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">Not for the building itself</span>
              </li>
            </ul>
            <div className="mt-6 p-6 border border-foreground">
              <h4 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-3">Example</h4>
              <ul className="space-y-1 font-sans text-sm text-muted-foreground">
                <li>Purchase price of a unit: USD 300,000</li>
                <li>Building value: majority of the price</li>
                <li>Land value: a smaller component</li>
              </ul>
              <p className="mt-4 font-sans text-sm text-muted-foreground">
                At the time of extension, the cost is typically only 10–20% of the original 
                purchase price, depending on the project and land values at that time.
              </p>
            </div>
            <p className="mt-6 font-sans text-sm text-muted-foreground leading-relaxed">
              This makes long-term ownership both predictable and economically reasonable.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Step-by-Step Process */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            From First Contact to Ownership
          </h2>
          <p className="mt-4 font-sans text-base text-muted-foreground">
            Step-by-Step Process
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="border border-foreground p-6"
            >
              <span className="inline-block w-8 h-8 border border-foreground flex items-center justify-center font-sans text-sm mb-4">
                {index + 1}
              </span>
              <h3 className="font-serif text-lg">{step.title}</h3>
              <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Rental Income & Management */}
      <Section variant="accent">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              Rental Income & Management
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Most Wahi buyers are overseas investors who want a completely hands-off 
              experience. Each project is designed with professional operations in mind:
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">On-site management teams</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">Marketing and bookings</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">Maintenance and reporting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">Transparent financial statements</span>
              </li>
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Owners can typically choose between:
            </p>
            <ul className="mt-4 space-y-2">
              {ownerOptions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-sm text-muted-foreground leading-relaxed">
              All details are explained clearly before purchase so expectations remain 
              realistic and aligned.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              Legal and Financial Transparency
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Wahi works only with:
            </p>
            <ul className="mt-4 space-y-2">
              {legalPartners.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Every step is documented, and investors receive clear explanations of:
            </p>
            <ul className="mt-4 space-y-2">
              {documentationItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Our role is to ensure you understand exactly what you are buying and 
              how it functions in practice.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* FAQs */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-foreground px-6"
              >
                <AccordionTrigger className="font-serif text-lg text-left hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-base text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </Section>

      {/* Risks */}
      <Section variant="accent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            Risks to Understand
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            Like any international investment, buying property in Indonesia involves 
            considerations such as:
          </p>
          <ul className="mt-4 space-y-2">
            {risks.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            Wahi does not promise or guarantee returns. We focus on conservative planning, 
            realistic assumptions, and professional execution to create resilient long-term assets.
          </p>
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
            Ready to Take the Next Step?
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            If you would like to discuss how Wahi projects can fit your investment goals, 
            the local Wahi representative is available to guide you through the process in detail.
          </p>
          <Button asChild size="lg" className="mt-8 font-sans text-sm tracking-wide uppercase">
            <Link to="/contact">Book a Consultation</Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
}
