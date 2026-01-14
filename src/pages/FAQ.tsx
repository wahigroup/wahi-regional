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

const faqs = [
  {
    question: "Is it legal for foreigners to buy property in Indonesia?",
    answer: "Yes, through established legal structures. While foreigners cannot own freehold land directly, they can acquire property rights through leasehold agreements (up to 80 years), Hak Pakai (right of use) title for personal use, or PT PMA (foreign-owned company) for commercial investments. These structures are well-established and legally recognised.",
  },
  {
    question: "Can I resell the property?",
    answer: "Yes. Leasehold rights and other ownership structures can be transferred to other parties. The resale process involves transfer of the underlying agreements and notarisation. Many investors view Bali property as both an income-generating asset and a medium-term hold with appreciation potential.",
  },
  {
    question: "Can I use the unit myself?",
    answer: "Absolutely. Most Wahi projects offer flexible owner usage policies. You can typically block out periods for personal use while the property is otherwise managed as a rental. The specific allocation varies by project and can be discussed during consultation.",
  },
  {
    question: "How does rental income work?",
    answer: "Wahi projects are designed for professional management. Rental income is generated through short-term holiday rentals (typically via platforms like Airbnb, Booking.com, or direct bookings). Management handles guest services, maintenance, and reporting. Owners receive regular income statements and net proceeds after operating costs.",
  },
  {
    question: "What happens if Indonesian property laws change?",
    answer: "Regulatory change is a consideration in any cross-border investment. Indonesia has generally moved toward more open policies for foreign investment. Established structures like leasehold have decades of precedent. During consultation, we discuss risk mitigation and the current regulatory environment in detail.",
  },
  {
    question: "What are the ongoing costs?",
    answer: "Ongoing costs typically include property management fees (usually 15-25% of rental income), maintenance reserves, utilities, insurance, and local property taxes. All costs are disclosed clearly during the project presentation, and we provide conservative projections that account for realistic operating expenses.",
  },
  {
    question: "How do I pay for the property?",
    answer: "Payment is typically structured in milestones tied to construction progress (for new developments) or as a straightforward transaction for completed properties. International bank transfers are standard. We work with you to ensure compliant, documented payments that satisfy requirements in both Indonesia and your home country.",
  },
  {
    question: "What if I want to visit before buying?",
    answer: "We encourage site visits. Many investors prefer to see projects in person before committing. We can arrange property tours, area familiarisation, and meetings with the local team. This allows you to experience Bali firsthand and make a more informed decision.",
  },
];

export default function FAQ() {
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
            Frequently Asked Questions
          </h1>
          <p className="mt-8 font-sans text-lg text-muted-foreground leading-relaxed">
            Clear answers to common questions about investing in Indonesian 
            real estate through Wahi.
          </p>
        </motion.div>
      </Section>

      {/* FAQ Accordion */}
      <Section className="pt-0">
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
            Still Have Questions?
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            Book a consultation to discuss your specific situation and 
            get detailed answers tailored to your investment objectives.
          </p>
          <Button asChild size="lg" className="mt-8 font-sans text-sm tracking-wide uppercase">
            <Link to="/contact">Book a Consultation</Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
}
