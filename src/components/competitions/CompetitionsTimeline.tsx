
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bookmark, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TimelineEvent {
  year: string;
  event: string;
}

interface CompetitionsTimelineProps {
  events: TimelineEvent[];
}

const CompetitionsTimeline = ({ events }: CompetitionsTimelineProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / itemsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: document.getElementById('timeline-section')?.offsetTop || 0, behavior: 'smooth' });
  };
  
  return (
    <div id="timeline-section" className="bg-space-dark/70 rounded-2xl border border-white/10 backdrop-blur-sm p-8 mb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-10">
          <Calendar className="text-cosmic w-7 h-7 mr-3" />
          <h3 className="text-2xl md:text-3xl font-bold text-gradient font-technospace">Key Milestones</h3>
        </div>
        
        {/* Timeline grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {currentEvents.map((item, index) => (
            <TimelineCard key={`${item.year}-${index}`} {...item} index={index} />
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    className="bg-cosmic/20 hover:bg-cosmic/40 text-white border-white/10"
                    onClick={() => handlePageChange(currentPage - 1)} 
                  />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => handlePageChange(i + 1)}
                    isActive={currentPage === i + 1}
                    className={cn(
                      "border-white/10",
                      currentPage === i + 1 
                        ? "bg-cosmic text-white" 
                        : "bg-cosmic/20 text-white hover:bg-cosmic/40"
                    )}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    className="bg-cosmic/20 hover:bg-cosmic/40 text-white border-white/10"
                    onClick={() => handlePageChange(currentPage + 1)} 
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
        
        {/* View all button */}
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            className="group border-cosmic/50 text-cosmic hover:bg-cosmic/10"
            onClick={() => handlePageChange(1)}
          >
            View Timeline <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const TimelineCard = ({ year, event, index }: TimelineEvent & { index: number }) => {
  const colors = [
    "from-mars to-cosmic",
    "from-cosmic to-blue-500",
    "from-blue-500 to-green-400",
    "from-green-400 to-mars"
  ];
  
  const gradientClass = colors[index % colors.length];
  
  return (
    <Card className="bg-space-dark/80 border border-white/10 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg duration-300">
      <div className={`h-2 bg-gradient-to-r ${gradientClass}`}></div>
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="px-3 py-1 rounded-full bg-cosmic/20 text-white text-sm flex items-center">
              <Bookmark className="mr-1.5 h-3.5 w-3.5 text-cosmic" />
              {year}
            </div>
            <CheckCircle2 className="h-5 w-5 text-mars/80" />
          </div>
          <div className="text-white">
            {event}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitionsTimeline;
