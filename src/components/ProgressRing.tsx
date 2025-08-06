import React from 'react';

interface ProgressRingProps {
  radius: number;
  stroke: number;
  progress: number;
  color?: string;
  trackColor?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  radius,
  stroke,
  progress,
  color = "#3b82f6",
  trackColor = "#e5e7eb"
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="progress-ring"
    >
      <circle
        stroke={trackColor}
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
};

export default ProgressRing;