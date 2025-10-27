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
    id: 'direction',
    label: 'Direction',
    content: {
      title: 'Direction',
      description: "It's all about clarity and focus. What do you want to achieve in the long term and what are your company's specific short-term goals? Everyone should understand what winning looks like and how their work contributes to it."
    }
  },
  {
    id: 'execution',
    label: 'Execution',
    content: {
      title: 'Execution',
      description: "Ideas are easy - execution is the difference. This is how your team turns plans into measurable progress: getting things done, the will to win, and tracking outcomes. It's about creating focus and accountability without adding bureaucracy."
    }
  },
  {
    id: 'leadership',
    label: 'Leadership',
    content: {
      title: 'Leadership',
      description: "Leadership drives clarity and momentum. It's about setting direction, enabling your team to perform, and making tough decisions with confidence and consistency. Strong leaders create focus, build trust, and enable high-performance and growth."
    }
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    content: {
      title: 'Collaboration',
      description: "Collaboration is how your culture shows up in daily work. It's about how teams communicate, make decisions, and solve problems together. The goal: open and fast collaboration that builds trust, makes things happen and enables high-performance."
    }
  },
  {
    id: 'sps',
    label: 'SPS',
    content: {
      title: 'Systems, Processes & Structures',
      description: "Every growing company needs structure - but the right kind. You need processes, but only a few key ones that drive your business and that you optimise. It's about creating clarity and consistency without killing speed and creativity."
    }
  },
  {
    id: 'data',
    label: 'Data',
    content: {
      title: 'Data',
      description: 'Data keeps your gut honest. This is about setting up the right metrics, tools, and habits to measure what matters. The best teams use data not just to prove success but to learn, improve, and adapt faster than the market.'
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
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-start">
        {/* Hexagon on the left */}
        <div className="flex justify-center lg:justify-start flex-shrink-0 w-full lg:w-auto lg:-mt-40">
          <div className="relative w-full max-w-[450px] h-[450px] lg:w-[580px] lg:h-[580px] flex-shrink-0">
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
                const offsetX = element.id === 'execution' ? 15 : (element.id === 'leadership' ? 20 : 0);
                const offsetY = element.id === 'direction' ? 8 : (element.id === 'collaboration' ? -8 : 0);
                
                return (
                  <g key={element.id}>
                    {/* Text label only - circles removed */}
                    <text
                      x={x + offsetX}
                      y={y + 5 + offsetY}
                      textAnchor="middle"
                      className={`text-sm font-medium cursor-pointer transition-all duration-300 ${
                        isSelected ? 'fill-accent1' : 'fill-white hover:fill-accent1'
                      }`}
                      onClick={() => setSelectedElement(element)}
                    >
                      {element.label}
                    </text>
                  </g>
                );
              })}
              
              {/* Hexagon connecting lines - interrupted to avoid text overlap */}
              {hexagonElements.map((element, index) => {
                const angles = [0, 60, 120, 180, 240, 300];
                const angle = angles[index];
                const nextAngle = angles[(index + 1) % 6];
                const radian = (angle * Math.PI) / 180;
                const nextRadian = (nextAngle * Math.PI) / 180;
                const radius = 120;
                const gapRadius = 30; // Distance to stop before the circle
                
                const x1 = 200 + (radius - gapRadius) * Math.cos(radian - Math.PI / 2);
                const y1 = 200 + (radius - gapRadius) * Math.sin(radian - Math.PI / 2);
                const x2 = 200 + (radius - gapRadius) * Math.cos(nextRadian - Math.PI / 2);
                const y2 = 200 + (radius - gapRadius) * Math.sin(nextRadian - Math.PI / 2);
                
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
              
              {/* Center circle removed */}
            </svg>
          </div>
        </div>
        
        {/* Content on the right */}
        <div className="lg:pl-4 flex-1 max-w-xl">
          <div className="transition-all duration-500 ease-in-out min-h-[300px] flex flex-col justify-start mb-4">
            <h3 className="text-3xl font-bold mb-6 text-white">
              {selectedElement.content.title}
            </h3>
            <p className="text-lg leading-relaxed opacity-80 text-gray-300 flex-1">
              {selectedElement.content.description}
            </p>
          </div>
          
          {/* Element indicators */}
          <div className="flex flex-wrap gap-2">
            {hexagonElements.map((element) => (
              <button
                key={element.id}
                onClick={() => setSelectedElement(element)}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedElement.id === element.id
                    ? 'bg-accent1 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-accent1 hover:text-white'
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
