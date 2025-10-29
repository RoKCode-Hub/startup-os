-- Update blog_posts table to support multiple categories
ALTER TABLE public.blog_posts 
ALTER COLUMN category TYPE text[] USING ARRAY[category];

-- Update the column to be non-nullable with default empty array
ALTER TABLE public.blog_posts 
ALTER COLUMN category SET DEFAULT '{}';