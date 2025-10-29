
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/stores/blogStore";
import { useAuthStore } from "@/stores/authStore";
import { FilePen, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

const Blog = () => {
  const navigate = useNavigate();
  const { posts, deletePost, clearAllPosts } = useBlogStore();
  const { isAuthenticated, user } = useAuthStore();
  const isAdmin = isAuthenticated && !!user;
  const [deletingBlogId, setDeletingBlogId] = useState<number | null>(null);
  
  console.log('Blog page - Current posts count:', posts.length);

  const handleDeleteBlogPost = () => {
    if (deletingBlogId) {
      deletePost(deletingBlogId);
      setDeletingBlogId(null);
      toast({
        title: "Blog post deleted",
        description: "The blog post has been successfully deleted.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <Section
          id="blog-header"
          title="Our Blog"
          description="Insights, thoughts and stories about startup development, design and technology"
          className="pt-16"
        >
          {isAdmin && (
            <div className="flex justify-end mb-8 gap-2">
              <Button 
                onClick={() => {
                  clearAllPosts();
                  toast({
                    title: "All posts cleared",
                    description: "All blog posts have been removed from storage.",
                  });
                }} 
                variant="outline"
                className="flex items-center gap-2"
              >
                Clear All
              </Button>
              <Button onClick={() => navigate("/blog/new")} className="flex items-center gap-2">
                <FilePen className="h-4 w-4" />
                New Post
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="h-48 bg-gray-100"></div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">{post.category}</span>
                    <span className="text-sm text-gray-600">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">By {post.author}</span>
                    <div className="flex items-center gap-2">
                      {isAdmin && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/blog/edit/${post.id}`)}
                            className="flex items-center gap-1"
                          >
                            <FilePen className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeletingBlogId(post.id)}
                            className="flex items-center gap-1 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                      <button 
                        onClick={() => navigate(`/blog/post/${post.id}`)} 
                        className="text-black font-medium hover:underline"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </main>
      
      <AlertDialog open={!!deletingBlogId} onOpenChange={() => setDeletingBlogId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBlogPost} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default Blog;
