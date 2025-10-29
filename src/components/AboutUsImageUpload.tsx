import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Edit2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { useAuthStore } from '@/stores/authStore';
import ImageEditor from './ImageEditor';

interface AboutUsImageUploadProps {
  onImageChange: (imageUrl: string | null) => void;
  currentImageUrl?: string | null;
}

const AboutUsImageUpload = ({ onImageChange, currentImageUrl }: AboutUsImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated } = useAuthStore();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleFileUpload called');
    const file = event.target.files?.[0];
    console.log('Selected file:', file);
    if (!file) {
      console.log('No file selected');
      return;
    }

    if (!isAuthenticated) {
      toast.error("You must be logged in to upload images");
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploading(true);
    
    try {
      // Delete existing image if it exists
      if (currentImageUrl) {
        const fileName = currentImageUrl.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('about-us')
            .remove([fileName]);
        }
      }

      // Upload new image
      const fileName = `about-us-${Date.now()}.${file.name.split('.').pop()}`;
      const { data, error } = await supabase.storage
        .from('about-us')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('about-us')
        .getPublicUrl(data.path);

      onImageChange(publicUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!currentImageUrl || !isAuthenticated) return;

    try {
      const fileName = currentImageUrl.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('about-us')
          .remove([fileName]);
      }

      onImageChange(null);
      toast.success("Image removed successfully!");
    } catch (error) {
      console.error('Error removing image:', error);
      toast.error("Failed to remove image");
    }
  };

  const handleSaveEditedImage = async (editedImageBlob: Blob) => {
    console.log('handleSaveEditedImage called with blob size:', editedImageBlob.size);
    
    if (!isAuthenticated) {
      console.error('User not authenticated');
      return;
    }

    setUploading(true);
    
    try {
      console.log('Starting upload process...');
      
      // Delete existing image if it exists
      if (currentImageUrl) {
        console.log('Deleting existing image:', currentImageUrl);
        const fileName = currentImageUrl.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('about-us')
            .remove([fileName]);
          console.log('Existing image deleted');
        }
      }

      // Upload edited image
      const fileName = `about-us-edited-${Date.now()}.png`;
      console.log('Uploading new image:', fileName);
      
      const { data, error } = await supabase.storage
        .from('about-us')
        .upload(fileName, editedImageBlob);

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      console.log('Upload successful:', data);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('about-us')
        .getPublicUrl(data.path);

      console.log('Public URL:', publicUrl);
      onImageChange(publicUrl);
      toast.success("Edited image saved successfully!");
    } catch (error) {
      console.error('Error saving edited image:', error);
      toast.error("Failed to save edited image");
    } finally {
      setUploading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <div className="absolute top-4 right-4 z-10">
        <div className="flex gap-2">
          {currentImageUrl && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditorOpen(true)}
                className="rounded-full h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                title="Edit image"
              >
                <Edit2 size={16} />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleRemoveImage}
                className="rounded-full h-8 w-8 p-0"
                title="Remove image"
              >
                <X size={16} />
              </Button>
            </>
          )}
          
          <Button
            size="sm"
            onClick={() => {
              console.log('Upload button clicked');
              console.log('fileInputRef.current:', fileInputRef.current);
              fileInputRef.current?.click();
            }}
            disabled={uploading}
            className="rounded-full h-8 w-8 p-0 bg-accent1 hover:bg-accent1/90"
            title="Upload image"
          >
            {uploading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Upload size={16} />
            )}
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {currentImageUrl && (
        <ImageEditor
          imageUrl={currentImageUrl}
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSaveEditedImage}
        />
      )}
    </>
  );
};

export default AboutUsImageUpload;