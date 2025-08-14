
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/components/ui/sonner';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on pages with light backgrounds that need dark text
  const isLightBackgroundPage = ['/imprint', '/data-privacy', '/health-check', '/chatbot'].includes(location.pathname);
  const shouldUseDarkText = scrolled || isLightBackgroundPage;
  
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

  const handleLogout = async () => {
    await logout();
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
            className={cn(
              "h-12 w-auto transition-all duration-300",
              isLightBackgroundPage ? "filter brightness-0" : ""
            )}
          />
        </Link>
        <div className="hidden md:flex items-center space-x-10">
          <Link 
            to="/" 
            className={cn(
              "underline-animation font-medium", 
              shouldUseDarkText ? "text-gray-800" : "text-white"
            )}
          >
            Home
          </Link>
          <Link 
            to="/#latest-content" 
            className={cn(
              "underline-animation font-medium", 
              shouldUseDarkText ? "text-gray-800" : "text-white"
            )}
          >
            Content
          </Link>
          <Link 
            to="/chatbot" 
            className={cn(
              "underline-animation font-medium", 
              shouldUseDarkText ? "text-gray-800" : "text-white"
            )}
          >
            Chatbot
          </Link>
          <Link 
            to="/health-check" 
            className={cn(
              "underline-animation font-medium", 
              shouldUseDarkText ? "text-gray-800" : "text-white"
            )}
          >
            Health Check
          </Link>
          
          {isAuthenticated && user?.role === 'admin' && (
            <Link 
              to="/blog/new" 
              className={cn(
                "underline-animation font-medium", 
                shouldUseDarkText ? "text-gray-800" : "text-white"
              )}
            >
              New Post
            </Link>
          )}
        </div>

        <button 
          className={cn(
            "md:hidden transition-colors",
            shouldUseDarkText ? "text-black" : "text-white"
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
            <Link to="/#latest-content" className="text-lg font-medium hover:text-accent1 transition-colors" onClick={toggleMobileMenu}>Content</Link>
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
