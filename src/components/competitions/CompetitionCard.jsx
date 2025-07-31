'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, MapPin, Calendar, Trophy, Star } from 'lucide-react';
import Image from 'next/image';


const CompetitionCard = ({ 
  title, 
  location, 
  description, 
  image, 
  results, 
  index = 0 
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={cardRef}
      className="mb-16 bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300 group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.01, y: -3 }}
    >
      <div className="md:flex">
        {/* Image Section */}
        <motion.div 
          className="md:w-1/3 h-64 md:h-auto flex items-start justify-center relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={image}
            alt={title}
            
            className="object-fit object-center h-96 w-96"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-space/40 via-transparent to-transparent" />

          {/* Competition type badge */}
          <motion.div
            className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-mars/80 to-orange-500/80 rounded-full backdrop-blur-sm border border-white/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="text-xs text-white font-medium">Competition</span>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <div className="flex-1 p-8">
          {/* Location */}
          <motion.div 
            className="flex items-center mb-4 group/location"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ x: 3 }}
          >
            <div className="p-1 bg-gradient-to-r from-mars/20 to-orange-500/20 rounded-full mr-3">
              <MapPin className="h-4 w-4 text-mars" />
            </div>
            <span className="text-white/70 group-hover/location:text-white/90 transition-colors duration-300">
              {location}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            className="text-3xl font-bold mb-4 font-orbitron text-white group-hover:text-cosmic transition-colors duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {title}
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-white/80 mb-8 text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {description}
          </motion.p>
          
          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6 font-orbitron text-white flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-cosmic/20 to-blue-500/20 rounded-lg">
                <Star className="w-5 h-5 text-cosmic" />
              </div>
              <span>Our Journey</span>
            </h3>
            
            <div className="space-y-6">
              {results.map((result, resultIndex) => (
                <motion.div 
                  key={resultIndex} 
                  className="flex group/result hover:bg-white/5 rounded-xl p-4 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.7 + resultIndex * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  {/* Year Badge */}
                  <div className="w-20 flex-shrink-0">
                    <motion.div 
                      className="bg-gradient-to-r from-cosmic/30 to-blue-500/30 rounded-full px-4 py-2 text-center text-white font-medium border border-cosmic/30 backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {result.year}
                    </motion.div>
                  </div>
                  
                  {/* Achievement Content */}
                  <div className="ml-6 pl-6 border-l-2 border-gradient-to-b from-mars/40 to-cosmic/40 relative">
                    {/* Achievement indicator dot */}
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-r from-mars to-cosmic rounded-full border-2 border-space"></div>
                    
                    <h4 className="text-white font-semibold mb-2 flex items-center group-hover/result:text-cosmic transition-colors duration-300">
                      <div className="p-1 bg-gradient-to-r from-mars/20 to-orange-500/20 rounded-full mr-3">
                        <Award className="h-4 w-4 text-mars" />
                      </div>
                      {result.achievement}
                    </h4>
                    <p className="text-white/70 leading-relaxed group-hover/result:text-white/90 transition-colors duration-300">
                      {result.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievement Stats */}
          {results.length > 0 && (
            <motion.div
              className="mt-8 pt-6 border-t border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-cosmic">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">{results.length} Achievements</span>
                  </div>
                  <div className="flex items-center space-x-2 text-mars">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {results[0]?.year} - {results[results.length - 1]?.year}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Hover border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
        animate={{
          borderColor: isInView ? "rgba(0, 217, 255, 0.0)" : "transparent",
        }}
        whileHover={{
          borderColor: "rgba(0, 217, 255, 0.4)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default CompetitionCard;
