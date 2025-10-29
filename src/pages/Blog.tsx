
import { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const navigate = useNavigate();
  const { posts, fetchPosts, deletePost, loading } = useBlogStore();
  const { isAuthenticated, user } = useAuthStore();
  const isAdmin = isAuthenticated && !!user;
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDeleteBlogPost = async () => {
    if (deletingBlogId) {
      await deletePost(deletingBlogId);
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
            <div className="flex justify-end mb-8">
              <Button onClick={() => navigate("/blog/new")} className="flex items-center gap-2">
                <FilePen className="h-4 w-4" />
                New Post
              </Button>
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No blog posts yet.</p>
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card 
                key={post.id} 
                className="group overflow-hidden border-2 border-gray-200 hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white rounded-xl hover:-translate-y-1"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-wrap gap-2">
                      {post.category.map((cat, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-muted-foreground">{post.date}</span>
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/blog/post/${post.id}`)} 
                        className="font-medium border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        Read More
                      </Button>
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
