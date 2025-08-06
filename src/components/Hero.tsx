
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900">
        {/* Remove the triangle decorations previously here */}
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto text-center px-6 max-w-5xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-8 fade-in-up tracking-tight font-quicksand">
          <span className="pen-stroke-underline">
            <span className="font-thin">Startup</span><span className="font-mediumbold">OS</span>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 fade-in-up stagger-1 leading-relaxed">
          Build an operating system that supports growth, 
          rather than blocking it.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-5 fade-in-up stagger-2">
          <Button 
            className="bg-accent1 text-white hover:bg-accent1/90 px-10 py-7 text-lg rounded-full shadow-elegant transition-all duration-300 hover:shadow-soft"
            onClick={scrollToContact}
          >
            Get in Touch
          </Button>
          <Button 
            className="bg-white text-black hover:bg-gray-100 px-10 py-7 text-lg rounded-full shadow-elegant transition-all duration-300 hover:shadow-soft"
            onClick={() => navigate('/health-check')}
          >
            Health Check
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator with click functionality */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce fade-in-up stagger-3 cursor-pointer"
        onClick={scrollToAbout}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="36" 
          height="36" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="opacity-70 hover:opacity-100 transition-opacity"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
