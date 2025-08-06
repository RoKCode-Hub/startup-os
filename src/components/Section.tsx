
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}

const Section = ({ 
  id, 
  title, 
  description, 
  children, 
  dark = false,
  className 
}: SectionProps) => {
  return (
    <section 
      id={id}
      className={cn(
        'py-24 md:py-32 relative overflow-hidden',
        dark ? 'bg-gray-900 text-white' : 'bg-white text-black',
        className
      )}
    >
      {/* Decorative hexagon elements for visual interest */}
      {!dark && (
        <>
          <svg className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 100 100">
            <polygon 
              points="50,10 85,30 85,70 50,90 15,70 15,30" 
              fill="hsl(var(--accent2) / 0.05)" 
              stroke="hsl(var(--accent2) / 0.1)" 
              strokeWidth="0.5"
            />
          </svg>
          <svg className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/3 translate-y-1/3" viewBox="0 0 100 100">
            <polygon 
              points="50,10 85,30 85,70 50,90 15,70 15,30" 
              fill="hsl(var(--accent3) / 0.05)" 
              stroke="hsl(var(--accent3) / 0.1)" 
              strokeWidth="0.5"
            />
          </svg>
        </>
      )}
      
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
          <div className="h-1 w-16 bg-accent1 mx-auto mt-8"></div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
