import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, X, ChevronLeft, ChevronRight, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProjectMockups } from '@/hooks/useProjectMockups';

interface ImageUploadProps {
  projectId: string;
  maxImages?: number;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  projectId,
  maxImages = 10,
  className
}) => {
  const { mockups, isUploading, uploadMockups, deleteMockup, getImageUrl } = useProjectMockups(projectId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || isUploading) return;

    const validFiles = Array.from(files).filter(file => {
      return file.type.startsWith('image/') && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg');
    });

    const remainingSlots = maxImages - mockups.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
      try {
        await uploadMockups(filesToAdd);
      } catch (error) {
        console.error('Failed to upload images:', error);
      }
    }
  };

  const removeImage = async (index: number) => {
    const mockup = mockups[index];
    if (!mockup) return;

    try {
      await deleteMockup(mockup.id, mockup.file_path);
      
      // Adjust current index if needed
      if (currentImageIndex >= mockups.length - 1 && mockups.length > 1) {
        setCurrentImageIndex(mockups.length - 2);
      } else if (mockups.length === 1) {
        setCurrentImageIndex(0);
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockups.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mockups.length) % mockups.length);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-accent/50 transition-colors",
          isUploading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        )}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/jpg"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={isUploading}
        />
        
        <div className="flex flex-col items-center gap-2">
          {isUploading ? (
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
          <div>
            <p className="text-sm font-medium">
              {isUploading ? 'Uploading...' : 'Upload Mockups'}
            </p>
            <p className="text-xs text-muted-foreground">
              Drag & drop or click to browse • PNG, JPEG only
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {mockups.length}/{maxImages} images
          </Badge>
        </div>
      </div>

      {/* Image Gallery */}
      {mockups.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Main Image Display */}
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                {mockups[currentImageIndex] ? (
                  <img
                    src={getImageUrl(mockups[currentImageIndex].file_path)}
                    alt={`Mockup ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}

                {/* Navigation Arrows */}
                {mockups.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Remove Current Image */}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => removeImage(currentImageIndex)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              {/* Thumbnail Strip */}
              {mockups.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {mockups.map((mockup, index) => (
                    <button
                      key={mockup.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden transition-all",
                        currentImageIndex === index
                          ? "border-accent shadow-md"
                          : "border-muted hover:border-accent/50"
                      )}
                    >
                      <img
                        src={getImageUrl(mockup.file_path)}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Image Info */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {mockups.length > 0
                    ? `${currentImageIndex + 1} of ${mockups.length}`
                    : 'No images'
                  }
                </span>
                {mockups[currentImageIndex] && (
                  <span className="truncate ml-2">
                    {mockups[currentImageIndex].file_name}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};