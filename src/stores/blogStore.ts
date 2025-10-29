import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  category: string[];
  tags: string[];
  published?: boolean;
}

interface BlogStore {
  posts: BlogPost[];
  loading: boolean;
  fetchPosts: () => Promise<void>;
  addPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  editPost: (id: string, updatedPost: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPostById: (id: string) => BlogPost | undefined;
}

export const useBlogStore = create<BlogStore>()((set, get) => ({
  posts: [],
  loading: false,
  
  fetchPosts: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      set({ 
        posts: (data || []).map(post => ({
          id: post.id,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          author: post.author,
          date: post.date,
          category: post.category,
          tags: post.tags || [],
          published: post.published
        }))
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      set({ loading: false });
    }
  },
  
  addPost: async (post) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          user_id: user.id,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          author: post.author,
          date: post.date,
          category: post.category,
          tags: post.tags,
          published: post.published ?? true
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Refresh posts after adding
      await get().fetchPosts();
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  },
  
  editPost: async (id, updatedPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update(updatedPost)
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      set((state) => ({
        posts: state.posts.map((post) => 
          post.id === id ? { ...post, ...updatedPost } : post
        )
      }));
    } catch (error) {
      console.error('Error editing post:', error);
      throw error;
    }
  },
  
  deletePost: async (id) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },
  
  getPostById: (id) => get().posts.find((post) => post.id === id),
}));
