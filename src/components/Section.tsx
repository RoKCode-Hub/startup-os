
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
  nextSectionId?: string;
}

const Section = ({ 
  id, 
  title, 
  description, 
  children, 
  dark = false,
  className,
  nextSectionId
}: SectionProps) => {
  const scrollToNextSection = () => {
    if (nextSectionId) {
      document.getElementById(nextSectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section 
      id={id}
      className={cn(
        'py-24 md:py-32 relative overflow-hidden',
        dark ? 'bg-gray-900 text-white' : 'bg-white text-black',
        className
      )}
    >
      
      {dark && (
        <>
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent1/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-accent3/5 rounded-full blur-3xl"></div>
        </>
      )}
      
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{title}</h2>
          {description && (
            <p className="text-xl opacity-80 leading-relaxed max-w-3xl mx-auto">{description}</p>
          )}
          <svg 
            width="80" 
            height="8" 
            viewBox="0 0 80 8" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mt-8"
          >
            <path 
              d="M2 4.5C15 3.8 25 5.2 40 4C55 2.8 65 4.5 78 4" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              className="opacity-90"
            />
          </svg>
        </div>
        {children}
      </div>
      
      {/* Scroll Indicator */}
      {nextSectionId && (
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
          onClick={scrollToNextSection}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="36" 
            height="36" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      )}
    </section>
  );
};

export default Section;
