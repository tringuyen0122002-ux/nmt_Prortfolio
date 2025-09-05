-- Create projects table for proper project ownership (if not exists)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects policies (drop and recreate to ensure they exist)
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can create projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON public.projects;

CREATE POLICY "Users can view their own projects"
ON public.projects
FOR SELECT
USING (auth.uid() = owner_id);

CREATE POLICY "Users can create projects"
ON public.projects
FOR INSERT
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own projects"
ON public.projects
FOR UPDATE
USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own projects"
ON public.projects
FOR DELETE
USING (auth.uid() = owner_id);

-- Update project_mockups to reference projects table
ALTER TABLE public.project_mockups 
ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Anyone can view project mockups" ON public.project_mockups;
DROP POLICY IF EXISTS "Anyone can upload project mockups" ON public.project_mockups;
DROP POLICY IF EXISTS "Anyone can delete project mockups" ON public.project_mockups;

-- Create secure RLS policies for project_mockups
CREATE POLICY "Users can view their own project mockups"
ON public.project_mockups
FOR SELECT
USING (auth.uid() = owner_id);

CREATE POLICY "Users can upload their own project mockups"
ON public.project_mockups
FOR INSERT
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own project mockups"
ON public.project_mockups
FOR DELETE
USING (auth.uid() = owner_id);

-- Update storage policies to require authentication
DROP POLICY IF EXISTS "Anyone can view project mockups" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload project mockups" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete project mockups" ON storage.objects;

-- Create secure storage policies
CREATE POLICY "Users can view their own mockups in storage"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-mockups' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own mockups to storage"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'project-mockups' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own mockups from storage"
ON storage.objects
FOR DELETE
USING (bucket_id = 'project-mockups' AND auth.uid()::text = (storage.foldername(name))[1]);