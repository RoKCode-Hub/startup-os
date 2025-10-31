
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HexagonSection from "@/components/HexagonSection";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import AboutUsImageUpload from "@/components/AboutUsImageUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBlogStore } from "@/stores/blogStore";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { posts, fetchPosts } = useBlogStore();
  const navigate = useNavigate();
  const [aboutUsImage, setAboutUsImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Load about us image on component mount
  useEffect(() => {
    fetchPosts();
    
    const loadAboutUsImage = async () => {
      try {
        const { data } = await supabase.storage
          .from('about-us')
          .list('', {
            limit: 1,
            sortBy: { column: 'created_at', order: 'desc' }
          });
        
        if (data && data.length > 0) {
          const { data: { publicUrl } } = supabase.storage
            .from('about-us')
            .getPublicUrl(data[0].name);
          setAboutUsImage(publicUrl);
        }
      } catch (error) {
        console.error('Error loading about us image:', error);
      }
    };

    loadAboutUsImage();
  }, [fetchPosts]);
  
  // Get the latest 3 posts
  const latestPosts = posts.slice(0, 3);
  
  // Fetch real podcast episodes from database
  const [podcastEpisodes, setPodcastEpisodes] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchPodcasts = async () => {
      const { data } = await supabase
        .from('podcast_episodes')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (data) {
        setPodcastEpisodes(data.map(ep => ({
          id: ep.id,
          title: ep.title,
          description: ep.description,
          duration: ep.duration,
          date: new Date(ep.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          guests: ep.guests
        })));
      }
    };
    
    fetchPodcasts();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
        body: data,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form without scrolling
      requestAnimationFrame(() => {
        e.currentTarget.reset();
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <Section 
        id="about" 
        title="About Us"
        nextSectionId="support"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <p className="text-lg mb-6 leading-relaxed opacity-80">
              Your company is growing and so is the time you spend managing and putting out internal fires.
            </p>
            <p className="text-lg mb-8 leading-relaxed opacity-80">
              We have been working with and in startups since 2015. We have seen first-hand the leverage of having the right operating system. It frees up time so that you can focus on growth and your customers. Therefore, we have founded Startup OS. To share hands on knowledge from founders and operators.
            </p>
             <p className="text-lg mb-10 leading-relaxed opacity-80">
              Proven. Practical. Scalable.
            </p>
            <Button className="mt-4 rounded-full px-8 py-6 bg-accent1 hover:bg-accent1/90 text-white font-medium">
              Learn More
            </Button>
          </div>
          <div className="order-1 md:order-2 relative">
            <AboutUsImageUpload 
              onImageChange={setAboutUsImage} 
              currentImageUrl={aboutUsImage}
            />
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-elegant flex items-center justify-center w-3/4">
              {aboutUsImage ? (
                <img 
                  src={aboutUsImage} 
                  alt="About Us" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </Section>
      
      {/* Separator */}
      <div className="w-full h-px bg-black"></div>
      
      {/* How We Support You Section */}
      <Section 
        id="support" 
        title="How We Support You"
        nextSectionId="startup-os-elements"
      >
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg leading-relaxed opacity-80">
            Content coming soon...
          </p>
        </div>
      </Section>
      
      {/* Hexagon Section */}
      <HexagonSection />
      
      {/* Latest Content Section - Combined Podcast & Blog */}
      <Section
        id="latest-content"
        title="Latest Content"
        nextSectionId="contact"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((item) => (
            <Card key={item.id} className="overflow-hidden rounded-xl transition-all duration-300 card-hover border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:border-accent1/30 bg-white">
              <CardContent className="p-8 flex flex-col h-80">
                <div className="flex justify-between items-start mb-3 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {item.category.map((cat: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 rounded-full font-medium bg-gray-200 text-gray-800 text-xs">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-bold mb-3 leading-tight text-xl text-black">
                  {item.title}
                </h3>
                <p className="mb-4 line-clamp-2 leading-relaxed text-gray-600 flex-grow">
                  {item.excerpt}
                </p>
                
                <div className="mt-auto">
                  <div className="mb-4"></div>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-3 w-full justify-center rounded-full border-accent1 text-accent1 hover:bg-accent1 hover:text-white"
                    onClick={() => {
                      navigate(`/blog/post/${item.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-16">
          <Button 
            onClick={() => navigate("/content")} 
            className="bg-accent1 text-white hover:bg-accent1/90 px-10 py-6 rounded-full text-lg font-medium shadow-elegant"
          >
            View All Content
          </Button>
        </div>
      </Section>
      
      {/* Contact Section */}
      <Section 
        id="contact" 
        title="Get In Touch"
        description="Interested in working together? We'd love to hear from you."
        dark={true}
      >
        <div className="max-w-2xl mx-auto relative">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-accent1/30"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-accent1/30"></div>
          
          <form onSubmit={handleContactSubmit} className="space-y-8 bg-gray-800 p-8 md:p-12 rounded-2xl shadow-elegant">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white focus:border-accent1 focus:ring-2 focus:ring-accent1/30 focus:outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white focus:border-accent1 focus:ring-2 focus:ring-accent1/30 focus:outline-none transition-all"
                  placeholder="contact@howto-venture.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
              <input 
                type="text" 
                id="subject"
                name="subject"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white focus:border-accent1 focus:ring-2 focus:ring-accent1/30 focus:outline-none transition-all"
                placeholder="Project Inquiry"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Message</label>
              <textarea 
                id="message"
                name="message"
                required
                rows={5}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white focus:border-accent1 focus:ring-2 focus:ring-accent1/30 focus:outline-none transition-all"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            <div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent1 text-white hover:bg-accent1/90 py-6 rounded-lg text-lg font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </Section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
