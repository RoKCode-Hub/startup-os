
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
}

interface BlogStore {
  posts: BlogPost[];
  addPost: (post: BlogPost) => void;
  editPost: (id: number, updatedPost: Partial<BlogPost>) => void;
  deletePost: (id: number) => void;
  getPostById: (id: number) => BlogPost | undefined;
  clearAllPosts: () => void;
}

const initialPosts: BlogPost[] = [];

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      posts: initialPosts,
      addPost: (post) => set((state) => ({ 
        posts: [post, ...state.posts] 
      })),
      editPost: (id, updatedPost) => set((state) => ({
        posts: state.posts.map((post) => 
          post.id === id ? { ...post, ...updatedPost } : post
        )
      })),
      deletePost: (id) => {
        console.log('Deleting post with id:', id);
        set((state) => {
          const newPosts = state.posts.filter((post) => post.id !== id);
          console.log('Posts after delete:', newPosts.length, 'posts remaining');
          return { posts: newPosts };
        });
      },
      getPostById: (id) => get().posts.find((post) => post.id === id),
      clearAllPosts: () => set({ posts: [] }),
    }),
    {
      name: 'blog-storage',
    }
  )
);
