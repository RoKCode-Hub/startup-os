import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useBlogStore } from '@/stores/blogStore';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon } from 'lucide-react';
import { format, parse } from 'date-fns';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  "Leadership",
  "Execution",
  "Direction",
  "Collaboration",
  "Systems Processes and Structure",
  "Data"
];

const BlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, editPost } = useBlogStore();
  const { toast } = useToast();
  
  const post = getPostById(id!);
  
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
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

  useEffect(() => {
    if (!post) {
      navigate('/blog');
      return;
    }
    
    setTitle(post.title);
    setCategories(Array.isArray(post.category) ? post.category : [post.category]);
    setExcerpt(post.excerpt);
    setContent(post.content);
    
    // Parse the existing date string
    try {
      const parsedDate = parse(post.date, 'MMMM d, yyyy', new Date());
      setPublishDate(parsedDate);
    } catch (error) {
      console.error('Error parsing date:', error);
      setPublishDate(new Date());
    }
  }, [post, navigate]);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
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
            quill.insertEmbed(index, 'image', reader.result as string, 'user');
            quill.setSelection(index + 1, 0, 'user');
          }
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    },
    ...(imageResizeEnabled ? { imageResize: {} } : {}),
    clipboard: { matchVisual: false }
  }), [imageResizeEnabled]);

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block',
    'link', 'image'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !excerpt.trim() || categories.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and select at least one category.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await editPost(id!, {
        title: title.trim(),
        category: categories,
        excerpt: excerpt.trim(),
        content,
        date: format(publishDate, 'MMMM d, yyyy'),
      });

      toast({
        title: "Success!",
        description: "Blog post updated successfully.",
      });

      navigate(`/blog/post/${id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive",
      });
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

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Edit Blog Post</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/blog')}
            >
              Cancel
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog post title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="block text-sm font-medium mb-3">
                Categories (select at least one)
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border rounded-lg">
                {CATEGORIES.map((cat) => (
                  <div key={cat} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-edit-${cat}`}
                      checked={categories.includes(cat)}
                      onCheckedChange={() => toggleCategory(cat)}
                    />
                    <label
                      htmlFor={`category-edit-${cat}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Enter a brief excerpt"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publishDate">Publish Date</Label>
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

            <div className="space-y-2">
              <Label>Content *</Label>
              <div className="min-h-[400px]">
                <ReactQuill
                  key={imageResizeEnabled ? 'quill-with-resize' : 'quill-no-resize'}
                  ref={quillRef}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your blog post content here..."
                  className="bg-background rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-8">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/blog')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Post'}
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogEdit;