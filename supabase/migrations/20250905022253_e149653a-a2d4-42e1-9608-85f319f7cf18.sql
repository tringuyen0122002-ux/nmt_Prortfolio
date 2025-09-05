-- Create function to create default projects for new users
CREATE OR REPLACE FUNCTION public.create_default_projects()
RETURNS TRIGGER AS $$
BEGIN
  -- Create CMS project
  INSERT INTO public.projects (name, slug, description, owner_id)
  VALUES ('Content Management System', 'cms-project', 'A modern CMS for content management', NEW.id);
  
  -- Create RMS project  
  INSERT INTO public.projects (name, slug, description, owner_id)
  VALUES ('Resource Management System', 'rms-project', 'A comprehensive resource management system', NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to automatically create default projects for new users
CREATE TRIGGER on_auth_user_create_projects
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.create_default_projects();