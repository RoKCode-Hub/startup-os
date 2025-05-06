
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
        <div className="absolute inset-0 opacity-10">
          {/* Left triangle decoration - positioned symmetrically on the left side */}
          <div className="absolute top-[40%] left-[15%] w-64 h-64 rounded-full bg-accent4 blur-[100px]" />
          {/* Right triangle decoration - rotated properly and positioned symmetrically on the right */}
          <div className="absolute top-[40%] right-[15%] w-72 h-72 rounded-full bg-accent3 blur-[120px] transform rotate-90" />
          <div className="absolute bottom-20 left-[20%] w-80 h-80 rounded-full bg-accent2 blur-[120px]" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto text-center px-6 max-w-5xl">
        <h1 className="text-5xl md:text-10xl lg:text-8xl font-bold text-white mb-8 fade-in-up tracking-tight">
          <span className="pen-stroke-underline">
            Startup OS
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 fade-in-up stagger-1 leading-relaxed">
          Build an operating system that <span className="text-white font-semibold">supports growth</span>, rather than blocking it.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-5 fade-in-up stagger-2">
          <Button 
            className="bg-white text-black hover:bg-gray-100 px-10 py-7 text-lg rounded-full shadow-elegant transition-all duration-300 hover:shadow-soft"
            onClick={() => navigate('/podcast')}
          >
            Podcast
          </Button>
          <Button 
            className="bg-accent1 text-white hover:bg-accent1/90 px-10 py-7 text-lg rounded-full shadow-elegant transition-all duration-300 hover:shadow-soft"
            onClick={scrollToContact}
          >
            Get in Touch
          </Button>
        </div>
        
        {/* Abstract design element */}
        <div className="absolute left-0 bottom-32 w-32 h-32 border-l-2 border-b-2 border-accent1/30 hidden lg:block"></div>
        <div className="absolute right-0 bottom-64 w-32 h-32 border-r-2 border-b-2 border-accent1/30 hidden lg:block"></div>
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
