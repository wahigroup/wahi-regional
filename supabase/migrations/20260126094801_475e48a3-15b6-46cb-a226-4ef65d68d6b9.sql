-- Create admin_users table for custom admin authentication
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create site_settings table for editable content
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on both tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create a public view for site_settings that excludes admin-only data
-- This allows the homepage to read hero content without authentication
CREATE VIEW public.site_settings_public
WITH (security_invoker = on) AS
SELECT setting_key, setting_value
FROM public.site_settings
WHERE setting_key IN ('hero_headline', 'hero_description', 'hero_headline_en', 'hero_headline_id', 'hero_headline_zh', 'hero_description_en', 'hero_description_id', 'hero_description_zh');

-- RLS policy for site_settings - allow public read for hero content
CREATE POLICY "Anyone can read hero settings"
ON public.site_settings
FOR SELECT
USING (setting_key IN ('hero_headline', 'hero_description', 'hero_headline_en', 'hero_headline_id', 'hero_headline_zh', 'hero_description_en', 'hero_description_id', 'hero_description_zh'));

-- Insert default hero settings
INSERT INTO public.site_settings (setting_key, setting_value) VALUES
('hero_headline_en', 'Invest in Bali''s Best-Performing Property Market'),
('hero_headline_id', 'Investasi di Pasar Properti Bali dengan Performa Terbaik'),
('hero_headline_zh', '投资巴厘岛表现最佳的房地产市场'),
('hero_description_en', 'Wahi offers international investors access to high-yield, professionally managed real estate in Southeast Asia''s most dynamic tourism destination.'),
('hero_description_id', 'Wahi menawarkan kepada investor internasional akses ke properti dengan imbal hasil tinggi dan dikelola secara profesional di destinasi pariwisata paling dinamis di Asia Tenggara.'),
('hero_description_zh', 'Wahi为国际投资者提供东南亚最具活力的旅游目的地的高收益、专业管理房地产投资机会。');

-- Create update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();