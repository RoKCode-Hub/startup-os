
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
    <div className="min-h-screen overflow-hidden">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <Section 
        id="about" 
        title="About Us"
        description="We are passionate about helping founders succeed."
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
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-elegant flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="absolute -bottom-8 -left-8 w-2/3 h-16 bg-accent3/10 rounded-lg -z-10"></div>
            <div className="absolute -top-8 -right-8 w-2/3 h-16 bg-accent1/10 rounded-lg -z-10"></div>
          </div>
        </div>
      </Section>
      
      {/* Latest Podcast Episodes Section */}
      <Section
        id="podcast-preview"
        title="Latest Podcast Episodes"
        description="Listen to our conversations with founders, investors, and experts"
        dark={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {podcastEpisodes.map((episode) => (
            <Card key={episode.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all overflow-hidden rounded-xl card-hover">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-3 text-sm">
                  <span className="text-gray-400">{episode.date}</span>
                  <span className="bg-accent1/20 text-accent1 px-3 py-1 rounded-full font-medium">{episode.duration}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{episode.title}</h3>
                <p className="text-gray-300 mb-6 line-clamp-2 leading-relaxed">{episode.description}</p>
                <p className="text-sm text-gray-400 mb-6">With <span className="text-white">{episode.guests}</span></p>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-black hover:bg-gray-700 flex items-center gap-3 w-full justify-center rounded-full"
                  onClick={() => navigate(`/podcast`)}
                >
                  <Play size={18} className="text-accent1" />
                  Listen Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-16">
          <Button 
            onClick={() => navigate("/podcast")} 
            className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-6 rounded-full text-lg font-medium shadow-elegant"
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
            <Card key={post.id} className="overflow-hidden rounded-xl border-0 shadow-soft hover:shadow-elegant transition-all duration-300 card-hover">
              <div className="h-56 bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100"></div>
              </div>
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium px-3 py-1 bg-gray-200 text-gray-800 rounded-full">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 leading-tight">{post.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">By <span className="font-medium text-black">{post.author}</span></span>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate(`/blog/post/${post.id}`)}
                    className="text-accent1 font-medium hover:text-accent1/80 hover:bg-transparent px-0 underline-animation"
                  >
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-16">
          <Button 
            onClick={() => navigate("/blog")} 
            className="bg-accent1 text-white hover:bg-accent1/90 px-10 py-6 rounded-full text-lg font-medium shadow-elegant"
          >
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
        <div className="max-w-2xl mx-auto relative">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-accent1/30"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-accent1/30"></div>
          
          <form className="space-y-8 bg-gray-800 p-8 md:p-12 rounded-2xl shadow-elegant">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white focus:border-accent1 focus:ring-2 focus:ring-accent1/30 focus:outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white focus:border-accent1 focus:ring-2 focus:ring-accent1/30 focus:outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white focus:border-accent1 focus:ring-2 focus:ring-accent1/30 focus:outline-none transition-all"
                placeholder="Project Inquiry"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Message</label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white focus:border-accent1 focus:ring-2 focus:ring-accent1/30 focus:outline-none transition-all"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            <div>
              <Button className="w-full bg-accent1 text-white hover:bg-accent1/90 py-6 rounded-lg text-lg font-medium">
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
