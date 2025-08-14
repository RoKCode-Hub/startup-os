
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
}

const initialPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications",
    excerpt: "Learn how to build scalable web applications using the latest technologies.",
    content: "This is a detailed article about building modern web applications...",
    author: "Jane Smith",
    date: "May 1, 2025",
    category: "Development",
    tags: ["Product", "Operations"]
  },
  {
    id: 2,
    title: "Design Principles for Startups",
    excerpt: "Effective design principles that every startup should follow to create impactful products.",
    content: "Design principles are essential for creating products that users love...",
    author: "Mike Johnson",
    date: "April 25, 2025",
    category: "Design",
    tags: ["Product", "Strategy"]
  },
  {
    id: 3,
    title: "The Future of AI in Business",
    excerpt: "How artificial intelligence is transforming business operations and creating new opportunities.",
    content: "Artificial intelligence is revolutionizing how businesses operate...",
    author: "Sarah Lee",
    date: "April 18, 2025",
    category: "AI",
    tags: ["Strategy", "Operations"]
  },
  {
    id: 4,
    title: "Optimizing Your Tech Stack",
    excerpt: "Tips and strategies for choosing the right technologies for your startup.",
    content: "Choosing the right technologies for your startup is crucial...",
    author: "David Chen",
    date: "April 10, 2025",
    category: "Technology",
    tags: ["Operations", "Product"]
  },
  {
    id: 5,
    title: "User-Centered Design Approach",
    excerpt: "How focusing on user needs can drive better product decisions and business outcomes.",
    content: "User-centered design is all about putting the user first...",
    author: "Alex Rivera",
    date: "April 5, 2025",
    category: "Design",
    tags: ["Product", "Marketing"]
  },
  {
    id: 6,
    title: "Scaling Your Startup",
    excerpt: "Key insights for growing your startup while maintaining product quality and team culture.",
    content: "Scaling a startup comes with unique challenges and opportunities...",
    author: "Chris Taylor",
    date: "March 28, 2025",
    category: "Business",
    tags: ["Strategy", "People", "Finance"]
  }
];

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
      deletePost: (id) => set((state) => ({
        posts: state.posts.filter((post) => post.id !== id)
      })),
      getPostById: (id) => get().posts.find((post) => post.id === id),
    }),
    {
      name: 'blog-storage',
    }
  )
);
