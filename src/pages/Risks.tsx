import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";

const risks = [
  {
    category: "Market Risk",
    description: "Property values and rental income may fluctuate based on tourism trends, local economic conditions, and global market factors.",
  },
  {
    category: "Regulatory Risk",
    description: "Indonesian property laws and foreign ownership regulations may change, potentially affecting ownership rights or operating conditions.",
  },
  {
    category: "Currency Risk",
    description: "Exchange rate fluctuations between your home currency and Indonesian Rupiah can affect returns when converted.",
  },
  {
    category: "Operational Risk",
    description: "Property management, maintenance, and rental performance depend on quality of management and market conditions.",
  },
  {
    category: "Liquidity Risk",
    description: "Real estate is an illiquid asset. Selling a property may take time and market conditions may affect sale price.",
  },
  {
    category: "Political Risk",
    description: "Changes in government policy, taxation, or economic stability may affect investment returns.",
  },
];

export default function Risks() {
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
            Understanding Risk in Context
          </h1>
          <p className="mt-8 font-sans text-lg text-muted-foreground leading-relaxed">
            All real estate investments carry risk, including market, regulatory, 
            currency, and operational considerations. We believe in transparent 
            communication about these factors.
          </p>
        </motion.div>
      </Section>

      {/* Risk Categories */}
      <Section className="pt-0">
        <div className="grid md:grid-cols-2 gap-6">
          {risks.map((risk, index) => (
            <motion.div
              key={risk.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-foreground p-8"
            >
              <h3 className="font-serif text-xl">{risk.category}</h3>
              <p className="mt-4 font-sans text-sm text-muted-foreground leading-relaxed">
                {risk.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Mitigation */}
      <Section variant="accent">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              Risk Context & Mitigation
            </h2>
            <div className="mt-8 space-y-6 font-sans text-base text-muted-foreground leading-relaxed">
              <p>
                Investing in Indonesia involves additional cross-border factors; 
                however, demand risk in established destinations such as Bali is 
                mitigated by long-term tourism fundamentals and diversified visitor 
                profiles from both international and domestic markets.
              </p>
              <p>
                Wahi projects are designed with conservative assumptions, quality 
                construction, and professional management to mitigate operational 
                risks. However, no investment is without risk, and past performance 
                or market comparisons do not guarantee future results.
              </p>
              <p>
                We encourage all investors to conduct their own due diligence, 
                seek independent legal and tax advice, and invest only capital 
                they can afford to hold for the long term.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Disclaimers */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            Important Disclaimers
          </h2>
          <div className="mt-8 space-y-6 font-sans text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">No Guarantees:</strong> Wahi does not guarantee returns. 
              All yield figures, occupancy rates, and performance metrics referenced 
              on this website are contextual and illustrative only. They are based 
              on market observations and conservative assumptions, not forecasts 
              or promises of future performance.
            </p>
            <p>
              <strong className="text-foreground">Not Financial Advice:</strong> The information on this 
              website is for general informational purposes only and does not 
              constitute financial, legal, or tax advice. Investors are encouraged 
              to make informed, independent decisions based on their own objectives 
              and professional advice.
            </p>
            <p>
              <strong className="text-foreground">Individual Circumstances:</strong> Each investor's 
              situation is unique. Tax implications, legal considerations, and 
              investment suitability vary based on your country of residence, 
              personal circumstances, and investment objectives.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section variant="dark">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-light">
            Discuss Risk in Detail
          </h2>
          <p className="mt-6 font-sans text-base text-primary-foreground/80 leading-relaxed">
            During consultation, we provide a detailed discussion of risks 
            specific to your investment and situation.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="mt-8 font-sans text-sm tracking-wide uppercase border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <Link to="/contact">Book a Consultation</Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
}
