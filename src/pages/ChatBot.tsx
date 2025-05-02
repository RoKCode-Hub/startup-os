
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Send } from "lucide-react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm the Startup OS Assistant. How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate bot response
    setIsLoading(true);
    setTimeout(() => {
      const responses = [
        "I can help you with startup information and resources.",
        "Would you like to learn more about our services?",
        "Feel free to ask me anything about starting a business.",
        "I'm here to assist with any questions about Startup OS.",
        "I can provide resources on funding, team building, and product development."
      ];
      
      const botMessage = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "bot"
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <Section
          id="chatbot-header"
          title="AI Chat Assistant"
          description="Get instant answers to your startup questions"
          className="pt-16"
        >
          <div className="max-w-2xl mx-auto">
            <Card className="h-[500px] flex flex-col">
              <CardContent className="p-4 flex-grow overflow-y-auto flex flex-col space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.sender === 'user'
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-black'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="flex items-center mb-1">
                          <Bot size={16} className="mr-2" />
                          <span className="text-xs font-medium">Startup OS Assistant</span>
                        </div>
                      )}
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <form
                onSubmit={handleSend}
                className="border-t p-4 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                />
                <Button type="submit" className="bg-black hover:bg-gray-800">
                  <Send size={18} />
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
