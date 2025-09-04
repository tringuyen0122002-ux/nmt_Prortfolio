import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProjectMockup {
  id: string;
  project_id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  uploaded_at: string;
}

export const useProjectMockups = (projectId: string) => {
  const [mockups, setMockups] = useState<ProjectMockup[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMockups = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_mockups')
        .select('*')
        .eq('project_id', projectId)
        .order('uploaded_at', { ascending: true });

      if (error) throw error;
      setMockups(data || []);
    } catch (error) {
      console.error('Error fetching mockups:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadMockups = async (files: File[]) => {
    setIsUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const fileName = `${projectId}/${Date.now()}_${file.name}`;
        
        // Upload file to storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-mockups')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Insert metadata to database
        const { data: mockupData, error: dbError } = await supabase
          .from('project_mockups')
          .insert({
            project_id: projectId,
            file_name: file.name,
            file_path: uploadData.path,
            file_size: file.size,
            mime_type: file.type,
          })
          .select()
          .single();

        if (dbError) throw dbError;
        return mockupData;
      });

      const newMockups = await Promise.all(uploadPromises);
      setMockups(prev => [...prev, ...newMockups]);
      return newMockups;
    } catch (error) {
      console.error('Error uploading mockups:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteMockup = async (mockupId: string, filePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('project-mockups')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('project_mockups')
        .delete()
        .eq('id', mockupId);

      if (dbError) throw dbError;

      setMockups(prev => prev.filter(m => m.id !== mockupId));
    } catch (error) {
      console.error('Error deleting mockup:', error);
      throw error;
    }
  };

  const getImageUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('project-mockups')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  useEffect(() => {
    if (projectId) {
      fetchMockups();
    }
  }, [projectId]);

  return {
    mockups,
    isUploading,
    isLoading,
    uploadMockups,
    deleteMockup,
    getImageUrl,
    refetch: fetchMockups,
  };
};