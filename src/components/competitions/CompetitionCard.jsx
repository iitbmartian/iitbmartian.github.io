import React, { useRef, useMemo, useCallback, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Award, MapPin, Calendar, Trophy, Star, ExternalLink, Medal, Target, Zap, Crown } from 'lucide-react';

const CompetitionCard = ({ title, location, description, image, results, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredResult, setHoveredResult] = useState(null);
  
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const resultsRef = useRef(null);
  
  // Enhanced useInView with bidirectional animations for different sections
  const cardInView = useInView(cardRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  const imageInView = useInView(imageRef, { 
    once: false, 
    margin: "-20% 0px -20% 0px",
    amount: 0.5
  });

  const contentInView = useInView(contentRef, { 
    once: false, 
    margin: "-20% 0px -20% 0px",
    amount: 0.3
  });

  const resultsInView = useInView(resultsRef, { 
    once: false, 
    margin: "-25% 0px -25% 0px",
    amount: 0.2
  });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  // Enhanced animation variants with better performance
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.9,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.95,
      rotateX: -10,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  }), [index]);

  const imageVariants = useMemo(() => ({
    hidden: { scale: 0.8, opacity: 0, rotateY: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.7,
        delay: 0.2 + index * 0.05,
        type: "spring",
        stiffness: 100
      }
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      rotateY: 10,
      transition: {
        duration: 0.5
      }
    }
  }), [index]);

  const contentVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.3 + index * 0.05,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05
      }
    }
  }), [index]);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), []);

  const resultVariants = useMemo(() => (resultIndex) => ({
    hidden: { 
      opacity: 0, 
      x: -40, 
      scale: 0.9,
      rotateX: 10
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: 0.7 + resultIndex * 0.1,
        type: "spring",
        stiffness: 150,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      scale: 0.95,
      rotateX: -5,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  }), []);

  // Optimized event handlers
  const handleCardHover = useCallback(() => setIsHovered(true), []);
  const handleCardLeave = useCallback(() => setIsHovered(false), []);
  const handleResultHover = useCallback((index) => setHoveredResult(index), []);
  const handleResultLeave = useCallback(() => setHoveredResult(null), []);
  const handleViewDetails = useCallback(() => {
    // Add your view details logic here
    console.log('View details for:', title);
  }, [title]);

  return (
    <motion.div 
      ref={cardRef}
      className="mb-16 bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300 group perspective-1000 relative"
      variants={cardVariants}
      initial="hidden"
      animate={cardInView ? "visible" : "exit"}
      whileHover={{ 
        scale: 1.02, 
        y: -12,
        rotateY: 1
      }}
      whileTap={{ scale: 0.99 }}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
      style={{ 
        transformStyle: "preserve-3d",
        y: backgroundY
      }}
    >
      <div className="md:flex">
        {/* Enhanced Image Section */}
        <motion.div 
          ref={imageRef}
          className="md:w-1/3 h-64 md:h-auto relative overflow-hidden"
          variants={imageVariants}
          initial="hidden"
          animate={imageInView ? "visible" : "exit"}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          style={{ scale: imageScale }}
        >
          {/* Enhanced gradient background */}
          <motion.div 
            className="w-full h-full bg-gradient-to-br from-mars/40 to-cosmic/40 relative flex items-center justify-center"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          >
            {/* Enhanced tech pattern overlay */}
            <motion.div 
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                backgroundPosition: { duration: 25, repeat: Infinity },
                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
              }}
            />
            
            {/* Enhanced competition icon */}
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.15, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ 
                scale: 1.3, 
                rotate: 360 
              }}
            >
              <Trophy className="w-16 h-16 text-white/80" />
            </motion.div>
            
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-space/60 via-transparent to-transparent" />

            {/* Enhanced animated glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-mars/10 to-cosmic/10"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Floating achievement indicators */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 25}%`,
                  top: `${20 + i * 15}%`
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.4, 0.8, 0.4],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              >
                {i % 3 === 0 ? (
                  <Medal className="w-4 h-4 text-white/40" />
                ) : i % 3 === 1 ? (
                  <Star className="w-3 h-3 text-white/40" />
                ) : (
                  <Crown className="w-4 h-4 text-white/40" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced competition type badge */}
          <motion.div
            className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-mars/80 to-orange-500/80 rounded-full backdrop-blur-sm border border-white/20"
            variants={itemVariants}
            whileHover={{ scale: 1.08, rotate: 5 }}
            transition={{ duration: 0.2 }}
            animate={{
              boxShadow: [
                "0 0 0 rgba(255, 107, 53, 0)",
                "0 0 15px rgba(255, 107, 53, 0.4)",
                "0 0 0 rgba(255, 107, 53, 0)"
              ]
            }}
            style={{
              transition: {
                boxShadow: { duration: 3, repeat: Infinity }
              }
            }}
          >
            <span className="text-xs text-white font-medium">Competition</span>
          </motion.div>

          {/* Enhanced achievement count indicator */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-cosmic/80 to-blue-500/80 rounded-full backdrop-blur-sm border border-white/20"
            variants={itemVariants}
            whileHover={{ scale: 1.08 }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity, delay: 1 }
            }}
          >
            <span className="text-xs text-white font-medium flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="mr-1"
              >
                <Target className="w-3 h-3" />
              </motion.div>
              {results.length} Years
            </span>
          </motion.div>

          {/* Participation years range */}
          <motion.div
            className="absolute bottom-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-500/80 to-pink-500/80 rounded-full backdrop-blur-sm border border-white/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={imageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xs text-white font-medium">
              {results[0]?.year} - {results[results.length - 1]?.year}
            </span>
          </motion.div>
        </motion.div>

        {/* Enhanced Content Section */}
        <motion.div 
          ref={contentRef}
          className="flex-1 p-8"
          variants={contentVariants}
          initial="hidden"
          animate={contentInView ? "visible" : "exit"}
        >
          {/* Enhanced Location */}
          <motion.div 
            className="flex items-center mb-4 group/location"
            variants={itemVariants}
            whileHover={{ x: 8, scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="p-1 bg-gradient-to-r from-mars/20 to-orange-500/20 rounded-full mr-3"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              animate={{
                boxShadow: [
                  "0 0 0 rgba(255, 107, 53, 0)",
                  "0 0 10px rgba(255, 107, 53, 0.3)",
                  "0 0 0 rgba(255, 107, 53, 0)"
                ]
              }}
              style={{
                transition: {
                  boxShadow: { duration: 2, repeat: Infinity, delay: 2 }
                }
              }}
            >
              <MapPin className="h-4 w-4 text-mars" />
            </motion.div>
            <span className="text-white/70 group-hover/location:text-white/90 transition-colors duration-300 font-medium">
              {location}
            </span>
          </motion.div>

          {/* Enhanced Title */}
          <motion.h2 
            className="text-3xl font-bold mb-4 font-orbitron text-white group-hover:text-cosmic transition-colors duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 8 }}
            transition={{ duration: 0.3 }}
          >
            {title}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-mars to-cosmic rounded-full mt-1"
              initial={{ width: 0, opacity: 0 }}
              animate={contentInView ? { 
                width: "100%", 
                opacity: 1 
              } : { 
                width: 0, 
                opacity: 0 
              }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
          </motion.h2>

          {/* Enhanced Description */}
          <motion.p 
            className="text-white/80 mb-8 text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-300"
            variants={itemVariants}
            whileHover={{ x: 3 }}
          >
            {description}
          </motion.p>
          
          {/* Enhanced Results Section */}
          <motion.div 
            ref={resultsRef}
            variants={itemVariants}
          >
            <motion.h3 
              className="text-2xl font-semibold mb-6 font-orbitron text-white flex items-center space-x-3"
              whileHover={{ x: 5, scale: 1.02 }}
            >
              <motion.div 
                className="p-2 bg-gradient-to-r from-cosmic/20 to-blue-500/20 rounded-lg"
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.6 }}
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(0, 217, 255, 0)",
                    "0 0 20px rgba(0, 217, 255, 0.4)",
                    "0 0 0 rgba(0, 217, 255, 0)"
                  ]
                }}
                style={{
                  transition: {
                    boxShadow: { duration: 3, repeat: Infinity, delay: 1 }
                  }
                }}
              >
                <Star className="w-5 h-5 text-cosmic" />
              </motion.div>
              <span>Our Journey</span>
            </motion.h3>
            
            <div className="space-y-6">
              {results.map((result, resultIndex) => (
                <motion.div 
                  key={resultIndex} 
                  className="flex group/result hover:bg-white/5 rounded-xl p-4 transition-all duration-300 perspective-1000"
                  variants={resultVariants(resultIndex)}
                  initial="hidden"
                  animate={resultsInView ? "visible" : "exit"}
                  whileHover={{ x: 12, scale: 1.02, rotateY: 1 }}
                  onMouseEnter={() => handleResultHover(resultIndex)}
                  onMouseLeave={handleResultLeave}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Enhanced Year Badge */}
                  <div className="w-20 flex-shrink-0">
                    <motion.div 
                      className="bg-gradient-to-r from-cosmic/30 to-blue-500/30 rounded-full px-4 py-2 text-center text-white font-medium border border-cosmic/30 backdrop-blur-sm"
                      whileHover={{ 
                        scale: 1.12, 
                        rotate: [0, -3, 3, 0],
                        borderColor: "rgba(0, 217, 255, 0.8)"
                      }}
                      transition={{ duration: 0.3 }}
                      animate={hoveredResult === resultIndex ? {
                        boxShadow: [
                          "0 0 0 rgba(0, 217, 255, 0)",
                          "0 0 20px rgba(0, 217, 255, 0.6)",
                          "0 0 0 rgba(0, 217, 255, 0)"
                        ]
                      } : {}}
                      style={{
                        transition: hoveredResult === resultIndex ? {
                          boxShadow: { duration: 1, repeat: Infinity }
                        } : {}
                      }}
                    >
                      {result.year}
                    </motion.div>
                  </div>
                  
                  {/* Enhanced Achievement Content */}
                  <div className="ml-6 pl-6 border-l-2 border-gradient-to-b from-mars/40 to-cosmic/40 relative">
                    {/* Enhanced achievement indicator dot */}
                    <motion.div 
                      className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-r from-mars to-cosmic rounded-full border-2 border-space"
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(255, 107, 53, 0.4)",
                          "0 0 0 10px rgba(255, 107, 53, 0)",
                          "0 0 0 0 rgba(255, 107, 53, 0)"
                        ]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: resultIndex * 0.4
                      }}
                    />
                    
                    <motion.h4 
                      className="text-white font-semibold mb-2 flex items-center group-hover/result:text-cosmic transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="p-1 bg-gradient-to-r from-mars/20 to-orange-500/20 rounded-full mr-3"
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Award className="h-4 w-4 text-mars" />
                      </motion.div>
                      {result.achievement}
                    </motion.h4>
                    <motion.p 
                      className="text-white/70 leading-relaxed group-hover/result:text-white/90 transition-colors duration-300"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1, x: 2 }}
                    >
                      {result.description}
                    </motion.p>
                  </div>

                  {/* Achievement type indicator */}
                  <motion.div
                    className="absolute right-2 top-2 opacity-0 group-hover/result:opacity-100 transition-opacity duration-300"
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Zap className="w-3 h-3 text-cosmic" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Achievement Stats */}
          {results.length > 0 && (
            <motion.div
              className="mt-8 pt-6 border-t border-white/10"
              variants={itemVariants}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <motion.div 
                    className="flex items-center space-x-2 text-cosmic"
                    whileHover={{ scale: 1.08, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Trophy className="w-4 h-4" />
                    </motion.div>
                    <span className="text-sm font-medium">{results.length} Achievements</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-2 text-mars"
                    whileHover={{ scale: 1.08, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Calendar className="w-4 h-4" />
                    </motion.div>
                    <span className="text-sm font-medium">
                      {results[0]?.year} - {results[results.length - 1]?.year}
                    </span>
                  </motion.div>
                </div>

                {/* Enhanced view details button */}
                <motion.button
                  className="flex items-center space-x-1 text-cosmic hover:text-white text-sm font-medium transition-colors duration-300 px-3 py-1 rounded-lg border border-cosmic/30 hover:border-cosmic/60 backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.08, 
                    x: 5,
                    boxShadow: "0 5px 15px rgba(0, 217, 255, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleViewDetails}
                >
                  <span>View Details</span>
                  <motion.div
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Enhanced Hover border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
        animate={{
          borderColor: cardInView ? "rgba(0, 217, 255, 0.0)" : "transparent",
        }}
        whileHover={{
          borderColor: [
            "rgba(0, 217, 255, 0.5)",
            "rgba(255, 107, 53, 0.5)",
            "rgba(0, 217, 255, 0.5)"
          ],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity
        }}
      />

      {/* Enhanced glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Enhanced success indicator */}
      <motion.div
        className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
          boxShadow: [
            "0 0 0 0 rgba(34, 197, 94, 0.4)",
            "0 0 0 6px rgba(34, 197, 94, 0)",
            "0 0 0 0 rgba(34, 197, 94, 0)"
          ]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 1
        }}
      />

      {/* Competition ranking indicator */}
      <motion.div
        className="absolute bottom-4 right-4 px-2 py-1 bg-gradient-to-r from-yellow-500/80 to-amber-500/80 rounded-full backdrop-blur-sm border border-white/20 text-xs text-white font-medium"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={cardInView ? { 
          opacity: 1, 
          scale: 1, 
          rotate: 0 
        } : { 
          opacity: 0, 
          scale: 0, 
          rotate: -180 
        }}
        transition={{ duration: 0.6, delay: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <span className="flex items-center">
          <Crown className="w-3 h-3 mr-1" />
          Global
        </span>
      </motion.div>
    </motion.div>
  );
};

export default CompetitionCard;
