import React, { useRef, useMemo, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, MapPin, Calendar, Trophy, Star, ExternalLink } from 'lucide-react';

const CompetitionCard = ({ title, location, description, image, results, index = 0 }) => {
  const cardRef = useRef(null);
  
  // Enhanced useInView with bidirectional animations
  const isInView = useInView(cardRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  // Memoized animation variants for better performance
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.95,
      rotateX: 10
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
        stiffness: 100,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.98,
      rotateX: -5,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }), [index]);

  const imageVariants = useMemo(() => ({
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.2 + index * 0.05
      }
    }
  }), [index]);

  const contentVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.3 + index * 0.05,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }), [index]);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }), []);

  return (
    <motion.div 
      ref={cardRef}
      className="mb-16 bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300 group perspective-1000"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      whileHover={{ 
        scale: 1.02, 
        y: -8,
        rotateY: 1
      }}
      whileTap={{ scale: 0.99 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="md:flex">
        {/* Enhanced Image Section */}
        <motion.div 
          className="md:w-1/3 h-64 md:h-auto relative overflow-hidden"
          variants={imageVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          {/* Enhanced gradient background */}
          <motion.div 
            className="w-full h-full bg-gradient-to-br from-mars/40 to-cosmic/40 relative flex items-center justify-center"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          >
            {/* Enhanced tech pattern overlay */}
            <motion.div 
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
              }}
            />
            
            {/* Enhanced competition icon */}
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Trophy className="w-16 h-16 text-white/80" />
            </motion.div>
            
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-space/60 via-transparent to-transparent" />

            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-mars/10 to-cosmic/10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Enhanced competition type badge */}
          <motion.div
            className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-mars/80 to-orange-500/80 rounded-full backdrop-blur-sm border border-white/20"
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xs text-white font-medium">Competition</span>
          </motion.div>

          {/* Achievement count indicator */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-cosmic/80 to-blue-500/80 rounded-full backdrop-blur-sm border border-white/20"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xs text-white font-medium">{results.length} Years</span>
          </motion.div>
        </motion.div>

        {/* Enhanced Content Section */}
        <motion.div 
          className="flex-1 p-8"
          variants={contentVariants}
        >
          {/* Enhanced Location */}
          <motion.div 
            className="flex items-center mb-4 group/location"
            variants={itemVariants}
            whileHover={{ x: 5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="p-1 bg-gradient-to-r from-mars/20 to-orange-500/20 rounded-full mr-3"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <MapPin className="h-4 w-4 text-mars" />
            </motion.div>
            <span className="text-white/70 group-hover/location:text-white/90 transition-colors duration-300">
              {location}
            </span>
          </motion.div>

          {/* Enhanced Title */}
          <motion.h2 
            className="text-3xl font-bold mb-4 font-orbitron text-white group-hover:text-cosmic transition-colors duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 5 }}
            transition={{ duration: 0.3 }}
          >
            {title}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-mars to-cosmic rounded-full mt-1"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.h2>

          {/* Enhanced Description */}
          <motion.p 
            className="text-white/80 mb-8 text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-300"
            variants={itemVariants}
          >
            {description}
          </motion.p>
          
          {/* Enhanced Results Section */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-2xl font-semibold mb-6 font-orbitron text-white flex items-center space-x-3"
              whileHover={{ x: 3 }}
            >
              <motion.div 
                className="p-2 bg-gradient-to-r from-cosmic/20 to-blue-500/20 rounded-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Star className="w-5 h-5 text-cosmic" />
              </motion.div>
              <span>Our Journey</span>
            </motion.h3>
            
            <div className="space-y-6">
              {results.map((result, resultIndex) => (
                <motion.div 
                  key={resultIndex} 
                  className="flex group/result hover:bg-white/5 rounded-xl p-4 transition-all duration-300"
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    x: 0, 
                    scale: 1 
                  } : { 
                    opacity: 0, 
                    x: -30, 
                    scale: 0.95 
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.7 + resultIndex * 0.1,
                    type: "spring",
                    stiffness: 150
                  }}
                  whileHover={{ x: 8, scale: 1.02 }}
                >
                  {/* Enhanced Year Badge */}
                  <div className="w-20 flex-shrink-0">
                    <motion.div 
                      className="bg-gradient-to-r from-cosmic/30 to-blue-500/30 rounded-full px-4 py-2 text-center text-white font-medium border border-cosmic/30 backdrop-blur-sm"
                      whileHover={{ 
                        scale: 1.08, 
                        rotate: [0, -2, 2, 0],
                        borderColor: "rgba(0, 217, 255, 0.6)"
                      }}
                      transition={{ duration: 0.3 }}
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
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(255, 107, 53, 0.4)",
                          "0 0 0 8px rgba(255, 107, 53, 0)",
                          "0 0 0 0 rgba(255, 107, 53, 0)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: resultIndex * 0.3
                      }}
                    />
                    
                    <motion.h4 
                      className="text-white font-semibold mb-2 flex items-center group-hover/result:text-cosmic transition-colors duration-300"
                      whileHover={{ x: 3 }}
                    >
                      <motion.div 
                        className="p-1 bg-gradient-to-r from-mars/20 to-orange-500/20 rounded-full mr-3"
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Award className="h-4 w-4 text-mars" />
                      </motion.div>
                      {result.achievement}
                    </motion.h4>
                    <motion.p 
                      className="text-white/70 leading-relaxed group-hover/result:text-white/90 transition-colors duration-300"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {result.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Achievement Stats */}
          {results.length > 0 && (
            <motion.div
              className="mt-8 pt-6 border-t border-white/10"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="flex items-center space-x-2 text-cosmic"
                    whileHover={{ scale: 1.05, x: 3 }}
                  >
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">{results.length} Achievements</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-2 text-mars"
                    whileHover={{ scale: 1.05, x: 3 }}
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {results[0]?.year} - {results[results.length - 1]?.year}
                    </span>
                  </motion.div>
                </div>

                {/* View details button */}
                <motion.button
                  className="flex items-center space-x-1 text-cosmic hover:text-white text-sm font-medium transition-colors duration-300"
                  whileHover={{ scale: 1.05, x: 3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
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
          borderColor: isInView ? "rgba(0, 217, 255, 0.0)" : "transparent",
        }}
        whileHover={{
          borderColor: [
            "rgba(0, 217, 255, 0.4)",
            "rgba(255, 107, 53, 0.4)",
            "rgba(0, 217, 255, 0.4)"
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
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Success indicator */}
      <motion.div
        className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1
        }}
      />
    </motion.div>
  );
};

export default CompetitionCard;
