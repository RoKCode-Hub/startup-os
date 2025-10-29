
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { FilePen, CalendarIcon } from "lucide-react";
import { useBlogStore } from "@/stores/blogStore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Leadership",
  "Execution",
  "Direction",
  "Collaboration",
  "Systems Processes and Structure",
  "Data"
];

const BlogEditor = () => {
  const navigate = useNavigate();
  const { addPost } = useBlogStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [publishDate, setPublishDate] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageResizeEnabled, setImageResizeEnabled] = useState(false);

  const quillRef = useRef<ReactQuill | null>(null);

  // Register image resize module once on client and avoid race conditions
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const Quill = (await import('quill')).default;
        if (!mounted) return;
        (window as any).Quill = Quill;
        const mod: any = await import('quill-image-resize-module');
        const ImageResize = mod?.default ?? mod;
        Quill.register('modules/imageResize', ImageResize);
        if (mounted) setImageResizeEnabled(true);
      } catch (e) {
        console.error('Failed to set up Quill image resize:', e);
        if (mounted) setImageResizeEnabled(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const quill = quillRef.current?.getEditor?.();
          const range = quill?.getSelection(true);
          if (quill) {
            const index = range ? range.index : 0;
            quill.insertEmbed(index, "image", reader.result as string, "user");
            quill.setSelection(index + 1, 0, "user");
          }
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
      ],
      handlers: { image: imageHandler },
    },
    ...(imageResizeEnabled ? { imageResize: {} } : {}),
    clipboard: { matchVisual: false },
  }), [imageResizeEnabled]);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !excerpt.trim() || categories.length === 0) {
      toast.error("Please fill in all fields and select at least one category");
      return;
    }
    
    setIsSubmitting(true);
    
    const newPost = {
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt.trim(),
      category: categories,
      author: "Admin", // Default author, could be made dynamic
      date: format(publishDate, 'MMMM d, yyyy'),
      tags: [] // Default empty tags, could be enhanced with tag selection
    };
    
    try {
      await addPost(newPost);
      toast.success("Blog post published successfully!");
      navigate("/blog");
    } catch (error) {
      console.error("Error publishing post:", error);
      toast.error("Failed to publish post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCategory = (category: string) => {
    setCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center gap-3">
              <FilePen className="h-6 w-6" />
              <h1 className="text-3xl font-bold">Create New Blog Post</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  className="w-full"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium mb-3">
                  Categories (select at least one)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border rounded-lg">
                  {CATEGORIES.map((cat) => (
                    <div key={cat} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${cat}`}
                        checked={categories.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                      />
                      <label
                        htmlFor={`category-${cat}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="publishDate" className="block text-sm font-medium mb-2">
                  Publish Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="publishDate"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !publishDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {publishDate ? format(publishDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={publishDate}
                      onSelect={(date) => date && setPublishDate(date)}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                  Excerpt
                </label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of your post (displayed in post cards)"
                  className="w-full h-24"
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Content
                </label>
                <div id="content">
                  <ReactQuill
                    key={imageResizeEnabled ? 'quill-with-resize' : 'quill-no-resize'}
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    className="bg-background rounded-md"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/blog")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Publishing..." : "Publish Post"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogEditor;
