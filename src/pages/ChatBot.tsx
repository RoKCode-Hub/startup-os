import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Analytics tracking
const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  console.log(`Analytics: ${eventName}`, properties);
  // In production, send to your analytics service (e.g., PostHog, Mixpanel, GA4)
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, I'm your StartupOS AI coach. How can I help you?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Track page view
    trackEvent('chatbot_page_viewed', {
      timestamp: new Date().toISOString(),
      session_id: Date.now()
    });
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Track prompt sent
    trackEvent('prompt_sent', {
      message_length: input.length,
      timestamp: new Date().toISOString()
    });
    
    // Add user message
    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    
    // Get AI response
    setIsLoading(true);
    const startTime = Date.now();
    
    try {
      const { data, error } = await supabase.functions.invoke('startup-os-chat', {
        body: { message: currentInput }
      });

      if (error) {
        console.error('Error calling edge function:', error);
        throw error;
      }

      const responseTime = Date.now() - startTime;
      
      // Track successful response
      trackEvent('response_received', {
        response_time_ms: responseTime,
        response_length: data.reply?.length || 0,
        timestamp: new Date().toISOString()
      });

      const botMessage = {
        id: Date.now() + 1,
        text: data.reply || "I apologize, but I'm having trouble responding right now. Please try again.",
        sender: "bot"
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      // Track error
      trackEvent('response_error', {
        error: error.toString(),
        timestamp: new Date().toISOString()
      });
      
      const errorMessage = error.toString().includes('Rate limit') 
        ? "You're sending messages too quickly. Please wait a moment before trying again."
        : "I'm experiencing some technical difficulties. Please try again in a moment.";
        
      const errorResponse = {
        id: Date.now() + 1,
        text: errorMessage,
        sender: "bot"
      };
      setMessages((prev) => [...prev, errorResponse]);
      
      // Show toast for rate limiting
      if (error.toString().includes('Rate limit')) {
        toast({
          title: "Slow down there!",
          description: "You're sending messages too quickly. Please wait a moment.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <Section
          id="chatbot-header"
          title="StartupOS AI Coach"
          description="Your intelligent startup advisor powered by advanced AI"
          className="pt-16"
        >
          <div className="max-w-4xl mx-auto">
            <Card className="h-[600px] flex flex-col border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 flex-grow overflow-y-auto flex flex-col space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[85%] shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground ml-4'
                          : 'bg-muted/80 text-muted-foreground mr-4 border border-border/50'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="flex items-center mb-2">
                          <div className="relative">
                            <Bot size={16} className="mr-2" />
                            <Sparkles size={8} className="absolute -top-1 -right-1 text-primary" />
                          </div>
                          <span className="text-xs font-medium">StartupOS AI Coach</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted/80 rounded-2xl px-4 py-3 mr-4 border border-border/50">
                      <div className="flex items-center mb-2">
                        <div className="relative">
                          <Bot size={16} className="mr-2" />
                          <Sparkles size={8} className="absolute -top-1 -right-1 text-primary" />
                        </div>
                        <span className="text-xs font-medium">StartupOS AI Coach</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <form
                onSubmit={handleSend}
                className="border-t p-4 flex items-center gap-3 bg-muted/20 backdrop-blur-sm"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about startups..."
                  className="flex-grow border-0 bg-background/80 focus:outline-none text-foreground px-4 py-3 text-base rounded-xl shadow-sm"
                  disabled={isLoading}
                  maxLength={4000}
                />
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={isLoading || !input.trim()}
                  className="rounded-xl px-6 py-3 shadow-sm"
                >
                  <Send size={16} />
                </Button>
              </form>
            </Card>
            
            {/* Usage info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                10 messages per minute • Responses are AI-generated and may contain errors
              </p>
            </div>
          </div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatBot;