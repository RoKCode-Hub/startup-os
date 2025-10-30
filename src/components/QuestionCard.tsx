import React from 'react';
import RatingButton from './RatingButton';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: string;
  currentRating: number;
  onRatingChange: (rating: number) => void;
  className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentRating,
  onRatingChange,
  className
}) => {
  return (
    <div 
      className={cn(
        "bg-card rounded-xl p-6 shadow-sm",
        "border border-border/40",
        className
      )}
    >
      <h4 className="text-lg font-medium mb-6">{question}</h4>
      <div className="flex items-center justify-center space-x-4">
        <span className="text-sm text-muted-foreground">Strongly disagree</span>
        <div className="flex space-x-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <RatingButton
              key={value}
              value={value}
              selected={currentRating === value}
              onClick={() => onRatingChange(value)}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">Strongly agree</span>
      </div>
    </div>
  );
};

export default QuestionCard;