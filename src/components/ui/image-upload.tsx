import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImagesChange?: (images: File[]) => void;
  maxImages?: number;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesChange,
  maxImages = 10,
  className
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(file => {
      return file.type.startsWith('image/') && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg');
    });

    const remainingSlots = maxImages - images.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
      const newImages = [...images, ...filesToAdd];
      setImages(newImages);
      onImagesChange?.(newImages);

      // Create preview URLs
      const newUrls = filesToAdd.map(file => URL.createObjectURL(file));
      const allUrls = [...previewUrls, ...newUrls];
      setPreviewUrls(allUrls);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    
    // Revoke the URL to free memory
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    
    setImages(newImages);
    setPreviewUrls(newUrls);
    onImagesChange?.(newImages);

    // Adjust current index if needed
    if (currentImageIndex >= newUrls.length && newUrls.length > 0) {
      setCurrentImageIndex(newUrls.length - 1);
    } else if (newUrls.length === 0) {
      setCurrentImageIndex(0);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % previewUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + previewUrls.length) % previewUrls.length);
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
        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-accent/50 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
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
        />
        
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Upload Mockups</p>
            <p className="text-xs text-muted-foreground">
              Drag & drop or click to browse • PNG, JPEG only
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {images.length}/{maxImages} images
          </Badge>
        </div>
      </div>

      {/* Image Gallery */}
      {previewUrls.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Main Image Display */}
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                {previewUrls[currentImageIndex] ? (
                  <img
                    src={previewUrls[currentImageIndex]}
                    alt={`Mockup ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}

                {/* Navigation Arrows */}
                {previewUrls.length > 1 && (
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
              {previewUrls.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {previewUrls.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden transition-all",
                        currentImageIndex === index
                          ? "border-accent shadow-md"
                          : "border-muted hover:border-accent/50"
                      )}
                    >
                      <img
                        src={url}
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
                  {previewUrls.length > 0
                    ? `${currentImageIndex + 1} of ${previewUrls.length}`
                    : 'No images'
                  }
                </span>
                {images[currentImageIndex] && (
                  <span className="truncate ml-2">
                    {images[currentImageIndex].name}
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