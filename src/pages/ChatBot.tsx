import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, ExternalLink, MessageSquare, Target, Lightbulb, TrendingUp, Users, CheckCircle } from "lucide-react";

// Analytics tracking
const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  console.log(`Analytics: ${eventName}`, properties);
  // In production, send to your analytics service (e.g., PostHog, Mixpanel, GA4)
};

const ChatBot = () => {
  useEffect(() => {
    // Track page view
    trackEvent('startup_coach_landing_viewed', {
      timestamp: new Date().toISOString(),
      session_id: Date.now()
    });
  }, []);

  const handleLaunchCoach = () => {
    trackEvent('startup_coach_launched', {
      timestamp: new Date().toISOString()
    });
    window.open('https://chatgpt.com/g/g-67f6498a8cb08191adc8b3f4402cdfbf-startup-os-coach', '_blank');
  };

  const features = [
    {
      icon: Target,
      title: "Strategic Planning",
      description: "Get expert guidance on business strategy, market positioning, and growth planning tailored to your startup's unique situation."
    },
    {
      icon: TrendingUp,
      title: "Growth Optimization",
      description: "Optimize your startup's operations, identify bottlenecks, and implement proven frameworks for sustainable growth."
    },
    {
      icon: Users,
      title: "Team Building",
      description: "Build high-performing teams with guidance on hiring, culture, leadership, and organizational design."
    },
    {
      icon: Lightbulb,
      title: "Innovation Framework",
      description: "Develop systematic approaches to innovation, product development, and market validation."
    }
  ];

  const benefits = [
    "24/7 availability for startup guidance",
    "Personalized advice based on your specific context",
    "Access to proven startup frameworks and methodologies",
    "Strategic insights from successful startup patterns",
    "Operational guidance for scaling your business"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <Section
          id="hero"
          title="StartupOS AI Coach"
          description="Your personal startup advisor powered by advanced AI"
          className="pt-16 pb-12"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="relative flex items-center justify-center w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-2xl">
                <Bot size={48} className="text-primary-foreground" />
                <MessageSquare size={24} className="absolute -bottom-2 -right-2 text-primary bg-background rounded-full p-1 shadow-lg" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Get Expert Startup Guidance 24/7
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Access personalized coaching, strategic insights, and proven frameworks to accelerate your startup's growth. 
                Built specifically for entrepreneurs who want to build better businesses.
              </p>
            </div>

            <Button 
              onClick={handleLaunchCoach}
              size="lg"
              className="text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <MessageSquare className="mr-2" size={20} />
              Launch StartupOS Coach
              <ExternalLink className="ml-2" size={16} />
            </Button>

            <p className="text-sm text-muted-foreground">
              Free to use • No signup required • Powered by ChatGPT
            </p>
          </div>
        </Section>

        {/* Features Section */}
        <Section
          id="features"
          title="What You'll Get"
          description="Comprehensive startup guidance across all key areas"
          className="py-16"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                      <feature.icon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* Benefits Section */}
        <Section
          id="benefits"
          title="Why Choose StartupOS Coach?"
          description="Everything you need to build and scale your startup"
          className="py-16"
        >
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-0 shadow-xl bg-card/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle size={20} className="text-primary mt-1 flex-shrink-0" />
                        <p className="text-foreground">{benefit}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Ready to Get Started?</h3>
                    <p className="text-muted-foreground">
                      Join thousands of entrepreneurs who are already using StartupOS Coach to build better businesses. 
                      Get instant access to expert guidance and start making better decisions today.
                    </p>
                    <Button 
                      onClick={handleLaunchCoach}
                      className="w-full md:w-auto rounded-xl"
                    >
                      <MessageSquare className="mr-2" size={16} />
                      Start Coaching Session
                      <ExternalLink className="ml-2" size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatBot;