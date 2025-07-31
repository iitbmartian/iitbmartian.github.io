import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bookmark, Calendar, ArrowRight, CheckCircle2, Clock, Star, Trophy } from 'lucide-react';
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

const CompetitionsTimeline = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });
  
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / itemsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const timelineElement = document.getElementById('timeline-section');
    if (timelineElement) {
      timelineElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  return (
    <motion.div 
      ref={timelineRef}
      id="timeline-section" 
      className="bg-gradient-to-br from-space-dark/80 to-space/60 rounded-2xl border border-white/10 backdrop-blur-sm p-8 mb-16 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-cosmic/10 to-mars/10 rounded-full blur-3xl" />
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-mars/10 to-orange-500/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            variants={itemVariants}
          >
            <motion.div
              className="p-3 bg-gradient-to-r from-cosmic/20 to-blue-500/20 rounded-xl mr-4"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Calendar className="text-cosmic w-7 h-7" />
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cosmic to-mars bg-clip-text text-transparent font-orbitron">
              Key Milestones
            </h3>
          </motion.div>

          <motion.p 
            className="text-white/70 max-w-2xl mx-auto text-lg mb-8"
            variants={itemVariants}
          >
            Journey through our most significant achievements and memorable moments in competitive robotics
          </motion.p>

          {/* Timeline Stats */}
          <motion.div
            className="flex items-center justify-center space-x-8 mb-8"
            variants={itemVariants}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{events.length}</div>
              <div className="text-white/60 text-sm">Total Events</div>
            </div>
            
            <div className="w-px h-8 bg-white/20"></div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{totalPages}</div>
              <div className="text-white/60 text-sm">Pages</div>
            </div>
            
            <div className="w-px h-8 bg-white/20"></div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{currentPage}</div>
              <div className="text-white/60 text-sm">Current</div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Timeline Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          key={currentPage} // Re-animate when page changes
        >
          {currentEvents.map((item, index) => (
            <TimelineCard 
              key={`${item.year}-${index}-${currentPage}`} 
              {...item} 
              index={index} 
            />
          ))}
        </motion.div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Pagination className="mb-6">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <PaginationPrevious 
                        className="bg-cosmic/20 hover:bg-cosmic/40 text-white border-white/10 transition-all duration-300 cursor-pointer"
                        onClick={() => handlePageChange(currentPage - 1)} 
                      />
                    </motion.div>
                  </PaginationItem>
                )}
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <PaginationLink
                        onClick={() => handlePageChange(i + 1)}
                        isActive={currentPage === i + 1}
                        className={cn(
                          "border-white/10 transition-all duration-300 cursor-pointer",
                          currentPage === i + 1 
                            ? "bg-gradient-to-r from-cosmic to-blue-500 text-white border-cosmic/30 shadow-lg" 
                            : "bg-cosmic/20 text-white hover:bg-cosmic/40"
                        )}
                      >
                        {i + 1}
                      </PaginationLink>
                    </motion.div>
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <PaginationNext 
                        className="bg-cosmic/20 hover:bg-cosmic/40 text-white border-white/10 transition-all duration-300 cursor-pointer"
                        onClick={() => handlePageChange(currentPage + 1)} 
                      />
                    </motion.div>
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </motion.div>
        )}
        
        {/* View All Button */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button 
              variant="outline" 
              className="group border-2 border-cosmic/50 text-cosmic hover:bg-cosmic/10 hover:border-cosmic/70 px-6 py-3 rounded-xl font-medium backdrop-blur-sm transition-all duration-300"
              onClick={() => handlePageChange(1)}
            >
              <Trophy className="mr-2 h-4 w-4" />
              View Complete Timeline 
              <motion.div
                className="ml-2"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const TimelineCard = ({ year, event, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const colors = [
    { gradient: "from-mars to-orange-500", accent: "text-mars", bg: "bg-mars/20" },
    { gradient: "from-cosmic to-blue-500", accent: "text-cosmic", bg: "bg-cosmic/20" },
    { gradient: "from-blue-500 to-purple-500", accent: "text-blue-400", bg: "bg-blue-500/20" },
    { gradient: "from-purple-500 to-pink-500", accent: "text-purple-400", bg: "bg-purple-500/20" }
  ];
  
  const colorScheme = colors[index % colors.length];
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="bg-gradient-to-br from-space-dark/90 to-space/70 border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/30 backdrop-blur-sm h-full group">
        {/* Top accent bar */}
        <motion.div 
          className={`h-1 bg-gradient-to-r ${colorScheme.gradient}`}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
        />
        
        <CardContent className="p-0">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <motion.div 
                className={`px-3 py-2 rounded-full ${colorScheme.bg} backdrop-blur-sm border border-white/10 text-white text-sm font-medium flex items-center`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Bookmark className={`mr-2 h-3.5 w-3.5 ${colorScheme.accent}`} />
                {year}
              </motion.div>
              
              <motion.div
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 10 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle2 className={`h-5 w-5 ${colorScheme.accent}`} />
              </motion.div>
            </div>
            
            {/* Event description */}
            <motion.div 
              className="text-white group-hover:text-white/90 transition-colors duration-300 leading-relaxed"
              animate={{
                color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
              }}
              transition={{ duration: 0.3 }}
            >
              {event}
            </motion.div>

            {/* Progress indicator */}
            <motion.div
              className="mt-4 flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Clock className="w-3 h-3 text-white/50" />
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${colorScheme.gradient}`}
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? "100%" : 0 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <Star className="w-3 h-3 text-white/50" />
            </motion.div>
          </div>
        </CardContent>

        {/* Hover border effect */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-transparent pointer-events-none"
          animate={{
            borderColor: isHovered ? "rgba(0, 217, 255, 0.4)" : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

export default CompetitionsTimeline;
