import { useEffect, useState } from "react";

interface PageSEO {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}

interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  ogImage: string;
  twitterHandle: string;
  keywords: string;
  author: string;
  pages: Record<string, PageSEO>;
}

const defaultSettings: SEOSettings = {
  siteTitle: "Wahi | Cross-Border Real Estate Investment in Indonesia",
  siteDescription: "A calm, transparent approach for serious investors seeking stable demand and materially higher rental income in Indonesia's most resilient lifestyle destinations.",
  ogImage: "https://lovable.dev/opengraph-image-p98pqg.png",
  twitterHandle: "@WahiGroup",
  keywords: "real estate, investment, Indonesia, Bali, property, villa, apartments",
  author: "Wahi Group",
  pages: {},
};

// Cache SEO settings to avoid refetching on every page
let cachedSettings: SEOSettings | null = null;
let fetchPromise: Promise<SEOSettings> | null = null;

async function fetchSEOSettings(): Promise<SEOSettings> {
  if (cachedSettings) return cachedSettings;
  
  if (fetchPromise) return fetchPromise;
  
  fetchPromise = (async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-content`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            action: "get-page-section", 
            pageName: "global", 
            sectionKey: "seo" 
          }),
        }
      );

      if (!response.ok) {
        console.warn("Failed to fetch SEO settings, using defaults");
        return defaultSettings;
      }

      const data = await response.json();
      if (data.content && Object.keys(data.content).length > 0) {
        cachedSettings = { ...defaultSettings, ...data.content };
        return cachedSettings;
      }
      
      cachedSettings = defaultSettings;
      return cachedSettings;
    } catch (error) {
      console.warn("Error fetching SEO settings:", error);
      cachedSettings = defaultSettings;
      return cachedSettings;
    } finally {
      fetchPromise = null;
    }
  })();
  
  return fetchPromise;
}

// Clear cache (useful for admin after saving)
export function clearSEOCache() {
  cachedSettings = null;
  fetchPromise = null;
}

// Update meta tag helper
function updateMetaTag(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }
  
  element.content = content;
}

// Hook to apply SEO settings for a specific page
export function useSEO(pageName: string = "home") {
  const [settings, setSettings] = useState<SEOSettings>(cachedSettings || defaultSettings);
  const [isLoaded, setIsLoaded] = useState(!!cachedSettings);

  useEffect(() => {
    let mounted = true;
    
    fetchSEOSettings().then((fetchedSettings) => {
      if (mounted) {
        setSettings(fetchedSettings);
        setIsLoaded(true);
      }
    });
    
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const pageSettings = settings.pages[pageName];
    const title = pageSettings?.title || settings.siteTitle;
    const description = pageSettings?.description || settings.siteDescription;
    const ogTitle = pageSettings?.ogTitle || title;
    const ogDescription = pageSettings?.ogDescription || description;

    // Update document title
    document.title = title;

    // Update meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", settings.keywords);
    updateMetaTag("author", settings.author);

    // Open Graph
    updateMetaTag("og:title", ogTitle, true);
    updateMetaTag("og:description", ogDescription, true);
    updateMetaTag("og:image", settings.ogImage, true);
    updateMetaTag("og:type", "website", true);

    // Twitter
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:site", settings.twitterHandle);
    updateMetaTag("twitter:title", ogTitle);
    updateMetaTag("twitter:description", ogDescription);
    updateMetaTag("twitter:image", settings.ogImage);

  }, [isLoaded, settings, pageName]);

  return { settings, isLoaded };
}

export default useSEO;
