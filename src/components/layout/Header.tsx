import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import wahiLogo from "@/assets/wahi-logo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Why Indonesia", href: "/why-invest" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary">
      <nav className="section-container flex items-center justify-between py-4 lg:py-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={wahiLogo} alt="Wahi" className="h-8 lg:h-10 invert brightness-0 invert" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-sans tracking-wide uppercase transition-opacity hover:opacity-70 ${
                location.pathname === item.href
                  ? "text-primary-foreground"
                  : "text-primary-foreground/80"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden text-primary-foreground"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary"
          >
            <div className="section-container flex items-center justify-between py-4">
              <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <img src={wahiLogo} alt="Wahi" className="h-8 invert brightness-0 invert" />
              </Link>
              <button
                type="button"
                className="text-primary-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="section-container mt-12 flex flex-col gap-6"
            >
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    to={item.href}
                    className="block font-serif text-3xl text-primary-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
