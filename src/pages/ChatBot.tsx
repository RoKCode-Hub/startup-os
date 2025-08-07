
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, I'm your StartupOS AI coach. How can I help you?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    
    // Get AI response
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('startup-os-chat', {
        body: { message: currentInput }
      });

      if (error) {
        console.error('Error calling edge function:', error);
        throw error;
      }

      const botMessage = {
        id: Date.now() + 1,
        text: data.reply || "I apologize, but I'm having trouble responding right now. Please try again.",
        sender: "bot"
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm experiencing some technical difficulties. Please try again in a moment.",
        sender: "bot"
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <Section
          id="chatbot-header"
          title="ChatGPT"
          description="Chat with AI assistant powered by OpenAI"
          className="pt-16"
        >
            <div className="max-w-4xl mx-auto">
            <Card className="h-[600px] flex flex-col border-0 shadow-lg">
              <CardContent className="p-4 flex-grow overflow-y-auto flex flex-col space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground ml-4'
                          : 'bg-muted text-muted-foreground mr-4'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="flex items-center mb-1">
                           <Bot size={16} className="mr-2" />
                           <span className="text-xs font-medium">ChatGPT</span>
                        </div>
                      )}
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-3 mr-4">
                      <div className="flex items-center mb-1">
                        <Bot size={16} className="mr-2" />
                        <span className="text-xs font-medium">ChatGPT</span>
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
                className="border-t p-4 flex items-center gap-3 bg-muted/20"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message ChatGPT..."
                  className="flex-grow border-0 bg-background focus:outline-none text-foreground px-4 py-3 text-base"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={isLoading || !input.trim()}
                  className="rounded-lg"
                >
                  <Send size={16} />
                </Button>
              </form>
            </Card>
          </div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatBot;
