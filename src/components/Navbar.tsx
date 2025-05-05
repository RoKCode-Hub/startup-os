
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled 
          ? 'py-2 bg-white shadow-md' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-10">
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tighter"
        >
          STARTUP OS
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <Link to="/podcast" className="hover:text-gray-600 transition-colors">Podcast</Link>
          <Link to="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
          <Link to="/chatbot" className="hover:text-gray-600 transition-colors">Chat Bot</Link>
          <Link to="/health-check" className="hover:text-gray-600 transition-colors">Health Check</Link>
        </div>
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <X width={24} height={24} />
          ) : (
            <Menu width={24} height={24} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 px-6 shadow-md">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="hover:text-gray-600 transition-colors" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/podcast" className="hover:text-gray-600 transition-colors" onClick={toggleMobileMenu}>Podcast</Link>
            <Link to="/blog" className="hover:text-gray-600 transition-colors" onClick={toggleMobileMenu}>Blog</Link>
            <Link to="/chatbot" className="hover:text-gray-600 transition-colors" onClick={toggleMobileMenu}>Chat Bot</Link>
            <Link to="/health-check" className="hover:text-gray-600 transition-colors" onClick={toggleMobileMenu}>Health Check</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
