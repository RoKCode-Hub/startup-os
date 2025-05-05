
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto text-center px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 fade-in-up">
          Startup OS
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 fade-in-up" style={{animationDelay: '0.2s'}}>
          Build an operating system that supports growth, rather than blocking it.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in-up" style={{animationDelay: '0.4s'}}>
          <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg">
            Podcast
          </Button>
          <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg">
            Get in Touch
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
