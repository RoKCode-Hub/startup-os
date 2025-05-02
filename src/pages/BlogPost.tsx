
import { useParams, useNavigate } from "react-router-dom";
import { useBlogStore } from "@/stores/blogStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById } = useBlogStore();
  
  const post = getPostById(Number(id));
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 container mx-auto px-6 lg:px-10">
          <div className="max-w-4xl mx-auto py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/blog")}>
              Return to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate("/blog")}
              className="mb-6 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
            
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
              <div className="flex items-center justify-between mb-8 text-gray-600">
                <span>{post.category}</span>
                <span className="mx-2">•</span>
                <span>By {post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
              </div>
            </div>
            
            <div className="h-64 bg-gray-100 mb-8 rounded">
              {/* Post featured image would go here */}
            </div>
            
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{post.content}</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
