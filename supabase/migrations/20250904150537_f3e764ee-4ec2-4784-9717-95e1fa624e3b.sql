-- Create storage bucket for project mockups
INSERT INTO storage.buckets (id, name, public) VALUES ('project-mockups', 'project-mockups', true);

-- Create table for storing project mockup metadata
CREATE TABLE public.project_mockups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_mockups ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a portfolio site)
CREATE POLICY "Anyone can view project mockups" 
ON public.project_mockups 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can upload project mockups" 
ON public.project_mockups 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can delete project mockups" 
ON public.project_mockups 
FOR DELETE 
USING (true);

-- Storage policies for project mockups
CREATE POLICY "Anyone can view project mockup files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-mockups');

CREATE POLICY "Anyone can upload project mockup files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-mockups');

CREATE POLICY "Anyone can update project mockup files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'project-mockups');

CREATE POLICY "Anyone can delete project mockup files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'project-mockups');