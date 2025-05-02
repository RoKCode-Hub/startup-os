
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";

const Blog = () => {
  const [posts] = useState([
    {
      id: 1,
      title: "Building Modern Web Applications",
      excerpt: "Learn how to build scalable web applications using the latest technologies.",
      author: "Jane Smith",
      date: "May 1, 2025",
      category: "Development"
    },
    {
      id: 2,
      title: "Design Principles for Startups",
      excerpt: "Effective design principles that every startup should follow to create impactful products.",
      author: "Mike Johnson",
      date: "April 25, 2025",
      category: "Design"
    },
    {
      id: 3,
      title: "The Future of AI in Business",
      excerpt: "How artificial intelligence is transforming business operations and creating new opportunities.",
      author: "Sarah Lee",
      date: "April 18, 2025",
      category: "AI"
    },
    {
      id: 4,
      title: "Optimizing Your Tech Stack",
      excerpt: "Tips and strategies for choosing the right technologies for your startup.",
      author: "David Chen",
      date: "April 10, 2025",
      category: "Technology"
    },
    {
      id: 5,
      title: "User-Centered Design Approach",
      excerpt: "How focusing on user needs can drive better product decisions and business outcomes.",
      author: "Alex Rivera",
      date: "April 5, 2025",
      category: "Design"
    },
    {
      id: 6,
      title: "Scaling Your Startup",
      excerpt: "Key insights for growing your startup while maintaining product quality and team culture.",
      author: "Chris Taylor",
      date: "March 28, 2025",
      category: "Business"
    }
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <Section
          id="blog-header"
          title="Our Blog"
          description="Insights, thoughts and stories about startup development, design and technology"
          className="pt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="h-48 bg-gray-100"></div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">{post.category}</span>
                    <span className="text-sm text-gray-600">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">By {post.author}</span>
                    <a href={`#post-${post.id}`} className="text-black font-medium hover:underline">
                      Read More
                    </a>
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

export default Blog;
