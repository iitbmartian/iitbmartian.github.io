'use client'
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Trophy, Settings, Camera, Star, Award } from 'lucide-react';

const CompetitionsHeader = () => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

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
      ref={headerRef}
      className="text-center mb-20 relative"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-mars/10 to-cosmic/10 rounded-full blur-3xl opacity-60" />
      </div>

      {/* Main Title */}
      <motion.div
        className="relative inline-block mb-6"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-mars via-yellow-500 to-cosmic bg-clip-text text-transparent relative"
          transition={{ duration: 0.3 }}
        >
          Competitive Records

        </motion.h1>

        {/* Decorative elements */}
        <motion.div 
          className="absolute -top-4 -right-4 text-yellow-500/60"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Trophy className="w-6 h-6" />
        </motion.div>
        
        <motion.div 
          className="absolute -top-2 -left-6 text-cosmic/60"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Award className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Subtitle */}
      <motion.p 
        className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8 flex items-center justify-center space-x-3"
        variants={itemVariants}
      >
        <Star className="w-5 h-5 text-cosmic flex-shrink-0" />
        <span>Our journey through international rover competitions and the milestones we've achieved</span>
        <Trophy className="w-5 h-5 text-mars flex-shrink-0" />
      </motion.p>





      {/* Quick Info */}
      <motion.div
        className="mt-8 text-center"
        variants={itemVariants}
      >
        <p className="text-white/60 text-sm">
          Discover our competitive journey spanning over a decade of innovation
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CompetitionsHeader;
