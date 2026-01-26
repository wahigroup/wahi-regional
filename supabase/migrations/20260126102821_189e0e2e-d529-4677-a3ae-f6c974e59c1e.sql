-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'available',
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_settings table for contact page configuration
CREATE TABLE public.contact_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create page_sections table for editable page content
CREATE TABLE public.page_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_name, section_key)
);

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

-- Projects RLS: Public read access, service role for modifications
CREATE POLICY "Anyone can read projects" 
ON public.projects FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage projects" 
ON public.projects FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Contact settings RLS: Public read, service role for modifications
CREATE POLICY "Anyone can read contact settings" 
ON public.contact_settings FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage contact settings" 
ON public.contact_settings FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Page sections RLS: Public read, service role for modifications
CREATE POLICY "Anyone can read page sections" 
ON public.page_sections FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage page sections" 
ON public.page_sections FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Add triggers for updated_at
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_settings_updated_at
BEFORE UPDATE ON public.contact_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_sections_updated_at
BEFORE UPDATE ON public.page_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default projects
INSERT INTO public.projects (title, location, type, description, is_featured, display_order) VALUES
('Elements Residence', 'Canggu, Bali', 'Modern Apartments', 'Ocean-view modern apartments inspired by the four natural elements of Bali. A harmonious blend of contemporary design and natural beauty.', true, 1),
('Sabawa', 'Nusa Penida', 'Bamboo Residences', 'Nature-carved bamboo residences offering serene jungle and ocean vistas in Nusa Penida. Sustainable luxury in an untouched paradise.', false, 2),
('Oma Sora', 'Umalas, Bali', 'Earth-formed Architecture', 'Earth-formed architecture with flowing curves inspired by Wabi-Sabi serenity. A unique expression of organic living.', true, 3),
('Bocoa Jimbaran', 'Jimbaran, Bali', 'Adobe-style Villas', 'Adobe-style villa retreat where rustic elegance meets tropical serenity with private pool sanctuary. Mediterranean warmth in Bali.', true, 4),
('Salt & Stone', 'Balangan, Bali', 'Mediterranean Villas', 'Mediterranean serenity meets Balinese warmth with refined craftsmanship and coastal views. Timeless elegance by the sea.', false, 5);

-- Insert default contact settings
INSERT INTO public.contact_settings (setting_key, setting_value) VALUES
('email', 'info@wahigroup.id'),
('phone', ''),
('address', 'Bali, Indonesia'),
('rep_name', 'Regional Representative'),
('rep_role', 'Investment Advisor'),
('whatsapp', '');

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);