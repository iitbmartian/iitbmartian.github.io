
import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  
  align?: 'left' | 'right';
}

const TimelineItem = ({ date, title, description,  align = 'right' }: TimelineItemProps) => {
  return (
    <div className="relative pb-12 md:pb-20">
      {/* Timeline line */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-mars to-cosmic"></div>
      
      {/* Date marker */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-space-dark border-2 border-mars z-10"></div>
      
      {/* Content container - Mobile 1st, stacked layout */}
      <div className="md:hidden mb-8">
        <div className="bg-space-dark/40 p-6 rounded-xl border border-white/10">
          <div className="bg-mars text-white text-lg font-medium py-1 px-4 rounded-full inline-block mb-4">
            {date}
          </div>
          <h3 className="text-2xl font-bold mb-3 font-technospace">{title}</h3>
          <p className="text-white/80 mb-4">{description}</p>
          
        </div>
      </div>
      
      {/* Desktop layout with alternating sides */}
      <div className={cn(
        "hidden md:flex items-start gap-8",
        align === 'left' ? 'flex-row': 'flex-row-reverse'
      )}>
        {/* Empty space for alignment */}
        <div className="w-1/2"></div>
        
        {/* Content */}
        <div className={cn(
          "w-1/2 bg-space-dark/40 p-6 rounded-xl border border-white/10",
          align === 'left' ? 'text-right' : 'text-left'
        )}>
          <div className="bg-mars text-white text-lg font-medium py-1 px-4 rounded-full inline-block mb-4">
            {date}
          </div>
          <h3 className="text-2xl font-bold mb-3 font-technospace">{title}</h3>
          <p className="text-white/80 mb-4">{description}</p>
          
        </div>
      </div>
    </div>
  );
};

interface RoverTimelineProps {
  events: {
    date: string;
    title: string;
    description: string;
    image?: string;
  }[];
}

const RoverTimeline = ({ events }: RoverTimelineProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 text-white">
      <div className="text-center mb-8 md:mb-16">
                      <span className="text-7xl font-extrabold bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
                How we started
              </span>
        <p className="section-subtitle">
          MRT was started by 5 students with the same mission.<br />
          Our story starts 11 years ago... Step in.
        </p>
      </div>
      
      <div className="relative mt-10 md:mt-20">
        {events.map((event, index) => (
          <TimelineItem 
            key={index}
            date={event.date}
            title={event.title}
            description={event.description}
            
            align={index % 2 === 0 ? 'right' : 'left'}
          />
        ))}
      </div>
    </div>
  );
};

export default RoverTimeline;
