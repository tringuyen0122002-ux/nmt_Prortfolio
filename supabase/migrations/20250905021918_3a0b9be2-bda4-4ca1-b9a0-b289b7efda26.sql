-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create projects table for proper project ownership
CREATE TABLE public.projects (
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

-- Projects policies
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

-- Insert default projects for existing users (if any)
INSERT INTO public.projects (name, slug, description, owner_id)
SELECT 'Content Management System', 'cms-project', 'A modern CMS for content management', id
FROM auth.users
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE slug = 'cms-project');

INSERT INTO public.projects (name, slug, description, owner_id)
SELECT 'Resource Management System', 'rms-project', 'A comprehensive resource management system', id  
FROM auth.users
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE slug = 'rms-project');

-- Create trigger for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();