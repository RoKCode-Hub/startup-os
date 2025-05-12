
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import PodcastUploadForm from "@/components/PodcastUploadForm";
import { useAuthStore } from "@/stores/authStore";

const Podcast = () => {
  const { isAuthenticated } = useAuthStore();
  const [episodes] = useState([
    {
      id: 1,
      title: "Founding a Tech Startup",
      description: "We talk with successful founders about the challenges of starting a tech company.",
      duration: "45:23",
      date: "May 2, 2025",
      guests: "Emily White, CEO of TechLaunch"
    },
    {
      id: 2,
      title: "Venture Capital Insights",
      description: "Understanding how VCs evaluate startups and what they look for in founders.",
      duration: "51:07",
      date: "April 25, 2025",
      guests: "Mark Johnson, Partner at Horizon Ventures"
    },
    {
      id: 3,
      title: "Building Remote Teams",
      description: "How to build and manage highly effective remote teams across time zones.",
      duration: "38:15",
      date: "April 18, 2025",
      guests: "Lisa Chen, COO of DistantWork"
    },
    {
      id: 4,
      title: "Product Market Fit",
      description: "Strategies for finding product market fit and iterating based on user feedback.",
      duration: "42:31",
      date: "April 11, 2025",
      guests: "James Miller, Product Lead at GrowthOS"
    },
    {
      id: 5,
      title: "Startup Legal Essentials",
      description: "Key legal considerations every founder should know about when starting a company.",
      duration: "47:52",
      date: "April 4, 2025",
      guests: "Sarah Thompson, Tech Startup Attorney"
    }
  ]);

  const [activeEpisode, setActiveEpisode] = useState<number | null>(null);

  const togglePlay = (id: number) => {
    if (activeEpisode === id) {
      setActiveEpisode(null);
    } else {
      setActiveEpisode(id);
    }
  };

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
          {/* Listen on platforms buttons */}
          <div className="flex flex-wrap justify-center gap-6 mb-16 mt-8">
            <a 
              href="https://podcasts.apple.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105"
            >
              <img 
                src="/lovable-uploads/05f93660-2a5f-490e-b2cc-4edcdabdc38c.png" 
                alt="Listen on Apple Podcasts" 
                className="h-12"
              />
            </a>
            <a 
              href="https://spotify.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105"
            >
              <img 
                src="/lovable-uploads/0284a6f9-70a6-4651-9fe4-d1e194989d2c.png" 
                alt="Listen on Spotify" 
                className="h-12"
              />
            </a>
          </div>
          
          <div className="space-y-6">
            {episodes.map((episode) => (
              <Card key={episode.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-48 bg-gray-100 flex-shrink-0"></div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold mb-2">{episode.title}</h3>
                        <span className="text-sm text-gray-600">{episode.date}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{episode.description}</p>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <span className="mr-4">Guests: {episode.guests}</span>
                        <span>Duration: {episode.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => togglePlay(episode.id)}
                        >
                          {activeEpisode === episode.id ? (
                            <>
                              <Pause size={16} />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play size={16} />
                              Play
                            </>
                          )}
                        </Button>
                        <a href={`#episode-${episode.id}`} className="ml-4 text-black font-medium hover:underline">
                          Show Notes
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Podcast;
