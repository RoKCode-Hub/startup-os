
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
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
      
      {/* Services Section */}
      <Section 
        id="services" 
        title="Our Services"
        description="We specialize in creating beautiful experiences across digital platforms."
        dark={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Web Design",
              description: "Creating beautiful, responsive websites that look great on any device and deliver exceptional user experiences."
            },
            {
              title: "Brand Identity",
              description: "Developing cohesive brand identities that communicate your values and connect with your target audience."
            },
            {
              title: "UI/UX Design",
              description: "Crafting intuitive interfaces and seamless user experiences that delight and engage your users."
            },
            {
              title: "Digital Marketing",
              description: "Implementing strategic digital marketing campaigns to increase your online presence and reach."
            },
            {
              title: "Content Creation",
              description: "Producing high-quality content that tells your story and resonates with your audience."
            },
            {
              title: "Development",
              description: "Building robust, scalable applications and websites using modern technologies and best practices."
            }
          ].map((service, index) => (
            <Card key={index} className="bg-black border border-gray-800 hover:border-gray-700 transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
      
      {/* Work Section */}
      <Section 
        id="work" 
        title="Our Work"
        description="A selection of projects we've delivered for our clients."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group relative overflow-hidden rounded-lg aspect-video bg-gray-100">
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-center p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Project {item}</h3>
                  <p className="text-gray-300 mb-4">Branding & Web Design</p>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    View Project
                  </Button>
                </div>
              </div>
            </div>
          ))}
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
