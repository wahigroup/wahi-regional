import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

// Fallback images
import elementsResidenceFallback from "@/assets/elements-residence.jpg";
import sabawaFallback from "@/assets/sabawa.jpg";
import omaSoraFallback from "@/assets/oma-sora.jpg";
import bocoaJimbaranFallback from "@/assets/bocoa-jimbaran.png";
import saltStoneFallback from "@/assets/salt-stone.png";

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
  "Sabawa": sabawaFallback,
  "Oma Sora": omaSoraFallback,
  "Bocoa Jimbaran": bocoaJimbaranFallback,
  "Salt & Stone": saltStoneFallback,
};

export default function Projects() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-projects`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "list" }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch projects");

        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectImage = (project: Project) => {
    // If image_url is a /src/assets path, use fallback (these don't work in production)
    if (project.image_url?.startsWith("/src/assets")) {
      return fallbackImages[project.title] || elementsResidenceFallback;
    }
    // If it's a valid URL or storage path, use it
    if (project.image_url && (project.image_url.startsWith("http") || project.image_url.startsWith("blob:"))) {
      return project.image_url;
    }
    // Fallback to title-based image
    return fallbackImages[project.title] || elementsResidenceFallback;
  };

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
            {t('projects.hero.title')}
          </h1>
          <p className="mt-8 font-sans text-lg text-muted-foreground leading-relaxed">
            {t('projects.hero.description')}
          </p>
        </motion.div>
      </Section>

      {/* Projects List */}
      <Section className="pt-0">
        {loading ? (
          <div className="space-y-24">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                      src={getProjectImage(project)}
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
                      {project.status === "available" ? t('projects.available') : project.status}
                    </span>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="mt-8 font-sans text-sm tracking-wide uppercase"
                  >
                    <Link to="/contact">
                      {t('projects.enquireNow')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}

            {projects.length === 0 && !loading && (
              <p className="text-center text-muted-foreground py-12">
                No projects available at the moment.
              </p>
            )}
          </div>
        )}
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
            {t('projects.cta.title')}
          </h2>
          <p className="mt-6 font-sans text-base text-muted-foreground leading-relaxed">
            {t('projects.cta.description')}
          </p>
          <Button asChild size="lg" className="mt-8 font-sans text-sm tracking-wide uppercase">
            <Link to="/contact">{t('projects.cta.button')}</Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
}
