import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBlogStore } from '@/stores/blogStore';
import { useAuthStore } from '@/stores/authStore';
import { FilePen, Play, Filter, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import PodcastUploadForm from '@/components/PodcastUploadForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PodcastEditForm from '@/components/PodcastEditForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: string;
  guests: string;
  audio_url: string;
  created_at: string;
  tags?: string[];
}

const STARTUP_OS_TAGS = [
  "Strategy",
  "People", 
  "Operations",
  "Product",
  "Marketing",
  "Finance"
];

const Content = () => {
  const navigate = useNavigate();
  const { posts, deletePost } = useBlogStore();
  const { isAuthenticated, user } = useAuthStore();
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([]);
  const [contentTypeFilter, setContentTypeFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [showPodcastUpload, setShowPodcastUpload] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<PodcastEpisode | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<number | null>(null);

  useEffect(() => {
    fetchPodcastEpisodes();
  }, []);

  const fetchPodcastEpisodes = async () => {
    try {
      const { data, error } = await supabase
        .from('podcast_episodes')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Add mock tags to podcast episodes for demo
      const episodesWithTags = (data || []).map((episode, index) => ({
        ...episode,
        tags: STARTUP_OS_TAGS.slice(index % 3, (index % 3) + 2) // Assign 2 tags to each episode
      }));
      
      setPodcastEpisodes(episodesWithTags);
    } catch (error) {
      console.error('Error fetching podcast episodes:', error);
    }
  };

  // Combine and sort all content by date
  const allContent = [
    ...posts.map(post => ({
      ...post,
      type: 'blog' as const,
      sortDate: new Date(post.date)
    })),
    ...podcastEpisodes.map(episode => ({
      ...episode,
      type: 'podcast' as const,
      sortDate: new Date(episode.created_at)
    }))
  ].sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());

  // Apply filters
  const filteredContent = allContent.filter(item => {
    const matchesContentType = contentTypeFilter === "all" || item.type === contentTypeFilter;
    const matchesTag = tagFilter === "all" || (item.tags && item.tags.includes(tagFilter));
    return matchesContentType && matchesTag;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDisplayDate = (item: typeof allContent[0]) => {
    return item.type === 'blog' ? item.date : item.created_at;
  };

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Navbar />
      
      <main className="pt-24">
        <div className="py-16">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent1 to-accent2 bg-clip-text text-transparent">
                All Content
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our complete collection of blog posts and podcast episodes
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="min-w-[160px]">
                  <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
                    <SelectTrigger className="bg-background border-border z-50">
                      <SelectValue placeholder="Content Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border shadow-lg z-50">
                      <SelectItem value="all">All Content</SelectItem>
                      <SelectItem value="blog">Blog Posts</SelectItem>
                      <SelectItem value="podcast">Podcasts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="min-w-[160px]">
                  <Select value={tagFilter} onValueChange={setTagFilter}>
                    <SelectTrigger className="bg-background border-border z-50">
                      <SelectValue placeholder="Startup OS Tag" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border shadow-lg z-50">
                      <SelectItem value="all">All Tags</SelectItem>
                      {STARTUP_OS_TAGS.map(tag => (
                        <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground flex items-center">
                {filteredContent.length} item{filteredContent.length !== 1 ? 's' : ''} found
              </div>
            </div>

            {isAuthenticated && (
              <div className="flex justify-center gap-4 mb-8">
                <Button 
                  onClick={() => navigate('/blog/new')}
                  className="flex items-center gap-2"
                >
                  <FilePen className="w-4 h-4" />
                  New Blog Post
                </Button>
                
                <Dialog open={showPodcastUpload} onOpenChange={setShowPodcastUpload}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Upload Podcast
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Upload New Podcast Episode</DialogTitle>
                    </DialogHeader>
                    <PodcastUploadForm />
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {/* Podcast Edit Modal */}
            <Dialog open={!!editingEpisode} onOpenChange={() => setEditingEpisode(null)}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Podcast Episode</DialogTitle>
                </DialogHeader>
                {editingEpisode && (
                  <PodcastEditForm
                    episode={editingEpisode}
                    onSuccess={() => {
                      setEditingEpisode(null);
                      fetchPodcastEpisodes(); // Refresh the episodes list
                    }}
                    onCancel={() => setEditingEpisode(null)}
                  />
                )}
              </DialogContent>
            </Dialog>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {filteredContent.map((item) => (
                <Card 
                  key={`${item.type}-${item.id}`}
                  className="group hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20 h-full flex flex-col"
                >
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex-shrink-0">
                        {item.type === 'blog' ? (
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FilePen className="w-5 h-5 text-primary" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-accent1/10 flex items-center justify-center">
                            <Play className="w-5 h-5 text-accent1" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.type === 'blog' 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-accent1/10 text-accent1'
                          }`}>
                            {item.type === 'blog' ? 'Blog Post' : 'Podcast'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(getDisplayDate(item))}
                          </span>
                          {item.type === 'podcast' && item.duration && (
                            <span className="text-xs text-muted-foreground">
                              {item.duration}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">
                          {item.type === 'blog' ? item.excerpt : item.description}
                        </p>
                        
                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.tags.map(tag => (
                              <Badge 
                                key={tag} 
                                variant="secondary" 
                                className="text-xs bg-secondary/50 hover:bg-secondary/70 cursor-pointer px-2 py-1"
                                onClick={() => setTagFilter(tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {item.type === 'blog' ? (
                              <>
                                <span>By {item.author}</span>
                                {item.category && (
                                  <>
                                    <span>•</span>
                                    <span>{item.category}</span>
                                  </>
                                )}
                              </>
                            ) : (
                              item.guests && <span>Guests: {item.guests}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {isAuthenticated && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    if (item.type === 'blog') {
                                      navigate(`/blog/edit/${item.id}`);
                                    } else {
                                      setEditingEpisode(item as PodcastEpisode);
                                    }
                                  }}
                                  className="flex items-center gap-1"
                                >
                                  <FilePen className="h-3 w-3" />
                                  Edit
                                </Button>
                                {item.type === 'blog' && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setDeletingBlogId(item.id)}
                                    className="flex items-center gap-1 text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                if (item.type === 'blog') {
                                  navigate(`/blog/post/${item.id}`);
                                } else {
                                  navigate('/podcast');
                                }
                              }}
                            >
                              {item.type === 'blog' ? 'Read More' : 'Listen Now'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredContent.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No content found matching your filters. Try adjusting your selection.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setContentTypeFilter("all");
                    setTagFilter("all");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
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

export default Content;