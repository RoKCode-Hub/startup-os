
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/stores/blogStore";
import { FilePen } from "lucide-react";

const Blog = () => {
  const navigate = useNavigate();
  const { posts } = useBlogStore();

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
          <div className="flex justify-end mb-8">
            <Button onClick={() => navigate("/blog/new")} className="flex items-center gap-2">
              <FilePen className="h-4 w-4" />
              New Post
            </Button>
          </div>

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
                    <button 
                      onClick={() => navigate(`/blog/post/${post.id}`)} 
                      className="text-black font-medium hover:underline"
                    >
                      Read More
                    </button>
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
