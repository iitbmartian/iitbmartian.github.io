"use client";
import React, { useRef, useState, useMemo, useCallback } from 'react';
import { Award, Globe, MapPin, Trophy, Target, ArrowRight, Star, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Enhanced Competition Component
const Competition = ({ title, description, location, image, index, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  // Enhanced useInView with bidirectional animations
  const isInView = useInView(cardRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  // Memoized animation variants
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 50, 
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
      y: -30,
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
      className="relative group overflow-hidden perspective-1000"
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
      <motion.div
        className="bg-gradient-to-br from-space-light/30 to-space-light/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm relative h-full hover:border-white/30 transition-all duration-300"
      >
        {/* Enhanced Background Gradient */}
        <motion.div
          className={`absolute inset-0 ${gradient}`}
          animate={{ 
            opacity: isHovered ? 0.15 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Enhanced Image Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Enhanced Image Placeholder */}
          <motion.div
            className={`w-full h-full ${gradient} opacity-70 relative overflow-hidden`}
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Enhanced tech pattern */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)`,
              }}
            />

            {/* Enhanced Competition Icon */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ 
                rotate: {
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                scale: {
                  duration: 0.3
                }
              }}
            >
              <Trophy className="w-16 h-16 text-white/80" />
            </motion.div>

            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
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

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/30 to-transparent" />
          
          {/* Enhanced Achievement Badge */}
          <motion.div
            className="absolute top-4 right-4 p-2 bg-gradient-to-r from-mars/80 to-orange-500/80 rounded-full backdrop-blur-sm border border-white/20"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={isInView ? { 
              scale: 1, 
              opacity: 1, 
              rotate: 0 
            } : { 
              scale: 0, 
              opacity: 0, 
              rotate: -180 
            }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3 + index * 0.1,
              type: "spring"
            }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <Award className="w-5 h-5 text-white" />
          </motion.div>

          {/* Global ranking indicator */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-cosmic/80 to-blue-500/80 rounded-full backdrop-blur-sm border border-white/20"
            initial={{ scale: 0, opacity: 0, x: -20 }}
            animate={isInView ? { 
              scale: 1, 
              opacity: 1, 
              x: 0 
            } : { 
              scale: 0, 
              opacity: 0, 
              x: -20 
            }}
            transition={{ 
              duration: 0.5, 
              delay: 0.2 + index * 0.05
            }}
          >
            <span className="text-xs text-white font-medium">Global</span>
          </motion.div>
        </div>

        {/* Enhanced Content Section */}
        <motion.div 
          className="p-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
        >
          {/* Enhanced Location */}
          <motion.div 
            className="flex items-center mb-3 group/location"
            whileHover={{ x: 3, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="p-1 bg-gradient-to-r from-mars/20 to-orange-500/20 rounded-full mr-3"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <MapPin className="h-4 w-4 text-mars" />
            </motion.div>
            <span className="text-white/70 text-sm group-hover/location:text-white/90 transition-colors duration-300">
              {location}
            </span>
          </motion.div>

          {/* Enhanced Title */}
          <motion.h3
            className="text-xl font-bold mb-3 relative text-white group-hover:text-cosmic transition-colors duration-300 font-orbitron"
            whileHover={{ x: 3 }}
          >
            {title}
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-mars to-cosmic rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: isHovered ? "100%" : "0%",
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.h3>

          {/* Enhanced Description */}
          <motion.p 
            className="text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-300 mb-4"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
          >
            {description}
          </motion.p>

          {/* Enhanced Competition Ranking Indicator */}
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Target className="w-4 h-4 text-cosmic" />
            </motion.div>
            <span className="text-xs text-cosmic font-medium">Global Competition</span>
          </motion.div>
        </motion.div>

        {/* Enhanced Progress Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-mars to-cosmic rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { 
            width: "100%", 
            opacity: 1 
          } : { 
            width: 0, 
            opacity: 0 
          }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
        />

        {/* Enhanced border effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
          animate={{
            borderColor: isHovered 
              ? ["rgba(0, 217, 255, 0.4)", "rgba(255, 107, 53, 0.4)", "rgba(0, 217, 255, 0.4)"]
              : "transparent"
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-mars/5 to-cosmic/5 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const CompetitionsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  
  // Enhanced useInView for different sections
  const headerInView = useInView(headerRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px",
    amount: 0.3
  });

  const statsInView = useInView(statsRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px",
    amount: 0.3
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Optimized transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.3]);

  // Memoized competitions data
  const competitions = useMemo(() => [
    {
      title: "University Rover Challenge (URC)",
      description: "The world's premier robotics competition for university students, held annually in the desert of southern Utah, USA.",
      location: "Mars Desert Research Station, Utah, USA",
      image: "https://via.placeholder.com/600x400?text=URC",
      gradient: "bg-gradient-to-br from-mars/60 to-orange-600/40"
    },
    {
      title: "International Rover Challenge (IRC)",
      description: "A competition that tests rovers' capabilities in various challenges simulating real Mars mission scenarios.",
      location: "India",
      image: "https://via.placeholder.com/600x400?text=IRC",
      gradient: "bg-gradient-to-br from-cosmic/60 to-blue-500/40"
    },
    {
      title: "European Rover Challenge (ERC)",
      description: "One of the largest space and robotics events in Europe, featuring simulated Martian terrain challenges.",
      location: "Poland",
      image: "https://via.placeholder.com/600x400?text=ERC",
      gradient: "bg-gradient-to-br from-purple-500/60 to-indigo-500/40"
    }
  ], []);

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

  return (
    <section 
      ref={sectionRef}
      id="competitions" 
      className="py-24 bg-gradient-to-br from-space-dark via-space to-space-dark relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-gradient-to-l from-mars/10 to-orange-500/5 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            opacity: orbOpacity
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-0 w-1/3 h-1/3 bg-gradient-to-r from-cosmic/10 to-blue-500/5 rounded-full blur-3xl"
          style={{ 
            y: backgroundY,
            opacity: orbOpacity
          }}
        />

        {/* Enhanced floating trophies */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -25, 0],
              opacity: [0.1, 0.4, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
          >
            {i % 3 === 0 ? (
              <Trophy className="w-4 h-4 text-white/20" />
            ) : i % 3 === 1 ? (
              <Award className="w-4 h-4 text-white/20" />
            ) : (
              <Star className="w-4 h-4 text-white/20" />
            )}
          </motion.div>
        ))}

        {/* Enhanced achievement pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.svg 
            className="absolute inset-0 w-full h-full"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 100,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <defs>
              <linearGradient id="achievementGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b35" />
                <stop offset="50%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#00d9ff" />
              </linearGradient>
            </defs>
            {[...Array(5)].map((_, i) => (
              <motion.path
                key={i}
                d={`M ${i * 25},0 Q ${i * 25 + 60},60 ${i * 25 + 120},120`}
                fill="none"
                stroke="url(#achievementGradient)"
                strokeWidth="2"
                opacity="0.4"
                animate={{
                  pathLength: [0, 1, 0],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  delay: i * 1.5,
                }}
              />
            ))}
          </motion.svg>
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header Section */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "exit"}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold font-orbitron mb-6 relative inline-block"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-mars via-orange-500 to-cosmic bg-clip-text text-transparent">
              Proving Grounds
            </span>
            <motion.div
              className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-mars via-orange-500 to-cosmic rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={headerInView ? { 
                width: "100%", 
                opacity: 1 
              } : { 
                width: 0, 
                opacity: 0 
              }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed flex items-center justify-center space-x-3"
            variants={itemVariants}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="w-6 h-6 text-cosmic flex-shrink-0" />
            </motion.div>
            <span>We test our rovers' capabilities and our team's skills in premier international competitions</span>
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Trophy className="w-6 h-6 text-mars flex-shrink-0" />
            </motion.div>
          </motion.p>

          {/* Enhanced Competition Stats */}
          <motion.div
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {[
              { label: "Global Events", value: "3+", icon: <Globe className="w-4 h-4" />, gradient: "from-mars to-orange-500" },
              { label: "Countries", value: "3", icon: <MapPin className="w-4 h-4" />, gradient: "from-cosmic to-blue-500" },
              { label: "Awards Won", value: "15+", icon: <Trophy className="w-4 h-4" />, gradient: "from-purple-500 to-pink-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-space-light/20 to-space-light/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center group hover:border-white/30 transition-all duration-300 perspective-1000"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={statsInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1 
                } : { 
                  opacity: 0, 
                  y: 30, 
                  scale: 0.8 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  rotateY: 5
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div 
                  className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.gradient}/20 mb-2`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </motion.div>
                <motion.div 
                  className="text-lg font-bold text-white mb-1"
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Enhanced Competitions Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {competitions.map((competition, index) => (
            <Competition 
              key={index} 
              {...competition} 
              index={index}
            />
          ))}
        </div>
        
        {/* Enhanced Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-10%" }}
        >
          <Link href="/competitions">
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button className="bg-gradient-to-r from-mars via-orange-500 to-cosmic hover:from-mars-dark hover:via-orange-600 hover:to-cosmic-dark text-white group px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg">
                <span className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Trophy className="w-5 h-5" />
                  </motion.div>
                  <span>View Our Competitive Records</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitionsSection;
