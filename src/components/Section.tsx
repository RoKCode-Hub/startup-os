
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
        'py-24 md:py-32',
        dark ? 'bg-black text-white' : 'bg-white text-black',
        className
      )}
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          {description && (
            <p className="text-lg opacity-80">{description}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
