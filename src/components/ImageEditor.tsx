import { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, FabricImage } from 'fabric';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ZoomIn, ZoomOut, Palette, Save, RotateCcw } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ImageEditorProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedImageBlob: Blob) => void;
}

const ImageEditor = ({ imageUrl, isOpen, onClose, onSave }: ImageEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [originalImage, setOriginalImage] = useState<FabricImage | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [zoom, setZoom] = useState([100]);
  const [brightness, setBrightness] = useState([0]);
  const [contrast, setContrast] = useState([0]);

  useEffect(() => {
    if (!canvasRef.current || !isOpen) {
      return;
    }

    console.log('Initializing canvas and loading image...');
    setIsImageLoading(true);

    // Initialize canvas first
    const canvas = new FabricCanvas(canvasRef.current, {
      width: 600,
      height: 400,
      backgroundColor: '#ffffff',
    });

    console.log('Canvas created');
    setFabricCanvas(canvas);

    // Load image using FabricImage.fromURL (recommended for Fabric.js v6)
    FabricImage.fromURL(imageUrl, {
      crossOrigin: 'anonymous'
    })
      .then((img) => {
        console.log('Image loaded successfully');
        
        // Scale image to fit canvas
        const scale = Math.min(
          canvas.width! / img.width!,
          canvas.height! / img.height!
        );
        
        img.set({
          scaleX: scale,
          scaleY: scale,
          left: (canvas.width! - img.width! * scale) / 2,
          top: (canvas.height! - img.height! * scale) / 2,
          selectable: true, // Make image movable
          hasControls: false, // Disable resize controls
          hasBorders: true, // Show selection border
          lockRotation: true, // Prevent rotation
        });

        canvas.add(img);
        canvas.centerObject(img);
        setOriginalImage(img);
        canvas.renderAll();
        setIsImageLoading(false);
        console.log('Image added to canvas and ready');
        toast.success("Image loaded - drag to reposition!");
      })
      .catch((error) => {
        console.error('Error loading image:', error);
        setIsImageLoading(false);
        toast.error("Failed to load image");
      });

    return () => {
      console.log('Cleaning up canvas...');
      canvas.dispose();
      setFabricCanvas(null);
      setOriginalImage(null);
    };
  }, [imageUrl, isOpen]);

  const applyFilters = () => {
    if (!originalImage || !fabricCanvas) return;

    // Apply grayscale using CSS filter
    if (isGrayscale) {
      originalImage.set('filters', ['grayscale(100%)']);
    } else {
      originalImage.set('filters', []);
    }

    // Apply brightness and contrast using CSS filters
    const cssFilters = [];
    if (brightness[0] !== 0) {
      cssFilters.push(`brightness(${100 + brightness[0]}%)`);
    }
    if (contrast[0] !== 0) {
      cssFilters.push(`contrast(${100 + contrast[0]}%)`);
    }
    if (isGrayscale) {
      cssFilters.push('grayscale(100%)');
    }

    // Apply CSS filters to the image element
    const imgElement = originalImage.getElement();
    if (imgElement) {
      imgElement.style.filter = cssFilters.join(' ');
    }

    fabricCanvas.renderAll();
  };

  useEffect(() => {
    applyFilters();
  }, [isGrayscale, brightness, contrast, originalImage, fabricCanvas]);

  const handleZoom = () => {
    if (!originalImage || !fabricCanvas) {
      console.log('Cannot zoom: missing originalImage or fabricCanvas');
      return;
    }

    // Store the original scale for reference
    const originalScale = Math.min(
      fabricCanvas.width! / originalImage.width!,
      fabricCanvas.height! / originalImage.height!
    );

    const zoomLevel = zoom[0] / 100;
    const newScale = originalScale * zoomLevel;
    
    console.log('Applying zoom:', zoomLevel, 'New scale:', newScale);
    
    originalImage.set({
      scaleX: newScale,
      scaleY: newScale,
    });
    fabricCanvas.renderAll();
  };

  useEffect(() => {
    // Only apply zoom if image is loaded
    if (originalImage && fabricCanvas) {
      handleZoom();
    }
  }, [zoom, originalImage, fabricCanvas]);

  const handleReset = () => {
    if (!originalImage || !fabricCanvas) return;

    // Reset all properties
    setIsGrayscale(false);
    setZoom([100]);
    setBrightness([0]);
    setContrast([0]);

    // Reset image filters
    const imgElement = originalImage.getElement();
    if (imgElement) {
      imgElement.style.filter = '';
    }
    
    // Reset scale to fit canvas
    const scale = Math.min(
      fabricCanvas.width! / originalImage.width!,
      fabricCanvas.height! / originalImage.height!
    );
    
    originalImage.set({
      scaleX: scale,
      scaleY: scale,
    });

    fabricCanvas.centerObject(originalImage);
    fabricCanvas.renderAll();
    toast.success("Image reset to original");
  };

  const handleSave = () => {
    console.log('Save button clicked');
    console.log('fabricCanvas state:', fabricCanvas);
    console.log('originalImage state:', originalImage);
    
    if (!fabricCanvas) {
      console.error('No fabric canvas available');
      toast.error("Canvas not ready. Please wait for the image to load.");
      return;
    }

    if (!originalImage) {
      console.error('No original image available');
      toast.error("No image loaded to save.");
      return;
    }

    try {
      console.log('Converting canvas to data URL...');
      // Convert canvas to data URL and then to blob
      const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1.0,
        multiplier: 1
      });
      
      console.log('Data URL created, length:', dataURL.length);

      // Convert data URL to blob
      fetch(dataURL)
        .then(res => {
          console.log('Converting to blob...');
          return res.blob();
        })
        .then(blob => {
          console.log('Blob created, size:', blob.size);
          onSave(blob);
          toast.success("Image saved successfully!");
          onClose();
        })
        .catch((error) => {
          console.error('Error converting to blob:', error);
          toast.error("Failed to save image");
        });
    } catch (error) {
      console.error('Error in handleSave:', error);
      toast.error("Failed to save image");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
          <DialogDescription>
            Adjust your image with filters, zoom, and color effects. Drag the image to reposition it. Click Save Changes when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Canvas */}
          <div className="flex justify-center">
            <div className="border border-border rounded-lg overflow-hidden">
              <canvas ref={canvasRef} className="max-w-full" />
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Color Controls */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Color & Effects</h3>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={isGrayscale ? "default" : "outline"}
                  onClick={() => setIsGrayscale(!isGrayscale)}
                  className="flex items-center gap-2"
                >
                  <Palette size={16} />
                  Black & White
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Brightness: {brightness[0]}%</label>
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  min={-100}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Contrast: {contrast[0]}%</label>
                <Slider
                  value={contrast}
                  onValueChange={setContrast}
                  min={-100}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Size Controls */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Size & Zoom</h3>
              
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Zoom: {zoom[0]}%</label>
                <Slider
                  value={zoom}
                  onValueChange={setZoom}
                  min={10}
                  max={300}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setZoom([Math.min(300, zoom[0] + 10)])}
                  className="flex items-center gap-2"
                >
                  <ZoomIn size={16} />
                  Zoom In
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setZoom([Math.max(10, zoom[0] - 10)])}
                  className="flex items-center gap-2"
                >
                  <ZoomOut size={16} />
                  Zoom Out
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reset
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                className="flex items-center gap-2"
                disabled={isImageLoading || !fabricCanvas || !originalImage}
              >
                <Save size={16} />
                {isImageLoading ? "Loading..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageEditor;