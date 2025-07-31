import React, { useState, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Bookmark, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Star, 
  Trophy,
  Award,
  Target,
  Zap,
  Medal
} from 'lucide-react';
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

const TimelineCard = ({ year, event, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  // Enhanced useInView with bidirectional animations
  const isInView = useInView(cardRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  // Memoized color schemes
  const colors = useMemo(() => [
    { 
      gradient: "from-mars to-orange-500", 
      accent: "text-mars", 
      bg: "bg-mars/20",
      shadow: "shadow-mars/20"
    },
    { 
      gradient: "from-cosmic to-blue-500", 
      accent: "text-cosmic", 
      bg: "bg-cosmic/20",
      shadow: "shadow-cosmic/20"
    },
    { 
      gradient: "from-blue-500 to-purple-500", 
      accent: "text-blue-400", 
      bg: "bg-blue-500/20",
      shadow: "shadow-blue-500/20"
    },
    { 
      gradient: "from-purple-500 to-pink-500", 
      accent: "text-purple-400", 
      bg: "bg-purple-500/20",
      shadow: "shadow-purple-500/20"
    }
  ], []);
  
  const colorScheme = colors[index % colors.length];

  // Memoized animation variants
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.9,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      rotateX: -10,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  }), [index]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  
  return (
    <motion.div
      ref={cardRef}
      className="perspective-1000"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        rotateY: 2
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Card className="bg-gradient-to-br from-space-dark/90 to-space/70 border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/30 backdrop-blur-sm h-full group relative">
        {/* Enhanced Top accent bar */}
        <motion.div 
          className={`h-1 bg-gradient-to-r ${colorScheme.gradient}`}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { 
            scaleX: 1, 
            opacity: 1 
          } : { 
            scaleX: 0, 
            opacity: 0 
          }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
          style={{ transformOrigin: 'left' }}
        />
        
        <CardContent className="p-0">
          <motion.div 
            className="p-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
          >
            {/* Enhanced Header */}
            <div className="flex justify-between items-start mb-4">
              <motion.div 
                className={`px-3 py-2 rounded-full ${colorScheme.bg} backdrop-blur-sm border border-white/10 text-white text-sm font-medium flex items-center`}
                whileHover={{ scale: 1.08, rotate: 2 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Bookmark className={`mr-2 h-3.5 w-3.5 ${colorScheme.accent}`} />
                </motion.div>
                {year}
              </motion.div>
              
              <motion.div
                animate={{
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? 360 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle2 className={`h-5 w-5 ${colorScheme.accent}`} />
              </motion.div>
            </div>
            
            {/* Enhanced Event description */}
            <motion.div 
              className="text-white group-hover:text-white/90 transition-colors duration-300 leading-relaxed"
              animate={{
                color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ x: 2 }}
            >
              {event}
            </motion.div>

            {/* Enhanced Progress indicator */}
            <motion.div
              className="mt-4 flex items-center space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Clock className="w-3 h-3 text-white/50" />
              </motion.div>
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${colorScheme.gradient}`}
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? "100%" : 0 }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-3 h-3 text-white/50" />
              </motion.div>
            </motion.div>

            {/* Achievement indicator */}
            <motion.div
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0 }}
              animate={isHovered ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorScheme.gradient}`} />
            </motion.div>
          </motion.div>
        </CardContent>

        {/* Enhanced Hover border effect */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-transparent pointer-events-none"
          animate={{
            borderColor: isHovered 
              ? ["rgba(0, 217, 255, 0.4)", "rgba(255, 107, 53, 0.4)", "rgba(0, 217, 255, 0.4)"]
              : "transparent",
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

const CompetitionsTimeline = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  const timelineRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const paginationRef = useRef(null);
  
  // Enhanced useInView for different sections
  const headerInView = useInView(headerRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  const cardsInView = useInView(cardsRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.2
  });

  const paginationInView = useInView(paginationRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  // Optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.3]);
  
  // Memoized calculations
  const paginationData = useMemo(() => {
    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(events.length / itemsPerPage);
    
    return { currentEvents, totalPages, indexOfFirstEvent, indexOfLastEvent };
  }, [currentPage, events, itemsPerPage]);

  const { currentEvents, totalPages } = paginationData;

  // Enhanced animation variants
  const headerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 1.05,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), []);

  const sectionVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5
      }
    }
  }), []);

  // Optimized event handlers
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    const timelineElement = document.getElementById('timeline-section');
    if (timelineElement) {
      timelineElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleViewAll = useCallback(() => {
    handlePageChange(1);
    // Could also implement a modal or expanded view here
  }, [handlePageChange]);
  
  return (
    <motion.div 
      ref={timelineRef}
      id="timeline-section" 
      className="bg-gradient-to-br from-space-dark/80 to-space/60 rounded-2xl border border-white/10 backdrop-blur-sm p-8 mb-16 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, margin: "-10%" }}
    >
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-cosmic/10 to-mars/10 rounded-full blur-3xl"
          style={{ opacity: orbOpacity }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-mars/10 to-orange-500/10 rounded-full blur-2xl"
          style={{ opacity: orbOpacity }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Enhanced floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut",
            }}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
          >
            {i % 4 === 0 ? (
              <Trophy className="w-3 h-3 text-white/20" />
            ) : i % 4 === 1 ? (
              <Medal className="w-3 h-3 text-white/20" />
            ) : i % 4 === 2 ? (
              <Award className="w-3 h-3 text-white/20" />
            ) : (
              <Target className="w-3 h-3 text-white/20" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Header Section */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "exit"}
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            variants={itemVariants}
          >
            <motion.div
              className="p-3 bg-gradient-to-r from-cosmic/20 to-blue-500/20 rounded-xl mr-4"
              whileHover={{ scale: 1.08, rotate: 10 }}
              transition={{ duration: 0.3 }}
              animate={{ 
                boxShadow: [
                  "0 0 0 rgba(0, 217, 255, 0)",
                  "0 0 20px rgba(0, 217, 255, 0.3)",
                  "0 0 0 rgba(0, 217, 255, 0)"
                ]
              }}
              style={{
                transition: {
                  boxShadow: { duration: 2, repeat: Infinity }
                }
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Calendar className="text-cosmic w-7 h-7" />
              </motion.div>
            </motion.div>
            <motion.h3 
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cosmic to-mars bg-clip-text text-transparent font-orbitron"
              whileHover={{ scale: 1.02 }}
            >
              Key Milestones
            </motion.h3>
          </motion.div>

          <motion.p 
            className="text-white/70 max-w-2xl mx-auto text-lg mb-8"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            Journey through our most significant achievements and memorable moments in competitive robotics
          </motion.p>

          {/* Enhanced Timeline Stats */}
          <motion.div
            className="flex items-center justify-center space-x-8 mb-8"
            variants={itemVariants}
          >
            {[
              { label: "Total Events", value: events.length, icon: <Trophy className="w-4 h-4" /> },
              { label: "Pages", value: totalPages, icon: <Target className="w-4 h-4" /> },
              { label: "Current", value: currentPage, icon: <Zap className="w-4 h-4" /> }
            ].map((stat, index) => (
              <React.Fragment key={index}>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-center mb-1">
                    <motion.div
                      className="mr-2 text-cosmic"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10 + index * 2, repeat: Infinity, ease: "linear" }}
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.div 
                      className="text-2xl font-bold text-white"
                      initial={{ scale: 0 }}
                      animate={headerInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
                {index < 2 && (
                  <motion.div 
                    className="w-px h-8 bg-white/20"
                    initial={{ scaleY: 0 }}
                    animate={headerInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Enhanced Timeline Grid */}
        <motion.div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
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
        
        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <motion.div
            ref={paginationRef}
            variants={sectionVariants}
            initial="hidden"
            animate={paginationInView ? "visible" : "exit"}
          >
            <Pagination className="mb-6">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <motion.div 
                      whileHover={{ scale: 1.08, x: -2 }} 
                      whileTap={{ scale: 0.95 }}
                    >
                      <PaginationPrevious 
                        className="bg-cosmic/20 hover:bg-cosmic/40 text-white border-white/10 transition-all duration-300 cursor-pointer"
                        onClick={() => handlePageChange(currentPage - 1)} 
                      />
                    </motion.div>
                  </PaginationItem>
                )}
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <motion.div 
                      whileHover={{ scale: 1.08, y: -2 }} 
                      whileTap={{ scale: 0.95 }}
                    >
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
                    <motion.div 
                      whileHover={{ scale: 1.08, x: 2 }} 
                      whileTap={{ scale: 0.95 }}
                    >
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
        
        {/* Enhanced View All Button */}
        <motion.div 
          className="flex justify-center"
          variants={sectionVariants}
          initial="hidden"
          animate={paginationInView ? "visible" : "exit"}
        >
          <motion.div
            whileHover={{ 
              scale: 1.05, 
              y: -3,
              boxShadow: "0 10px 30px rgba(0, 217, 255, 0.3)"
            }}
            whileTap={{ scale: 0.97 }}
          >
            <Button 
              variant="outline" 
              className="group border-2 border-cosmic/50 text-cosmic hover:bg-cosmic/10 hover:border-cosmic/70 px-6 py-3 rounded-xl font-medium backdrop-blur-sm transition-all duration-300"
              onClick={handleViewAll}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="mr-2 h-4 w-4" />
              </motion.div>
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

export default CompetitionsTimeline;
