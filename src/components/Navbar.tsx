
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <a 
          href="#" 
          className="text-2xl font-bold tracking-tighter"
        >
          STARTUP OS
        </a>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="hover:text-gray-600 transition-colors">About</a>
          <a href="#services" className="hover:text-gray-600 transition-colors">Services</a>
          <a href="#work" className="hover:text-gray-600 transition-colors">Work</a>
          <a href="#contact" className="hover:text-gray-600 transition-colors">Contact</a>
        </div>
        <button className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
