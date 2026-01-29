import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useSEO } from "@/hooks/useSEO";

interface LayoutProps {
  children: ReactNode;
}

// Map routes to SEO page names
function getPageName(pathname: string): string {
  const routeMap: Record<string, string> = {
    "/": "home",
    "/projects": "projects",
    "/about": "about",
    "/contact": "contact",
    "/why-invest": "why-invest",
    "/how-it-works": "how-it-works",
  };
  return routeMap[pathname] || "home";
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const pageName = getPageName(location.pathname);
  
  // Apply SEO settings for current page
  useSEO(pageName);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
