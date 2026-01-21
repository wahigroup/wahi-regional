import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-villa.jpg";

export default function WhyInvest() {
  const { t } = useLanguage();

  const tourismFeatures = [
    "Year-round warm climate",
    "Multiple overlapping travel seasons",
    "Diverse visitor demographics",
    "Established global reputation",
    "Constantly improving infrastructure",
  ];

  const supplyCharacteristics = [
    "Limited land in prime areas",
    "Slow and complex development processes",
    "Shortage of high-quality, professionally operated properties",
  ];

  const demandBenefits = [
    t('whyInvest.demand.benefit1'),
    t('whyInvest.demand.benefit2'),
    t('whyInvest.demand.benefit3'),
  ];

  const yieldReasons = [
    "Short-term rental model",
    "Strong nightly rates",
    "High occupancy",
    "Lower entry prices relative to Western markets",
  ];

  const investorBenefits = [
    "Enter the market with lower capital",
    "Diversify across multiple units",
    "Achieve stronger cash-on-cash returns",
    "Participate in a growing region without large leverage",
  ];

  const economicFactors = [
    t('whyInvest.growth.item1'),
    t('whyInvest.growth.item2'),
    t('whyInvest.growth.item3'),
    t('whyInvest.growth.item4'),
  ];

  const diversificationBenefits = [
    t('whyInvest.diversification.item1'),
    t('whyInvest.diversification.item2'),
    t('whyInvest.diversification.item3'),
    t('whyInvest.diversification.item4'),
  ];

  const hakSewaFeatures = [
    "Long-term security",
    "Contractual extension options",
    "Straightforward transferability",
    "Predictable operating models",
  ];

  const baliAdvantages = [
    "Unmatched international brand recognition",
    "Repeat-visitor culture",
    "Mature hospitality ecosystem",
    "Global flight connections",
    "Proven resilience through multiple market cycles",
  ];

  const finalBenefits = [
    t('whyInvest.alternative.item1'),
    t('whyInvest.alternative.item2'),
    t('whyInvest.alternative.item3'),
    t('whyInvest.alternative.item4'),
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Bali landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        <div className="relative section-container pb-16 lg:pb-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight max-w-3xl"
          >
            {t('whyInvest.hero.title')}
          </motion.h1>
        </div>
      </section>

      {/* Introduction */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="font-sans text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {t('whyInvest.hero.description')}
          </p>
        </motion.div>
      </Section>

      {/* Tourism That Never Stops */}
      <Section variant="accent">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              Tourism That Never Stops
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Indonesia is one of the world's most visited travel destinations. Bali alone 
              attracts millions of international visitors every year from Australia, Europe, 
              North America, and across Asia. Unlike seasonal resort markets, Bali benefits from:
            </p>
            <ul className="mt-6 space-y-3">
              {tourismFeatures.map((item, index) => (
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
              This creates consistent occupancy levels that many Western holiday markets cannot match.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              {t('whyInvest.demand.title')}
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('whyInvest.demand.description')}
            </p>
            <ul className="mt-6 space-y-3">
              {supplyCharacteristics.map((item, index) => (
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
              {t('whyInvest.demand.closing')}
            </p>
            <ul className="mt-4 space-y-2">
              {demandBenefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Clear Yield Advantage */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              A Clear Yield Advantage
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              In most mature property markets such as Europe, Australia, and North America 
              residential rental yields typically range around 3–5% per year. In Indonesia's 
              prime tourism destinations, well-located and professionally managed properties 
              commonly generate significantly higher income potential. The reasons are structural:
            </p>
            <ul className="mt-6 space-y-3">
              {yieldReasons.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              For investors accustomed to low returns at home, Indonesia provides an opportunity 
              to rebalance portfolios toward income-generating assets.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              {t('whyInvest.prices.title')}
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('whyInvest.prices.description')}
            </p>
            <ul className="mt-6 space-y-3">
              {investorBenefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('whyInvest.prices.closing')}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Economic Growth & Diversification */}
      <Section variant="accent">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              {t('whyInvest.growth.title')}
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('whyInvest.growth.description')}
            </p>
            <ul className="mt-6 space-y-3">
              {economicFactors.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('whyInvest.growth.closing')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              {t('whyInvest.diversification.title')}
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              {t('whyInvest.diversification.description')}
            </p>
            <ul className="mt-6 space-y-3">
              {diversificationBenefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              For many investors, Indonesian property serves as a balanced complement 
              to their existing portfolio at home.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Clear Structures & Bali */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              Clear Structures for Foreign Buyers
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Indonesia has well-established legal frameworks that allow international 
              investors to own and operate property safely. Common structures such as 
              Hak Sewa (leasehold) provide:
            </p>
            <ul className="mt-6 space-y-3">
              {hakSewaFeatures.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              With the right developer and legal setup, investing from overseas is 
              practical and transparent.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              Bali: Indonesia's Global Flagship Destination
            </h2>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              Among all Indonesian regions, Bali stands out due to:
            </p>
            <ul className="mt-6 space-y-3">
              {baliAdvantages.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
              This makes Bali one of the most reliable entry points into the Indonesian 
              property market.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Compelling Alternative */}
      <Section variant="accent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            {t('whyInvest.alternative.title')}
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            {t('whyInvest.alternative.description')}
          </p>
          <ul className="mt-6 space-y-2">
            {finalBenefits.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-foreground rounded-full" />
                <span className="font-sans text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            {t('whyInvest.alternative.closing')}
          </p>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section variant="dark" className="border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            {t('whyInvest.cta.title')}
          </h2>
          <p className="mt-6 font-sans text-base text-primary-foreground/80 leading-relaxed">
            {t('whyInvest.cta.description')}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 font-sans text-sm tracking-wide uppercase bg-white text-black hover:bg-white/90"
          >
            <Link to="/projects">{t('whyInvest.cta.button')}</Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
}
