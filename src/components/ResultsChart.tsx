import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { Category } from '@/types/questionnaire';

interface ResultsChartProps {
  categories: Category[];
}

const ResultsChart: React.FC<ResultsChartProps> = ({ categories }) => {
  const data = categories.map(category => ({
    name: category.title,
    percentage: (category.score / category.maxScore) * 100
  }));

  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius={200} data={data}>
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="name"
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
          />
          <Radar
            name="Score"
            dataKey="percentage"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsChart;