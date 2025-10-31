import { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, FabricImage } from 'fabric';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ZoomIn, ZoomOut, Palette, Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [zoom, setZoom] = useState([100]);
  const [brightness, setBrightness] = useState([0]);
  const [contrast, setContrast] = useState([0]);
  const [initialScale, setInitialScale] = useState(1);

  // Initialize canvas and load image
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 600,
      height: 400,
      backgroundColor: '#f5f5f5',
    });

    setFabricCanvas(canvas);
    setIsLoading(true);

    FabricImage.fromURL(imageUrl, { crossOrigin: 'anonymous' })
      .then((img) => {
        const scale = Math.min(
          canvas.width! / img.width!,
          canvas.height! / img.height!
        );
        
        setInitialScale(scale);
        
        img.set({
          scaleX: scale,
          scaleY: scale,
          left: (canvas.width! - img.width! * scale) / 2,
          top: (canvas.height! - img.height! * scale) / 2,
          selectable: true,
          hasControls: false,
          hasBorders: true,
          lockRotation: true,
        });

        canvas.add(img);
        canvas.centerObject(img);
        setOriginalImage(img);
        canvas.renderAll();
        setIsLoading(false);
        toast.success("Image loaded! Drag to reposition.");
      })
      .catch((error) => {
        console.error('Error loading image:', error);
        setIsLoading(false);
        toast.error("Failed to load image");
      });

    return () => {
      canvas.dispose();
      setFabricCanvas(null);
      setOriginalImage(null);
      setIsLoading(false);
    };
  }, [imageUrl, isOpen]);

  // Apply filters
  useEffect(() => {
    if (!originalImage || !fabricCanvas) return;

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

    const imgElement = originalImage.getElement();
    if (imgElement) {
      imgElement.style.filter = cssFilters.join(' ');
    }

    fabricCanvas.renderAll();
  }, [isGrayscale, brightness, contrast, originalImage, fabricCanvas]);

  // Apply zoom
  useEffect(() => {
    if (!originalImage || !fabricCanvas) return;

    const zoomLevel = zoom[0] / 100;
    const newScale = initialScale * zoomLevel;
    
    originalImage.set({
      scaleX: newScale,
      scaleY: newScale,
    });
    fabricCanvas.renderAll();
  }, [zoom, originalImage, fabricCanvas, initialScale]);

  const handleReset = () => {
    if (!originalImage || !fabricCanvas) return;

    setIsGrayscale(false);
    setZoom([100]);
    setBrightness([0]);
    setContrast([0]);

    const imgElement = originalImage.getElement();
    if (imgElement) {
      imgElement.style.filter = '';
    }
    
    originalImage.set({
      scaleX: initialScale,
      scaleY: initialScale,
    });

    fabricCanvas.centerObject(originalImage);
    fabricCanvas.renderAll();
    toast.success("Reset to original");
  };

  const handleSave = () => {
    if (!fabricCanvas || !originalImage) {
      toast.error("Canvas not ready");
      return;
    }

    try {
      const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1.0,
        multiplier: 1
      });

      fetch(dataURL)
        .then(res => res.blob())
        .then(blob => {
          onSave(blob);
          toast.success("Image saved!");
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
            Drag to reposition. Adjust filters and zoom. Click Save Changes when done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-center relative">
            <div className="border border-border rounded-lg overflow-hidden">
              <canvas ref={canvasRef} className="max-w-full" />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div className="text-center space-y-2">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                    <p className="text-sm text-muted-foreground">Loading image...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Color & Effects</h3>
              
              <Button
                size="sm"
                variant={isGrayscale ? "default" : "outline"}
                onClick={() => setIsGrayscale(!isGrayscale)}
                className="flex items-center gap-2"
              >
                <Palette size={16} />
                Black & White
              </Button>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Brightness: {brightness[0]}%</label>
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  min={-100}
                  max={100}
                  step={1}
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
                />
              </div>
            </div>

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
                disabled={isLoading || !fabricCanvas || !originalImage}
              >
                <Save size={16} />
                {isLoading ? "Loading..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageEditor;
