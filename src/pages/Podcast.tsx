import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import PodcastUploadForm from "@/components/PodcastUploadForm";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/integrations/supabase/client";

interface Episode {
  id: string;
  title: string;
  description: string | null;
  guests: string | null;
  duration: string | null;
  created_at: string;
  audio_url: string;
}

const Podcast = () => {
  const { isAuthenticated } = useAuthStore();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEpisodes = async () => {
      const { data, error } = await supabase
        .from('podcast_episodes')
        .select('id, title, description, guests, duration, created_at, audio_url')
        .eq('published', true)
        .order('created_at', { ascending: false });
      if (!error && data) setEpisodes(data as any);
      setLoading(false);
    };
    loadEpisodes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        {isAuthenticated && (
          <Section
            id="podcast-upload"
            title="Upload Podcast"
            description="Add a new episode to the Startup OS Podcast"
            className="py-10"
          >
            <PodcastUploadForm />
          </Section>
        )}

        <Section
          id="podcast-header"
          title="Startup OS Podcast"
          description="Conversations with founders, investors, and experts about building successful startups"
          className={isAuthenticated ? "pt-0" : "pt-16"}
        >
          <div className="space-y-6">
            {loading ? (
              <p>Loading episodes...</p>
            ) : episodes.length === 0 ? (
              <p>No episodes yet. Check back soon!</p>
            ) : (
              episodes.map((episode) => (
                <Card key={episode.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-48 bg-gray-100 flex-shrink-0"></div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold mb-2">{episode.title}</h3>
                          <span className="text-sm text-gray-600">
                            {new Date(episode.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {episode.description && (
                          <p className="text-gray-700 mb-4">{episode.description}</p>
                        )}
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          {episode.guests && <span className="mr-4">Guests: {episode.guests}</span>}
                          {episode.duration && <span>Duration: {episode.duration}</span>}
                        </div>
                        <audio controls src={episode.audio_url} className="mt-2 w-full" preload="none" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default Podcast;
