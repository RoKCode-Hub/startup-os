import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBlogStore } from '@/stores/blogStore';
import { useAuthStore } from '@/stores/authStore';
import { FilePen, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: string;
  guests: string;
  audio_url: string;
  created_at: string;
}

const Content = () => {
  const navigate = useNavigate();
  const { posts } = useBlogStore();
  const { isAuthenticated, user } = useAuthStore();
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([]);

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
      setPodcastEpisodes(data || []);
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

            {isAuthenticated && user?.role === 'admin' && (
              <div className="flex justify-center gap-4 mb-8">
                <Button 
                  onClick={() => navigate('/blog/new')}
                  className="flex items-center gap-2"
                >
                  <FilePen className="w-4 h-4" />
                  New Blog Post
                </Button>
              </div>
            )}

            <div className="grid gap-6 md:gap-8">
              {allContent.map((item) => (
                <Card 
                  key={`${item.type}-${item.id}`}
                  className="group hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {item.type === 'blog' ? (
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FilePen className="w-6 h-6 text-primary" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-accent1/10 flex items-center justify-center">
                            <Play className="w-6 h-6 text-accent1" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.type === 'blog' 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-accent1/10 text-accent1'
                          }`}>
                            {item.type === 'blog' ? 'Blog Post' : 'Podcast'}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(getDisplayDate(item))}
                          </span>
                          {item.type === 'podcast' && item.duration && (
                            <span className="text-sm text-muted-foreground">
                              {item.duration}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {item.type === 'blog' ? item.excerpt : item.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                  </CardContent>
                </Card>
              ))}
            </div>

            {allContent.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No content available yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Content;