-- Storage policies for project-images bucket
CREATE POLICY "Public can view project images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'project-images');

CREATE POLICY "Service role can upload project images" 
ON storage.objects FOR INSERT 
TO service_role
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Service role can update project images" 
ON storage.objects FOR UPDATE 
TO service_role
USING (bucket_id = 'project-images');

CREATE POLICY "Service role can delete project images" 
ON storage.objects FOR DELETE 
TO service_role
USING (bucket_id = 'project-images');