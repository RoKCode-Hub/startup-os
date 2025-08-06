
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/components/ui/sonner';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        scrolled 
          ? 'py-3 bg-white/90 backdrop-blur-md shadow-soft' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-10">
        <Link 
          to="/" 
          className="flex items-center"
        >
          <img 
            src="/lovable-uploads/3b67b68b-e71e-473f-a16a-d2d847f6d902.png" 
            alt="Startup OS Logo" 
            className="h-12 w-auto"
          />
        </Link>
        <div className="hidden md:flex items-center space-x-10">
          <Link 
            to="/" 
            className={cn(
              "underline-animation font-medium", 
              scrolled ? "text-gray-800" : "text-white"
            )}
          >
            Home
          </Link>
          <Link 
            to="/podcast" 
            className={cn(
              "underline-animation font-medium", 
              scrolled ? "text-gray-800" : "text-white"
            )}
          >
            Podcast
          </Link>
          <Link 
            to="/blog" 
            className={cn(
              "underline-animation font-medium", 
              scrolled ? "text-gray-800" : "text-white"
            )}
          >
            Blog
          </Link>
          <Link 
            to="/chatbot" 
            className={cn(
              "underline-animation font-medium", 
              scrolled ? "text-gray-800" : "text-white"
            )}
          >
            Chatbot
          </Link>
          <Link 
            to="/health-check" 
            className={cn(
              "underline-animation font-medium", 
              scrolled ? "text-gray-800" : "text-white"
            )}
          >
            Health Check
          </Link>
          
          {isAuthenticated && user?.role === 'admin' && (
            <Link 
              to="/blog/new" 
              className={cn(
                "underline-animation font-medium", 
                scrolled ? "text-gray-800" : "text-white"
              )}
            >
              New Post
            </Link>
          )}
        </div>

        <button 
          className={cn(
            "md:hidden transition-colors",
            scrolled ? "text-black" : "text-white"
          )} 
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X width={24} height={24} />
          ) : (
            <Menu width={24} height={24} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full py-6 px-6 shadow-md absolute top-full left-0 animate-fade-in-up">
          <div className="flex flex-col space-y-5">
            <Link to="/" className="text-lg font-medium hover:text-accent1 transition-colors" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/podcast" className="text-lg font-medium hover:text-accent1 transition-colors" onClick={toggleMobileMenu}>Podcast</Link>
            <Link to="/blog" className="text-lg font-medium hover:text-accent1 transition-colors" onClick={toggleMobileMenu}>Blog</Link>
            <Link to="/chatbot" className="text-lg font-medium hover:text-accent1 transition-colors" onClick={toggleMobileMenu}>Chatbot</Link>
            <Link to="/health-check" className="text-lg font-medium hover:text-accent1 transition-colors" onClick={toggleMobileMenu}>Health Check</Link>
            
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/blog/new" className="text-lg font-medium hover:text-accent1 transition-colors" onClick={toggleMobileMenu}>New Post</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
