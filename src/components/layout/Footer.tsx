import { Link } from "react-router-dom";

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Why Indonesia", href: "/why-invest" },
  ],
  legal: [
    { name: "Legal Structures", href: "/legal" },
    { name: "Risks & Disclaimers", href: "/risks" },
    { name: "FAQs", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
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
              A transparent approach to cross-border real estate investment in Indonesia's 
              most resilient lifestyle destinations.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase mb-4 text-primary-foreground/50">
              Navigation
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
              Information
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
              © {new Date().getFullYear()} Wahi Group. All rights reserved.
            </p>
            <p className="font-sans text-xs text-primary-foreground/50">
              Bali, Indonesia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
