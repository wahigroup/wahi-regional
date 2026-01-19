import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent",
      description: "We'll be in touch within 24 hours.",
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
            Speak With the Local Wahi Representative
          </h1>
          <p className="mt-8 font-sans text-lg text-muted-foreground leading-relaxed">
            If you are considering an investment in Indonesia and would like 
            a structured, transparent discussion, book a consultation with 
            the local Wahi representative.
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
              Request a Consultation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-sans text-sm">
                    First Name
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
                    Last Name
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
                  Email Address
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
                  Phone Number
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
                  Country of Residence
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
                  Investment Budget Range
                </Label>
                <Input
                  id="budget"
                  name="budget"
                  placeholder="e.g., $200,000 - $500,000"
                  className="border-foreground bg-transparent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-sans text-sm">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your investment interests and any questions you have."
                  className="border-foreground bg-transparent resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full font-sans text-sm tracking-wide uppercase"
              >
                {isSubmitting ? "Sending..." : "Submit Enquiry"}
              </Button>

              <p className="font-sans text-xs text-muted-foreground text-center">
                By submitting this form, you agree to be contacted by a Wahi representative.
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
              What to Expect
            </h2>

            <div className="space-y-8">
              <div className="border-l border-foreground pl-6">
                <h3 className="font-serif text-xl">Initial Call</h3>
                <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">
                  A 30-minute introductory call to understand your investment 
                  objectives and answer initial questions.
                </p>
              </div>

              <div className="border-l border-foreground pl-6">
                <h3 className="font-serif text-xl">Project Presentation</h3>
                <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">
                  Detailed presentation of relevant projects, including 
                  specifications, pricing, and investment projections.
                </p>
              </div>

              <div className="border-l border-foreground pl-6">
                <h3 className="font-serif text-xl">Structure Discussion</h3>
                <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">
                  Review of ownership structures, legal considerations, 
                  and tax implications for your jurisdiction.
                </p>
              </div>

              <div className="border-l border-foreground pl-6">
                <h3 className="font-serif text-xl">No Obligation</h3>
                <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">
                  Our consultations are informative with no pressure. 
                  Take your time to make an informed decision.
                </p>
              </div>
            </div>

            {/* Regional Representative Placeholder */}
            <div className="mt-12 p-8 bg-accent">
              <h3 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-6">
                Your Local Representative
              </h3>
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="font-sans text-xs text-muted-foreground">Photo</span>
                </div>
                <div className="space-y-2">
                  <p className="font-serif text-lg">[Representative Name]</p>
                  <p className="font-sans text-sm text-muted-foreground">Wahi Regional Representative</p>
                  <div className="pt-2 space-y-1 font-sans text-sm text-muted-foreground">
                    <p>info@wahigroup.id</p>
                    <p>Bali, Indonesia</p>
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
