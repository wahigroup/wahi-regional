import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HowItWorks() {
  const { t } = useLanguage();

  const processSteps = [
    { title: t('howItWorks.process.step1.title'), description: t('howItWorks.process.step1.description') },
    { title: t('howItWorks.process.step2.title'), description: t('howItWorks.process.step2.description') },
    { title: t('howItWorks.process.step3.title'), description: t('howItWorks.process.step3.description') },
    { title: t('howItWorks.process.step4.title'), description: t('howItWorks.process.step4.description') },
    { title: t('howItWorks.process.step5.title'), description: t('howItWorks.process.step5.description') },
    { title: t('howItWorks.process.step6.title'), description: t('howItWorks.process.step6.description') },
    { title: t('howItWorks.process.step7.title'), description: t('howItWorks.process.step7.description') },
    { title: t('howItWorks.process.step8.title'), description: t('howItWorks.process.step8.description') },
  ];

  const ownerOptions = [
    t('howItWorks.rental.option1'),
    t('howItWorks.rental.option2'),
    t('howItWorks.rental.option3'),
  ];

  const legalPartners = [
    t('howItWorks.legal.item1'),
    t('howItWorks.legal.item2'),
    t('howItWorks.legal.item3'),
  ];

  const documentationItems = [
    t('howItWorks.legal.doc1'),
    t('howItWorks.legal.doc2'),
    t('howItWorks.legal.doc3'),
    t('howItWorks.legal.doc4'),
  ];

  const faqs = [
    { question: t('howItWorks.faq.q1'), answer: t('howItWorks.faq.a1') },
    { question: t('howItWorks.faq.q2'), answer: t('howItWorks.faq.a2') },
    { question: t('howItWorks.faq.q3'), answer: t('howItWorks.faq.a3') },
    { question: t('howItWorks.faq.q4'), answer: t('howItWorks.faq.a4') },
    { question: t('howItWorks.faq.q5'), answer: t('howItWorks.faq.a5') },
  ];

  const risks = [
    t('howItWorks.risks.item1'),
    t('howItWorks.risks.item2'),
    t('howItWorks.risks.item3'),
    t('howItWorks.risks.item4'),
  ];

  const hakSewaItems = [
    t('howItWorks.hakSewa.item1'),
    t('howItWorks.hakSewa.item2'),
    t('howItWorks.hakSewa.item3'),
    t('howItWorks.hakSewa.item4'),
    t('howItWorks.hakSewa.item5'),
  ];

  const rentalItems = [
    t('howItWorks.rental.item1'),
    t('howItWorks.rental.item2'),
    t('howItWorks.rental.item3'),
    t('howItWorks.rental.item4'),
  ];

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
            {t('howItWorks.hero.title')}
          </h1>
          <p className="mt-8 font-sans text-lg text-muted-foreground leading-relaxed">
            {t('howItWorks.hero.description')}
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
              {t('howItWorks.hakSewa.title')}
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('howItWorks.hakSewa.description')}
            </p>
            <div className="mt-6 space-y-4">
              <h3 className="font-sans text-sm font-medium">{t('howItWorks.hakSewa.terms')}</h3>
              <ul className="space-y-2">
                {hakSewaItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                    <span className="font-sans text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
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
              {t('howItWorks.misconception.title')}
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('howItWorks.misconception.description')}
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">{t('howItWorks.misconception.item1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">{t('howItWorks.misconception.item2')}</span>
              </li>
            </ul>
            <div className="mt-6 p-6 border border-foreground">
              <h4 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-3">{t('howItWorks.misconception.example')}</h4>
              <ul className="space-y-1 font-sans text-sm text-muted-foreground">
                <li>{t('howItWorks.misconception.exampleLine1')}</li>
                <li>{t('howItWorks.misconception.exampleLine2')}</li>
                <li>{t('howItWorks.misconception.exampleLine3')}</li>
              </ul>
              <p className="mt-4 font-sans text-sm text-muted-foreground">
                {t('howItWorks.misconception.exampleNote')}
              </p>
            </div>
            <p className="mt-6 font-sans text-sm text-muted-foreground leading-relaxed">
              {t('howItWorks.misconception.closing')}
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
            {t('howItWorks.process.title')}
          </h2>
          <p className="mt-4 font-sans text-base text-muted-foreground">
            {t('howItWorks.process.subtitle')}
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
              {t('howItWorks.rental.title')}
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('howItWorks.rental.description')}
            </p>
            <ul className="mt-6 space-y-2">
              {rentalItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('howItWorks.rental.optionsIntro')}
            </p>
            <ul className="mt-4 space-y-2">
              {ownerOptions.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-sm text-muted-foreground leading-relaxed">
              {t('howItWorks.rental.closing')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              {t('howItWorks.legal.title')}
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('howItWorks.legal.intro')}
            </p>
            <ul className="mt-4 space-y-2">
              {legalPartners.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('howItWorks.legal.docsIntro')}
            </p>
            <ul className="mt-4 space-y-2">
              {documentationItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('howItWorks.legal.closing')}
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
            {t('howItWorks.faq.title')}
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
            {t('howItWorks.risks.title')}
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            {t('howItWorks.risks.description')}
          </p>
          <ul className="mt-4 space-y-2">
            {risks.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            {t('howItWorks.risks.closing')}
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
            {t('howItWorks.cta.title')}
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            {t('howItWorks.cta.description')}
          </p>
          <Button asChild size="lg" className="mt-8 font-sans text-sm tracking-wide uppercase">
            <Link to="/contact">{t('howItWorks.cta.button')}</Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
}
