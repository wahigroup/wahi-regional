import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: t('contact.form.success.title'),
      description: t('contact.form.success.description'),
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
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
            {t('contact.hero.title')}
          </h1>
          <p className="mt-8 font-sans text-lg text-muted-foreground leading-relaxed">
            {t('contact.hero.description')}
          </p>
        </motion.div>
      </Section>

      {/* Contact Form */}
      <Section className="pt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl lg:text-3xl font-light mb-8">
              {t('contact.form.title')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-sans text-sm">
                    {t('contact.form.firstName')}
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    className="border-foreground bg-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-sans text-sm">
                    {t('contact.form.lastName')}
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    className="border-foreground bg-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-sans text-sm">
                  {t('contact.form.email')}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="border-foreground bg-transparent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="font-sans text-sm">
                  {t('contact.form.phone')}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="border-foreground bg-transparent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="font-sans text-sm">
                  {t('contact.form.country')}
                </Label>
                <Input
                  id="country"
                  name="country"
                  required
                  className="border-foreground bg-transparent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="font-sans text-sm">
                  {t('contact.form.budget')}
                </Label>
                <Input
                  id="budget"
                  name="budget"
                  placeholder={t('contact.form.budgetPlaceholder')}
                  className="border-foreground bg-transparent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-sans text-sm">
                  {t('contact.form.message')}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder={t('contact.form.messagePlaceholder')}
                  className="border-foreground bg-transparent resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full font-sans text-sm tracking-wide uppercase"
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
              </Button>

              <p className="font-sans text-xs text-muted-foreground text-center">
                {t('contact.form.disclaimer')}
              </p>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-serif text-2xl lg:text-3xl font-light mb-8">
              {t('contact.expect.title')}
            </h2>

            <div className="space-y-8">
              <div className="border-l border-foreground pl-6">
                <h3 className="font-serif text-xl">{t('contact.expect.call.title')}</h3>
                <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">
                  {t('contact.expect.call.description')}
                </p>
              </div>

              <div className="border-l border-foreground pl-6">
                <h3 className="font-serif text-xl">{t('contact.expect.presentation.title')}</h3>
                <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">
                  {t('contact.expect.presentation.description')}
                </p>
              </div>

              <div className="border-l border-foreground pl-6">
                <h3 className="font-serif text-xl">{t('contact.expect.structure.title')}</h3>
                <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">
                  {t('contact.expect.structure.description')}
                </p>
              </div>

              <div className="border-l border-foreground pl-6">
                <h3 className="font-serif text-xl">{t('contact.expect.noObligation.title')}</h3>
                <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">
                  {t('contact.expect.noObligation.description')}
                </p>
              </div>
            </div>

            {/* Regional Representative Placeholder */}
            <div className="mt-12 p-8 bg-accent">
              <h3 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-6">
                {t('contact.rep.title')}
              </h3>
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="font-sans text-xs text-muted-foreground">{t('contact.rep.photo')}</span>
                </div>
                <div className="space-y-2">
                  <p className="font-serif text-lg">{t('contact.rep.name')}</p>
                  <p className="font-sans text-sm text-muted-foreground">{t('contact.rep.role')}</p>
                  <div className="pt-2 space-y-1 font-sans text-sm text-muted-foreground">
                    <p>info@wahigroup.id</p>
                    <p>{t('footer.baliIndonesia')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </Layout>
  );
}
