import { Link } from "react-router-dom";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const navigation = {
    main: [
      { name: t('nav.home'), href: "/" },
      { name: t('nav.about'), href: "/about" },
      { name: t('nav.projects'), href: "/projects" },
      { name: t('nav.whyIndonesia'), href: "/why-invest" },
    ],
    legal: [
      { name: t('footer.legalStructures'), href: "/legal" },
      { name: t('footer.risksDisclaimers'), href: "/risks" },
      { name: t('footer.faqs'), href: "/faq" },
      { name: t('nav.contact'), href: "/contact" },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <span className="font-serif text-3xl font-light tracking-wider">
              Wahi
            </span>
            <p className="mt-4 font-sans text-sm leading-relaxed text-primary-foreground/70 max-w-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase mb-4 text-primary-foreground/50">
              {t('footer.navigation')}
            </h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="font-sans text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase mb-4 text-primary-foreground/50">
              {t('footer.information')}
            </h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="font-sans text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs text-primary-foreground/50">
              © {new Date().getFullYear()} Wahi Group. {t('footer.allRightsReserved')}
            </p>
            <div className="flex items-center gap-6">
              <p className="font-sans text-xs text-primary-foreground/50">
                {t('footer.baliIndonesia')}
              </p>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
