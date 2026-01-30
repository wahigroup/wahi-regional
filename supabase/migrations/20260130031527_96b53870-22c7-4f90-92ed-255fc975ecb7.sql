-- Drop the restrictive RLS policy
DROP POLICY IF EXISTS "Anyone can read hero settings" ON public.site_settings;

-- Create a new public read policy that allows reading all public settings
CREATE POLICY "Anyone can read public settings" 
ON public.site_settings 
FOR SELECT 
USING (
  setting_key = ANY (ARRAY[
    'hero_headline', 'hero_description',
    'hero_headline_en', 'hero_headline_id', 'hero_headline_zh', 'hero_headline_ru', 'hero_headline_fr', 'hero_headline_es',
    'hero_description_en', 'hero_description_id', 'hero_description_zh', 'hero_description_ru', 'hero_description_fr', 'hero_description_es',
    'default_language'
  ])
);