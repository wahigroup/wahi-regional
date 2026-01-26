import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

// Fallback images
import elementsResidenceFallback from "@/assets/elements-residence.jpg";
import sabawa from "@/assets/sabawa.jpg";
import omaSoraFallback from "@/assets/oma-sora.jpg";
import bocoaJimbaranFallback from "@/assets/bocoa-jimbaran.png";

interface Project {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  image_url: string;
  status: string;
  is_featured: boolean;
  display_order: number;
}

const fallbackImages: Record<string, string> = {
  "Elements Residence": elementsResidenceFallback,
  "Oma Sora": omaSoraFallback,
  "Bocoa Jimbaran": bocoaJimbaranFallback,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Index() {
  const { t } = useLanguage();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const pillars = [
    {
      title: t('index.pillars.location'),
      description: t('index.pillars.locationDesc'),
    },
    {
      title: t('index.pillars.design'),
      description: t('index.pillars.designDesc'),
    },
    {
      title: t('index.pillars.structure'),
      description: t('index.pillars.structureDesc'),
    },
  ];

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-projects`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "featured" }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch projects");

        const data = await response.json();
        setFeaturedProjects(data.projects || []);
      } catch (error) {
        console.error("Error fetching featured projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  const getProjectImage = (project: Project) => {
    if (project.image_url) return project.image_url;
    return fallbackImages[project.title] || elementsResidenceFallback;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={sabawa}
            alt="Sabawa - Bamboo residences in Nusa Penida"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>

        <div className="relative section-container py-24 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="max-w-2xl"
          >
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight tracking-tight"
            >
              {t('index.hero.title')}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 lg:mt-8 font-sans text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              {t('index.hero.subtitle')}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="font-sans text-sm tracking-wide uppercase">
                <Link to="/contact">{t('index.hero.bookConsultation')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-sans text-sm tracking-wide uppercase">
                <Link to="/projects">
                  {t('index.hero.exploreProjects')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Invest Beyond Low-Yield Markets */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight">
              {t('index.invest.title')}
            </h2>
            <div className="mt-6 space-y-4 font-sans text-base text-muted-foreground leading-relaxed">
              <p>{t('index.invest.description1')}</p>
              <p>{t('index.invest.description2')}</p>
              <p>{t('index.invest.description3')}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/3] lg:aspect-square"
          >
            <img
              src={elementsResidenceFallback}
              alt="Elements Residence - Modern apartments in Canggu"
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
        </div>
      </Section>

      {/* Three Pillars */}
      <Section variant="accent">
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-foreground p-8 bg-background"
            >
              <h3 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-4">
                {pillar.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center font-serif text-xl lg:text-2xl font-light max-w-3xl mx-auto"
        >
          {t('index.pillars.quote')}
        </motion.p>
      </Section>

      {/* Featured Projects */}
      <Section>
        <SectionHeader
          title={t('index.featured.title')}
          subtitle=""
        />

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="h-4 w-24 mt-4" />
                <Skeleton className="h-6 w-48 mt-2" />
                <Skeleton className="h-4 w-32 mt-1" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={getProjectImage(project)}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground">{project.type}</p>
                  <h3 className="font-serif text-xl mt-1">{project.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground">{project.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="font-sans text-sm tracking-wide uppercase">
            <Link to="/projects">{t('index.featured.viewAll')}</Link>
          </Button>
        </div>
      </Section>

      {/* Why Bali */}
      <Section variant="dark">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-light">
              {t('index.whyBali.title')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6 font-sans text-base text-primary-foreground/80 leading-relaxed"
          >
            <div className="space-y-4 pt-4">
              <div className="border-l-2 border-primary-foreground/30 pl-4">
                <p className="font-medium text-primary-foreground">{t('index.whyBali.demand')}</p>
                <p className="text-sm text-primary-foreground/70">{t('index.whyBali.demandDesc')}</p>
              </div>
              <div className="border-l-2 border-primary-foreground/30 pl-4">
                <p className="font-medium text-primary-foreground">{t('index.whyBali.supply')}</p>
                <p className="text-sm text-primary-foreground/70">{t('index.whyBali.supplyDesc')}</p>
              </div>
              <div className="border-l-2 border-primary-foreground/30 pl-4">
                <p className="font-medium text-primary-foreground">{t('index.whyBali.returns')}</p>
                <p className="text-sm text-primary-foreground/70">{t('index.whyBali.returnsDesc')}</p>
              </div>
            </div>
            <Link
              to="/why-invest"
              className="inline-flex items-center text-primary-foreground hover:opacity-70 transition-opacity"
            >
              {t('index.whyBali.learnMore')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
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
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-light">
            {t('index.cta.title')}
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            {t('index.cta.description')}
          </p>
          <Button asChild size="lg" className="mt-8 font-sans text-sm tracking-wide uppercase">
            <Link to="/contact">{t('index.cta.button')}</Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
}
