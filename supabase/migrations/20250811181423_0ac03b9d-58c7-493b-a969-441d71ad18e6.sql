-- Create podcasts storage bucket (public read)
insert into storage.buckets (id, name, public)
values ('podcasts', 'podcasts', true)
on conflict (id) do nothing;

-- Storage policies for podcasts bucket
-- Public can read files in podcasts bucket
create policy if not exists "Public read access to podcasts bucket"
on storage.objects
for select
using (bucket_id = 'podcasts');

-- Authenticated users can upload to their own folder (prefix = user id)
create policy if not exists "Users can upload to their own folder in podcasts bucket"
on storage.objects
for insert
with check (
  bucket_id = 'podcasts'
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can update their own files in podcasts bucket
create policy if not exists "Users can update their own files in podcasts bucket"
on storage.objects
for update
using (
  bucket_id = 'podcasts'
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own files in podcasts bucket
create policy if not exists "Users can delete their own files in podcasts bucket"
on storage.objects
for delete
using (
  bucket_id = 'podcasts'
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Create podcast_episodes table
create table if not exists public.podcast_episodes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  guests text,
  duration text,
  audio_url text not null,
  audio_path text not null,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.podcast_episodes enable row level security;

-- RLS policies
create policy if not exists "Public can view published episodes"
on public.podcast_episodes
for select
using (published = true);

create policy if not exists "Users can view their own episodes"
on public.podcast_episodes
for select
to authenticated
using (auth.uid() = user_id);

create policy if not exists "Users can insert their own episodes"
on public.podcast_episodes
for insert
with check (auth.uid() = user_id);

create policy if not exists "Users can update their own episodes"
on public.podcast_episodes
for update
using (auth.uid() = user_id);

create policy if not exists "Users can delete their own episodes"
on public.podcast_episodes
for delete
using (auth.uid() = user_id);

-- Timestamp trigger function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for podcast_episodes
drop trigger if exists update_podcast_episodes_updated_at on public.podcast_episodes;
create trigger update_podcast_episodes_updated_at
before update on public.podcast_episodes
for each row
execute function public.update_updated_at_column();

-- Enable realtime for podcast_episodes
alter publication supabase_realtime add table public.podcast_episodes;