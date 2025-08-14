-- Create storage bucket for about us images
INSERT INTO storage.buckets (id, name, public) VALUES ('about-us', 'about-us', true);

-- Create policies for about us image uploads
CREATE POLICY "About us images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'about-us');

-- Only authenticated users can upload about us images
CREATE POLICY "Authenticated users can upload about us images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'about-us' AND auth.uid() IS NOT NULL);

-- Only authenticated users can update about us images
CREATE POLICY "Authenticated users can update about us images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'about-us' AND auth.uid() IS NOT NULL);

-- Only authenticated users can delete about us images
CREATE POLICY "Authenticated users can delete about us images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'about-us' AND auth.uid() IS NOT NULL);