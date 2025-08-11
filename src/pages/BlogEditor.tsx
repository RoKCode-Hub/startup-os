
import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FilePen } from "lucide-react";
import { useBlogStore } from "@/stores/blogStore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogEditor = () => {
  const navigate = useNavigate();
  const { addPost } = useBlogStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quillRef = useRef<ReactQuill | null>(null);

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
    clipboard: { matchVisual: false },
  }), []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !excerpt.trim() || !category.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt.trim(),
      category: category.trim(),
      author: "Admin", // Default author, could be made dynamic
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      }),
    };
    
    try {
      addPost(newPost);
      toast.success("Blog post published successfully!");
      navigate("/blog");
    } catch (error) {
      console.error("Error publishing post:", error);
      toast.error("Failed to publish post");
    } finally {
      setIsSubmitting(false);
    }
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
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category
                </label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="E.g. Development, Design, Technology"
                  className="w-full"
                />
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
