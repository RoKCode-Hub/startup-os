import React from 'react';
import { cn } from '@/lib/utils';

interface RatingButtonProps {
  value: number;
  selected: boolean;
  onClick: () => void;
}

const RatingButton: React.FC<RatingButtonProps> = ({ value, selected, onClick }) => {
  return (
    <button
      type="button"
      className={cn(
        "w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95",
        selected ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"
      )}
      onClick={onClick}
      aria-pressed={selected}
    >
      {value}
    </button>
  );
};

export default RatingButton;