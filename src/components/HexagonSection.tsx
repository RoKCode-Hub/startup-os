import React, { useState } from 'react';
import Section from './Section';

interface HexagonElement {
  id: string;
  label: string;
  content: {
    title: string;
    description: string;
  };
}

const hexagonElements: HexagonElement[] = [
  {
    id: 'vision',
    label: 'Vision',
    content: {
      title: 'Clear Vision & Strategy',
      description: 'A well-defined vision provides direction and purpose for your startup. It serves as the North Star that guides decision-making and aligns your team toward common goals. Without a clear vision, startups often lose focus and struggle to make consistent progress.'
    }
  },
  {
    id: 'execution',
    label: 'Execution',
    content: {
      title: 'Effective Execution Framework',
      description: 'Great ideas mean nothing without proper execution. A solid execution framework includes clear processes, accountability systems, and the ability to move quickly from planning to implementation. This ensures your startup can deliver on its promises consistently.'
    }
  },
  {
    id: 'culture',
    label: 'Culture',
    content: {
      title: 'Strong Company Culture',
      description: 'Culture is the foundation that determines how your team works together, makes decisions, and treats customers. A strong culture attracts top talent, improves retention, and creates a competitive advantage that is difficult for competitors to replicate.'
    }
  },
  {
    id: 'systems',
    label: 'Systems',
    content: {
      title: 'Scalable Systems & Processes',
      description: 'As your startup grows, manual processes become bottlenecks. Implementing scalable systems and processes early allows you to handle increased complexity without proportionally increasing overhead or compromising quality.'
    }
  },
  {
    id: 'metrics',
    label: 'Metrics',
    content: {
      title: 'Data-Driven Decision Making',
      description: 'Successful startups track the right metrics and use data to guide their decisions. This includes understanding key performance indicators, customer behavior patterns, and financial metrics that truly impact business growth.'
    }
  },
  {
    id: 'team',
    label: 'Team',
    content: {
      title: 'High-Performance Team',
      description: 'Your team is your most valuable asset. Building a high-performance team means hiring the right people, providing proper training and development, and creating an environment where everyone can do their best work.'
    }
  }
];

const HexagonSection = () => {
  const [selectedElement, setSelectedElement] = useState<HexagonElement>(hexagonElements[0]);

  return (
    <Section 
      id="startup-os-elements" 
      title="Key Components of a Startup OS"
      description="Click on the component to see how it contributes to startup success"
      dark={true}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Hexagon on the left - takes 1/3 of width */}
        <div className="flex justify-center lg:justify-start lg:col-span-1">
          <div className="relative w-[580px] h-[580px] flex-shrink-0">
            {/* SVG Hexagon */}
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 400 400" 
              className="absolute inset-0"
            >
              {/* Hexagon background */}
              <polygon 
                points="200,50 320,125 320,275 200,350 80,275 80,125" 
                fill="none" 
                stroke="hsl(var(--accent1))" 
                strokeWidth="3"
                className="transition-all duration-300"
              />
              
              {/* Clickable corner elements */}
              {hexagonElements.map((element, index) => {
                const angles = [0, 60, 120, 180, 240, 300]; // 6 positions around hexagon
                const angle = angles[index];
                const radian = (angle * Math.PI) / 180;
                const radius = 120;
                const x = 200 + radius * Math.cos(radian - Math.PI / 2);
                const y = 200 + radius * Math.sin(radian - Math.PI / 2);
                
                const isSelected = selectedElement.id === element.id;
                
                return (
                  <g key={element.id}>
                    {/* Clickable circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r="25"
                      fill={isSelected ? "hsl(var(--accent1))" : "hsl(var(--gray-800))"}
                      stroke="hsl(var(--accent1))"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-300 hover:scale-110"
                      onClick={() => setSelectedElement(element)}
                    />
                    {/* Text label */}
                    <text
                      x={x}
                      y={y + 5}
                      textAnchor="middle"
                      className={`text-sm font-medium cursor-pointer transition-all duration-300 ${
                        isSelected ? 'fill-white' : 'fill-white'
                      }`}
                      onClick={() => setSelectedElement(element)}
                    >
                      {element.label}
                    </text>
                  </g>
                );
              })}
              
              {/* Hexagon connecting lines */}
              {hexagonElements.map((element, index) => {
                const angles = [0, 60, 120, 180, 240, 300];
                const angle = angles[index];
                const nextAngle = angles[(index + 1) % 6];
                const radian = (angle * Math.PI) / 180;
                const nextRadian = (nextAngle * Math.PI) / 180;
                const radius = 120;
                
                const x1 = 200 + radius * Math.cos(radian - Math.PI / 2);
                const y1 = 200 + radius * Math.sin(radian - Math.PI / 2);
                const x2 = 200 + radius * Math.cos(nextRadian - Math.PI / 2);
                const y2 = 200 + radius * Math.sin(nextRadian - Math.PI / 2);
                
                return (
                  <line
                    key={`hexagon-line-${element.id}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="white"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                );
              })}
              
              {/* Center connecting lines */}
              {hexagonElements.map((element, index) => {
                const angles = [0, 60, 120, 180, 240, 300];
                const angle = angles[index];
                const radian = (angle * Math.PI) / 180;
                const radius = 120;
                const x = 200 + radius * Math.cos(radian - Math.PI / 2);
                const y = 200 + radius * Math.sin(radian - Math.PI / 2);
                
                const isSelected = selectedElement.id === element.id;
                
                return (
                  <line
                    key={`line-${element.id}`}
                    x1="200"
                    y1="200"
                    x2={x}
                    y2={y}
                    stroke={isSelected ? "hsl(var(--accent1))" : "hsl(var(--accent1) / 0.3)"}
                    strokeWidth={isSelected ? "3" : "1"}
                    className="transition-all duration-300"
                  />
                );
              })}
              
              {/* Center circle */}
              <circle
                cx="200"
                cy="200"
                r="15"
                fill="hsl(var(--accent1))"
                className="transition-all duration-300"
              />
            </svg>
          </div>
        </div>
        
        {/* Content on the right - takes 2/3 of width */}
        <div className="space-y-8 lg:pl-8 lg:col-span-2">
          <div className="transition-all duration-500 ease-in-out">
            <h3 className="text-3xl font-bold mb-6 text-white">
              {selectedElement.content.title}
            </h3>
            <p className="text-lg leading-relaxed opacity-80 text-gray-300">
              {selectedElement.content.description}
            </p>
          </div>
          
          {/* Element indicators */}
          <div className="flex flex-wrap gap-3 mt-8">
            {hexagonElements.map((element) => (
              <button
                key={element.id}
                onClick={() => setSelectedElement(element)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedElement.id === element.id
                    ? 'bg-accent1 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {element.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HexagonSection;
