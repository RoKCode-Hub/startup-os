import React from 'react';
import { LucideIcon } from 'lucide-react';
import ProgressRing from './ProgressRing';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  description: string;
  score: number;
  maxScore: number;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  score,
  maxScore,
  icon: Icon,
  onClick,
  className
}) => {
  const progressPercentage = Math.round((score / maxScore) * 100);
  
  return (
    <div 
      className={cn(
        "category-card bg-card rounded-xl p-6 shadow-sm hover:shadow-md cursor-pointer",
        "border border-border/40 transition-all duration-300",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary rounded-md">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-medium text-lg">{title}</h3>
        </div>
        <div className="relative flex items-center justify-center">
          <ProgressRing
            radius={24}
            stroke={3}
            progress={progressPercentage}
          />
          <span className="absolute text-xs font-medium">
            {score}/{maxScore}
          </span>
        </div>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default CategoryCard;