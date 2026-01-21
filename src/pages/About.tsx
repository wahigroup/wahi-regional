import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import inspection1 from "@/assets/inspection-1.jpg";
import inspection2 from "@/assets/inspection-2.jpg";

export default function About() {
  const { t } = useLanguage();

  const whyReliable = [
    t('about.whyReliable.item1'),
    t('about.whyReliable.item2'),
    t('about.whyReliable.item3'),
    t('about.whyReliable.item4'),
    t('about.whyReliable.item5'),
  ];

  const localOfficeServices = [
    t('about.localOffice.item1'),
    t('about.localOffice.item2'),
    t('about.localOffice.item3'),
    t('about.localOffice.item4'),
    t('about.localOffice.item5'),
    t('about.localOffice.item6'),
  ];

  const investorProcess = [
    t('about.investorProcess.item1'),
    t('about.investorProcess.item2'),
    t('about.investorProcess.item3'),
    t('about.investorProcess.item4'),
    t('about.investorProcess.item5'),
    t('about.investorProcess.item6'),
    t('about.investorProcess.item7'),
  ];

  const longTermSuccess = [
    t('about.longTerm.item1'),
    t('about.longTerm.item2'),
    t('about.longTerm.item3'),
    t('about.longTerm.item4'),
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
            {t('about.hero.title')}
          </h1>
          <p className="mt-8 font-sans text-lg text-muted-foreground leading-relaxed">
            {t('about.hero.description')}
          </p>
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
            <h2 className="font-serif text-3xl lg:text-4xl font-light">{t('about.whoWeAre.title')}</h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('about.whoWeAre.description1')}
            </p>
            <p className="mt-4 font-sans text-base text-muted-foreground leading-relaxed">
              {t('about.whoWeAre.description2')}
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
            <h2 className="font-serif text-3xl lg:text-4xl font-light">{t('about.whatWeDo.title')}</h2>
            <div className="mt-6 space-y-4 font-sans text-base text-muted-foreground leading-relaxed">
              <p>{t('about.whatWeDo.description')}</p>
            </div>
            <ul className="mt-6 space-y-2">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">{t('about.whatWeDo.item1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">{t('about.whatWeDo.item2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">{t('about.whatWeDo.item3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">{t('about.whatWeDo.item4')}</span>
              </li>
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('about.whatWeDo.closing')}
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
              {t('about.whyReliable.title')}
            </h2>
            <ul className="mt-6 space-y-3">
              {whyReliable.map((item, index) => (
                <motion.li
                  key={index}
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
          </motion.div>
        </div>
      </Section>

      {/* The Role of the Local Office in [COUNTRY] */}
      <Section variant="accent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            {t('about.localOffice.title')}
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            {t('about.localOffice.intro')}
          </p>
          <p className="mt-4 font-sans text-base text-muted-foreground leading-relaxed">
            {t('about.localOffice.purpose')}
          </p>
          <p className="mt-4 font-sans text-base text-muted-foreground leading-relaxed">
            {t('about.localOffice.provides')}
          </p>
          <ul className="mt-4 space-y-3">
            {localOfficeServices.map((item, index) => (
              <motion.li
                key={index}
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
            {t('about.localOffice.closing')}
          </p>
        </motion.div>
      </Section>

      {/* How We Work with Investors */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            {t('about.investorProcess.title')}
          </h2>
          <ol className="mt-6 space-y-4">
            {investorProcess.map((step, index) => (
              <motion.li
                key={index}
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
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            {t('about.investorProcess.closing')}
          </p>
        </motion.div>
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
              {t('about.longTerm.title')}
            </h2>
            <ul className="mt-6 space-y-3">
              {longTermSuccess.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('about.longTerm.closing')}
            </p>
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
            {t('about.cta.title')}
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            {t('about.cta.description')}
          </p>
          <Button asChild size="lg" className="mt-8 font-sans text-sm tracking-wide uppercase">
            <Link to="/contact">{t('about.cta.button')}</Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
}
