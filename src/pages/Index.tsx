
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBlogStore } from "@/stores/blogStore";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

const Index = () => {
  const { posts } = useBlogStore();
  const navigate = useNavigate();
  
  // Get the latest 3 posts
  const latestPosts = posts.slice(0, 3);
  
  // Mock podcast episodes data
  const podcastEpisodes = [
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
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section - Moved up */}
      <Section 
        id="about" 
        title="About Us"
        description="We are a team of designers and developers creating beautiful digital experiences."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-6">
              Founded in 2020, our studio brings together passionate creatives who believe in the power of minimalist design to create maximum impact.
            </p>
            <p className="text-lg mb-6">
              We work closely with clients to understand their unique needs and create tailored solutions that elevate their brand and connect with their audience.
            </p>
            <Button className="mt-4">Learn More</Button>
          </div>
          <div className="aspect-square bg-gray-100 rounded-lg"></div>
        </div>
      </Section>
      
      {/* Latest Podcast Episodes Section - Added */}
      <Section
        id="podcast-preview"
        title="Latest Podcast Episodes"
        description="Listen to our conversations with founders, investors, and experts"
        dark={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {podcastEpisodes.map((episode) => (
            <Card key={episode.id} className="bg-black border border-gray-800 hover:border-gray-700 transition-all overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm text-gray-400">{episode.date}</span>
                  <span className="text-sm text-gray-400">{episode.duration}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{episode.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{episode.description}</p>
                <p className="text-sm text-gray-500 mb-4">With {episode.guests}</p>
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-black hover:bg-gray-800 flex items-center gap-2"
                  onClick={() => navigate(`/podcast`)}
                >
                  <Play size={16} />
                  Listen Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button 
            onClick={() => navigate("/podcast")} 
            className="bg-white text-black hover:bg-gray-100 px-8"
          >
            View All Episodes
          </Button>
        </div>
      </Section>
      
      {/* Blog Preview Section */}
      <Section
        id="blog-preview"
        title="Latest Blog Posts"
        description="Discover our most recent insights and articles"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="h-48 bg-gray-100"></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">{post.category}</span>
                  <span className="text-sm text-gray-600">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">By {post.author}</span>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate(`/blog/post/${post.id}`)}
                    className="text-black font-medium hover:underline px-0"
                  >
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button onClick={() => navigate("/blog")} className="px-8">
            View All Posts
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
        <div className="max-w-xl mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-transparent border border-gray-700 rounded-md p-3 text-white focus:border-white focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-transparent border border-gray-700 rounded-md p-3 text-white focus:border-white focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full bg-transparent border border-gray-700 rounded-md p-3 text-white focus:border-white focus:outline-none"
                placeholder="Project Inquiry"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full bg-transparent border border-gray-700 rounded-md p-3 text-white focus:border-white focus:outline-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            <div>
              <Button className="w-full bg-white text-black hover:bg-gray-100">
                Send Message
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
